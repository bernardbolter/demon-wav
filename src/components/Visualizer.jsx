"use client"

import { useContext, Suspense, useRef, useState, useEffect, useMemo } from "react"
import { DemonContext } from "@/providers/DemonProvider"
import { useWindowSize } from "@/hooks/useWindowSize"

import Loading from "./Loading"
import AudioNav from "./AudioNav"

import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useControls } from "leva"
import { TextureLoader } from "three"
import { Stats, OrbitControls, PositionalAudio, useTexture, useProgress } from "@react-three/drei"

import { AudioAnalyzer } from "@/hooks/audioAnylizer"
import { NextReactP5Wrapper } from "@p5-wrapper/next"
import * as p5 from "p5"

window.p5 = p5

// await import("p5/lib/addons/p5.sound")

// useTexture.preload('/images/uno_alesia/uno_alesia_desktop.jpg')

// const sketch = (p5) => {
//     p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);
  
//     p5.draw = () => {
//       p5.background(250);
//       p5.normalMaterial();
//       p5.push();
//       p5.rotateZ(p5.frameCount * 0.01);
//       p5.rotateX(p5.frameCount * 0.01);
//       p5.rotateY(p5.frameCount * 0.01);
//       p5.plane(100);
//       p5.pop();
//     };
//   };

const Analyzer = ({
    track,
    audioURL,
    desktopImage,
    desktopDis,
    mobileImage,
    mobileDis
}) => {
    const [demon, setDemon] = useContext(DemonContext)
    const size = useWindowSize()
    const imageRef = useRef(null)
    const analyzerRef = useRef(null)
    const { gl } = useThree()

    const viewport = useThree(state => state.viewport)

    console.log('c time: ', demon.currentTrackTime)

    // load track into audio anylyser reference when track is changed
    useEffect(() => {
        if (track.current && (audioURL !== null)) {
            analyzerRef.current = new THREE.AudioAnalyser(track.current)
        }
    }, [track.current])

    // for testing in leva
    // const material = useControls({
    //     wireframe: false,
    //     displacementScale: { value: 0.5, min: 0, max: 5.0, step: 0.01 }
    // })

    // adds to the image
    useEffect(() => {
        desktopImage.anisotropy = gl.capabilities.getMaxAnisotropy()
    }, [gl, desktopImage])

    // animate the displacement of image based on track analyzer, and send current track time to audio nav
    useFrame(() => {
        if (analyzerRef.current && (audioURL !== null)) {
            if (track.current.context.currentTime !== 0) {
                setDemon(state => ({ ...state, currentTrackTime: track.current.context.currentTime - (demon.currentTrackLength * demon.playCount)}))
            }
            const averageFreq = analyzerRef.current.getAverageFrequency()
            const allFreq = analyzerRef.current.getFrequencyData()
            imageRef.current.material.displacementScale = averageFreq / 4
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
                side={'white'}
            />
        </mesh>
    )
}

const PlayTrack = ({
    desktopImage,
    desktopDis,
    mobileImage,
    mobileDis,
    audioURL,
    setAudioURL
}) => {
    const [demon, setDemon] = useContext(DemonContext)
    const trackRef = useRef(null)
    const [trackState, setTrackState] = useState(null)

    useEffect(() => {
        console.log('trackRef: ', trackRef)
        if (trackRef.current) {
            console.log('track available')
            if (demon.startAudio) {
                trackRef.current.play()
            }
        }
    }, [demon.startAudio, trackRef])

    useEffect(() => {
        if (trackRef.current) {
            if (demon.trackPlaying) {
                trackRef.current.context.resume()
            } else {
                trackRef.current.context.suspend()
            }
        }
    }, [demon.trackPlaying])

    useEffect(() => {
        console.log("new track time: ", demon.newTrackTime)
        // if (demon.newTrackTime !== 0) {
        //     trackRef.current.currentTime = demon.newTrackTime
        // }
        if (trackRef.current) {
            console.log('try and move time: ', trackRef.current)
            trackRef.current.stop()
            trackRef.current.offset = demon.newTrackTime
            trackRef.current.play()
        }
    }, [demon.newTrackTime])
    useEffect(() => {
        if (demon.restartTrack === true) {
            console.log('resseting audio')
            setAudioURL(null)
            trackRef.current = null
            setTimeout(() => {
                setAudioURL('/audio/uno_alesia.wav')
            }, 10)
            
        }
    }, [demon.restartTrack])

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
            {audioURL !== null && (
                    <PositionalAudio
                       autoplay={false}
                       url={audioURL}
                       // ref={(node) => {
                       //     trackRef.current = node
                       //     if (node) {
                       //         trackRef.current = node
                       //     }
                       //     if (trackRef.current !== null) {
                       //         // console.log("callback: ", trackRef)
                       //         setDemon(state => ({ ...state, audioLoaded: true }))
                       //     }
                       // }}
                       ref={node => {
                        console.log("node: ", node, audioURL)
                        if (audioURL !== null) {
                            trackRef.current = node
                        }
                        // console.log("node: ", node)
                       }}
                       loop={false}
                       onEnded={() => {
                           console.log('track ended')
                           trackRef.current.stop()
                           trackRef.current.play()
                           setDemon(state => ({ ...state, playCount: state.playCount + 1 }))
                       }}
                   />
            )}
     
            <Analyzer 
                track={trackRef}
                audioURL={audioURL}
                desktopImage={desktopImage}
                desktopDis={desktopDis}
                mobileImage={mobileImage}
                mobileDis={mobileDis}    
            />
        </Suspense>
    )
}

const Visualizer = () => {
    const [demon, setDemon] = useContext(DemonContext)
    const [desktopImage, setDesktopImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_desktop.jpg'))
    const [desktopDis, setDesktopDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_desktop.jpg'))
    const [mobileImage, setMobileImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_mobile.jpg'))
    const [mobileDis, setMobileDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_mobile.jpg'))
    const [audioURL, setAudioURL] = useState('/audio/uno_alesia.wav')

    // useEffect(() => {
    //     console.log("index: ", demon.currentTrackIndex)
    //     console.log("tracks array: ", demon.tracksData)
    //     if (demon.tracksData.length !== 0) {
    //         // const getDesktopImage = useLoader(TextureLoader, `/images/${demon.tracksData[demon.currentTrackIndex].slug}/${demon.tracksData[demon.currentTrackIndex].slug}_desktop.jpg`)
    //         // console.log("G D image: ", getDesktopImage)
    //         // setDesktopImage(useLoader(TextureLoader, `/images/${demon.tracksData[demon.currentTrackIndex].slug}/${demon.tracksData[demon.currentTrackIndex].slug}_desktop.jpg`))
    //     }
    // }, [demon.tracksData, demon.currentTrackIndex])

    // const manager = new THREE.LoadingManager()
    // manager.onLoad = function ( ) { console.log( 'Loading complete!'); };

    const progress = useProgress()

    useEffect(() => {
        console.log("prog: ", progress)
        if (progress.loaded === 5 && progress.total === 5) {
            console.log("assets loaded")
            setDemon(state => ({ ...state, assetsLoaded: true }))
            setTimeout(() => {
                console.log("set audio loaded")
                setDemon(state => ({ ...state, audioLoaded: true }))
            }, [3000])
        }
    }, [progress])

    return (
        <section className="visualizer-container">
            <Canvas
                onCreated={() => {
                    console.log("canvas created")
                    setDemon(state => ({ ...state, canvasLoaded: true }))
                }}
            >
                <Suspense fallback={<Loading text="loading Visualizer" />}>
                    <ambientLight intensity={2} />
                    <PlayTrack 
                        desktopImage={desktopImage}
                        desktopDis={desktopDis}
                        mobileImage={mobileImage}
                        mobileDis={mobileDis}
                        audioURL={audioURL}
                        setAudioURL={setAudioURL}
                    />
                    <OrbitControls />
                </Suspense>
            </Canvas>
            <AudioNav />
            <NextReactP5Wrapper sketch={sketch} />
        </section>
    )
}

export default Visualizer