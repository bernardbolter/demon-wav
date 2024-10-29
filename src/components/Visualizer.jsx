import { useContext, Suspense, useRef, useState, useEffect, useMemo } from "react"
import { DemonContext } from "@/providers/DemonProvider"
import Loading from "./Loading"
import AudioNav from "./AudioNav"

import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useControls } from "leva"
import { TextureLoader } from "three"
import { Stats, OrbitControls, PositionalAudio } from "@react-three/drei"

const Analyzer = track => {
    const [demon, setDemon] = useContext(DemonContext)
    const imageRef = useRef(null)
    const analyzerRef = useRef(null)
    const { gl } = useThree()
    const imageDesktop = useLoader(TextureLoader, '/audio_one_desktop.jpg')
    // const imageMobile = useLoader(TextureLoader, '/audio_one_mobile.jpg')
    const disImageDesktop = useLoader(TextureLoader, '/audio_one_dis_desktop.jpg')
    // const disImageMobile = useLoader(TextureLoader, '/audio_one_dis_mobile.jpg')
    // const [track, setTrack] = useState("/audio_one.mp3")
    const viewport = useThree(state => state.viewport)

    // load track into audio anylyser reference when track is changed
    useEffect(() => {
        if (track.track.current) {
            analyzerRef.current = new THREE.AudioAnalyser(track.track.current)
        }
    }, [track.track.current])

    // for testing in leva
    const material = useControls({
        wireframe: false,
        displacementScale: { value: 0.5, min: 0, max: 5.0, step: 0.01 }
    })

    // adds to the image
    useEffect(() => {
        imageDesktop.anisotropy = gl.capabilities.getMaxAnisotropy()
    }, [gl, imageDesktop])

    // animate the displacement of image based on track analyzer, and send current track time to audio nav
    useFrame(() => {
        if (analyzerRef.current) {
            if (track.track.current.context.currentTime !== 0) {
                setDemon(state => ({ ...state, currentTrackTime: track.track.current.context.currentTime - (demon.currentTrackLength * demon.playCount)}))
            }
            const averageFreq = analyzerRef.current.getAverageFrequency()
            const allFreq = analyzerRef.current.getFrequencyData()
            imageRef.current.material.displacementScale = averageFreq / 4
        }
    })

    return (
        <mesh
            ref={imageRef}
            scale={[viewport.width, viewport.height, 1]}
            castShadow={true}
            receiveShadow={true}
        >
            <planeGeometry args={[1, 1, 180, 90]} />
            <meshStandardMaterial
                wireframe={material.wireframe}
                map={imageDesktop}
                displacementMap={disImageDesktop}
                displacementScale={material.displacementScale}
            />
        </mesh>
    )
}

const PlayTrack = () => {
    const [demon, setDemon] = useContext(DemonContext)
    const trackRef = useRef(null)

    useEffect(() => {
        if (trackRef.current) {
            if (demon.trackPlaying) {
                trackRef.current.context.resume()
            } else {
                trackRef.current.context.suspend()
            }
            // console.log(trackRef.current.context)
        }
    }, [demon.trackPlaying])

    useEffect(() => {
        if (trackRef.current) {
            console.log("trackRef: ", trackRef.current.buffer.duration)
            console.log("trackRef all: ", trackRef.current)
            setDemon(state => ({ ...state, currentTrackLength: trackRef.current.buffer.duration }))
            if (demon.playCount > 0) {
                setDemon(state => ({ ...state, playCount: 0 }))
            }
        }
    }, [trackRef.current])

    return (
        <Suspense fallback={null}>
            <PositionalAudio
                autoplay
                url="/audio_one.mp3"
                ref={trackRef}
                loop={false}
                onEnded={() => {
                    console.log('track ended')
                    trackRef.current.stop()
                    trackRef.current.play()
                    setDemon(state => ({ ...state, playCount: state.playCount + 1 }))
                }}
            />
            <Analyzer track={trackRef} />
        </Suspense>
    )
}

const Visualizer = () => {
    const [demon, setDemon] = useContext(DemonContext)
    // console.log(demon)

    return (
        <Suspense fallback={<Loading />}>
            <section className="visualizer-container">
                <Canvas>
                    <ambientLight intensity={1} />
                    <PlayTrack />
                    <OrbitControls />
                    <Stats />
                </Canvas>
                <AudioNav />
            </section>
        </Suspense>
    )
}

export default Visualizer