"use client"

import { useContext, Suspense, useRef, useState, useEffect } from "react"
import { DemonContext } from "@/providers/DemonProvider"
import { useWindowSize } from "@/hooks/useWindowSize"

import Loading from "./Loading"
import AudioNav from "./AudioNav"

import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useControls } from "leva"
import { TextureLoader } from "three"
import { OrbitControls, useProgress } from "@react-three/drei"


const Analyzer = ({ 
    track,
    analyzer,
    desktopImage,
    desktopDis,
    mobileImage,
    mobileDis
}) => {
    const [demon, setDemon] = useContext(DemonContext)
    const size = useWindowSize()
    const imageRef = useRef()
    const viewport = useThree(state => state.viewport)
    const { gl } = useThree()

    // calulation to get the average from analyzer array
    var getAverage = function(dataArray) {
        var total = 0, i = 0, length = dataArray.length;
        while(i < length) total += dataArray[i++];
        return length ? total / length : 0
    }

    useEffect(() => {
        if (size > 850) {
            desktopImage.anisotropy = gl.capabilities.getMaxAnisotropy()  
        } else {
            mobileImage.anisotropy = gl.capabilities.getMaxAnisotropy()
        }
    }, [gl, desktopImage, mobileImage, size])

    // for testing in leva
    // const material = useControls({
    //     wireframe: false,
    //     displacementScale: { value: 0.5, min: 0, max: 5.0, step: 0.01 }
    // })

    // animate the displacement of image based on track analyzer, and send current track time to audio nav
    useFrame(() => {
        // console.log(analyzer.current)
        if (analyzer.current) {
            // console.log("track current time: ", track.currentTime)

            const songData = new Uint8Array(140)
            analyzer.current.getByteFrequencyData(songData)
            var theAverage = getAverage(songData)
            // console.log(theAverage)
            // imageRef.current.material.discplacementScale = -theAverage
            imageRef.current.material.displacementScale = -theAverage / 20
            setDemon(state => ({ ...state, currentTrackTime: track.currentTime }))
        }
    })

    return (
        <mesh
            ref={imageRef}
            scale={size.width > 768 ? [viewport.height * 1.78, viewport.height, 1] : [viewport.height * .6, viewport.height, 1.78]}
            castShadow={true}
            receiveShadow={true}
        >
            <planeGeometry args={[1, 1, 180, 180]} />
            <meshStandardMaterial
                // wireframe={material.wireframe}
                map={size.width > 768 ? desktopImage : mobileImage}
                displacementMap={size.width > 768 ? desktopDis : mobileDis}
                // displacementScale={material.displacementScale}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

const Visualizer = () => {
    const [demon, setDemon] = useContext(DemonContext)
    const [desktopImage, setDesktopImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_desktop.jpg'))
    const [desktopDis, setDesktopDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_desktop.jpg'))
    const [mobileImage, setMobileImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_mobile.jpg'))
    const [mobileDis, setMobileDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_mobile.jpg'))
    const [audioURL, setAudioURL] = useState('/audio/uno_alesia.mp3')
    const progress = useProgress()
    const audioRef = useRef(null)
    const sourceRef = useRef(null)
    const analyzerRef = useRef(null)

    const handleOnPlay = () => {
        let audioContext = new AudioContext()
        if (!sourceRef.current) {
            sourceRef.current = audioContext.createMediaElementSource(audioRef.current)
            analyzerRef.current = audioContext.createAnalyser()
            sourceRef.current.connect(analyzerRef.current)
            analyzerRef.current.connect(audioContext.destination)
            setDemon(state => ({ ...state, currentTrackLength: audioRef.current.duration }))
        }
        // console.log(audioRef.current.duration)
        // var duration = audioRef.current.duration
        // console.log("duration: ", duration)
        // setDemon(state => ({ ...state, currentTracklength: duration }))
    }

    // determine when the 4 images are loaded and then remove loading state
    useEffect(() => {
        if (progress.loaded === 4 && progress.total === 4) {
            setDemon(state => ({ ...state, assetsLoaded: true }))
        }
    }, [progress])

    // set the current track length fro audio Ref
    // useEffect(() => {
    //     // if (audioRef.current?.duration) {
    //         console.log(audioRef.current.duration)
    //         setDemon(state => ({ ...state, currentTrackLength: audioRef.current.duration }))
    //     // }
    // }, [audioURL])

    // create parralax from the mouse movement over the background image
    const onMouseMove = e => {
        const { clientX, clientY, currentTarget } = e
        const { width, height, left, top } = currentTarget.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2
        const x = (clientX - centerX) / width
        const y = (clientY - centerY) / height
        setDemon(state => ({ ...state, backgroundOffsetX: x * 49, backgroundOffsetY: y * 49 }))
    }

    return (
        <>
            <div
                className="visualizer-container"
                onMouseMove={onMouseMove}
            >
                <Canvas>
                    {/* <Suspense fallback={<Loading text="loading Visualizer" />}> */}
                        <ambientLight intensity={2} />
                        <OrbitControls />
                        <Analyzer
                            track={audioRef.current}
                            analyzer={analyzerRef}
                            desktopImage={desktopImage}
                            desktopDis={desktopDis}
                            mobileImage={mobileImage}
                            mobileDis={mobileDis}
                        />
                    {/* </Suspense> */}
                </Canvas>
            </div>
            <AudioNav audioRef={audioRef} />
            <audio
                src={audioURL}
                ref={audioRef}
                onPlay={handleOnPlay}
                loop
            />
        </>
    )
}

export default Visualizer