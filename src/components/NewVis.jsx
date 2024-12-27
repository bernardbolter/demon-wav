"use client"

import { useContext, Suspense, useRef, useState, useEffect, useMemo } from "react"
import { DemonContext } from "@/providers/DemonProvider"
import { useWindowSize } from "@/hooks/useWindowSize"

import Loading from "./Loading"

import * as THREE from 'three'
import { TextureLoader } from "three"
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, useProgress } from "@react-three/drei"
import { extend } from '@react-three/fiber'

import { AudioAnalyzer } from "@/hooks/audioAnylizer"
import AudioNav from "./AudioNav"
// https://sabigara.com/posts/audio-visualizer

// extend({ OrbitalControls, Canvas, useLoader, useProgress, useFrame })


const TheVis = ({ analyzer }) => {
    // console.log(analyzer)
    const [demon, setDemon] = useContext(DemonContext)
    const imageRef = useRef(null)
    const size = useWindowSize()
    const viewport = useThree(state => state.viewport)
    const [desktopImage, setDesktopImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_desktop.jpg'))
    const [desktopDis, setDesktopDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_desktop.jpg'))
    const [mobileImage, setMobileImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_mobile.jpg'))
    const [mobileDis, setMobileDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_mobile.jpg'))


    var getAverage = function(dataArray){
        var total = 0,                               // initialize to 0
            i = 0, length = dataArray.length;
        while(i < length) total += dataArray[i++];   // add all
        return length ? total / length : 0;          // divide (when length !== 0)
    }

    useFrame(() => {
        if (analyzer.current) {
            const songData = new Uint8Array(140);
            analyzer.current.getByteFrequencyData(songData);
            // console.log(songData)
            // console.log(analyzer.current)
            // console.log(audioElmRef.current.currentTime)
            // if (analyzer.sourceNode.mediaElement.currentTime !== 0) {
            //     setDemon(state => ({ 
            //         ...state, 
            //         currentTrackTime: analyzer.sourceNode.mediaElement.currentTime,
            //         currentTrackLength: analyzer.sourceNode.mediaElement.duration
                
            //     }))
            // }
            // const byte = analyzer.getByteFrequencyData()
            // console.log(byte)
            // analyzer.current?.fftSize = 256;
            // const bufferLength = analyzer.current?.frequencyBinCount;
            // console.log(bufferLength);
            // const dataArray = new Uint8Array(bufferLength);
            // console.log(dataArray);
            
            // const fft = analyzer.getFFT();
            // console.log(fft)
            var theAverage = getAverage(songData)
            // console.log(theAverage)
            imageRef.current.material.displacementScale = -theAverage / 20
            // const floatData = analyzer.analyzerNode.getFloatFrequencyData()
            // console.log(floatData)
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

const NewVis = () => {    
    const [demon, setDemon] = useContext(DemonContext)
    const size = useWindowSize()

    // const [desktopImage, setDesktopImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_desktop.jpg'))
    // const [desktopDis, setDesktopDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_desktop.jpg'))
    // const [mobileImage, setMobileImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_mobile.jpg'))
    // const [mobileDis, setMobileDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_mobile.jpg'))
    const [audioURL, setAudioURL] = useState('/audio/uno_alesia.mp3')
    const progress = useProgress()
    const [analyzer, setAnalyzer] = useState(null)
    // const [source, setSource] = useState(null)
    // const [ctx, setCtx] = useState(new AudioContext())

    // const imageRef = useRef(null)
    // const analyzerRef = useRef(null)
    // const audioRef = useRef(null)
    const audioElmRef = useRef(null)

    // let audioContext = null
    // let analyser
    // let audioSrc

    const audioRef = useRef()
    const sourceRef = useRef()
    const analyzerRef = useRef()

    const handleOnPlay = () => {
        let audioContext = new AudioContext()
        if (!sourceRef.current) {
            sourceRef.current = audioContext.createMediaElementSource(audioElmRef.current)
            analyzerRef.current = audioContext.createAnalyser()
            sourceRef.current.connect(analyzerRef.current)
            analyzerRef.current.connect(audioContext.destination)
        }
        // visualizeData()
    }


    // useEffect(() => {
    //     // setAnalyzer(new AudioAnalyzer(audioElmRef.current))
    //     audioContext = new AudioContext()
    //     // analyser = audioContext.createAnalyser()
    //     // audioSrc = audioContext.createMediaElementSource(audioElmRef.current)
    // }, [])

    // useEffect(() => {
    //     // if (!audioContext === null) {
    //     //     console.log('no context')
    //     //     audioContext = new AudioContext()
    //     // }
    //     if (!audioContext) {
    //         console.log('got context')
    //         console.log(audioContext)
    //         audioContext = new AudioContext()
    //         analyser = audioContext.createAnalyser()
    //         audioSrc = audioContext.createMediaElementSource(audioElmRef.current)
    //         audioSrc.connect(analyser)
    //         audioSrc.connect(audioContext.destination)
    //         setAnalyzer(analyser)
    //     }
    // }, [])

    // useEffect(() => {
    //     console.log(audioElmRef)
    //     if (!audioContext) {
    //         audioContext = new AudioContext()
    //         const analyser = audioContext.createAnalyser();
    //         const audioSrc = audioContext.createMediaElementSource(audioElmRef.current);
        
    //         audioSrc
    //             .connect(analyser)
    //             .connect(audioContext.destination);
    //         setAnalyzer(audioContext)
    //     }
        
    //     // if (!ctx) {
    //         // const audioCtx = new AudioContext();
    //         // const myAudio = document.querySelector("audio");
    //     //     const source = ctx.createMediaElementSource(audioElmRef);
    //     //     const newAnal = ctx.createAnalyser()
    //     //     source.connect(newAnal)
    //     //     newAnal.connect(ctx.destination)
    //     //     setAnalyzer(newAnal)
    //     //     console.log(analyzer)
    //     // // }
        
    //     //   const AudioContext = window.AudioContext || window.webkitAudioContext;
    //     // //   const ctx = new AudioContext();
    //     // // setCtx(new AudioContext())
    //     // console.log(ctx)
    //     // setSource(ctx.createMediaElementSource(audioElmRef.current))
          
    //       //declare source just once
    //     //   const src = ctx.createMediaElementSource(audioElmRef.current);
    //     //   setSource(src);
          
    //     //   //connect analayser to source
    //     //   const analayser = ctx.createAnalyser();
    //     //   src.connect(analayser);
    //     //   analayser.connect(ctx.destination);
    //   }, []);


    useEffect(() => {
        console.log("prog: ", progress)
        if (progress.loaded === 4 && progress.total === 4) {
            console.log("assets loaded")
            setDemon(state => ({ ...state, assetsLoaded: true }))
            // setTimeout(() => {
            //     console.log("set audio loaded")
            //     setDemon(state => ({ ...state, audioLoaded: true }))
            // }, [3000])
        }
    }, [progress])

    useEffect(() => {
        if (audioElmRef.current) {
            console.log(audioElmRef.current)
            console.log(demon.currentTrackTime)
            console.log(audioElmRef.current.currentTime)
        }
    }, [demon.currentTrackTime])

    useEffect(() => {
        console.log("aer: ", audioElmRef)
        setDemon(state  => ({ ...state, currentTrackLength: audioElmRef.current.duration  }))
    }, [])

    const onMouseMove = e => {
        const { clientX, clientY, currentTarget } = e;

        // Calculate the mouse position relative to the center of the element
        const { width, height, left, top } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate offsets as a fraction of element size
        const x = (clientX - centerX) / width;
        const y = (clientY - centerY) / height;

        // Scale the movement effect
        setDemon(state => ({
            ...state,
            backgroundOffestX: x * 49,
            backgroundOffestY: y * 49
        }))
    }

    return (
        <>
        <div 
            className="visualizer-container"
            onMouseMove={onMouseMove}
        >
            <Canvas>
                <ambientLight intensity={2} />
                {/* <mesh
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
                </mesh> */}
                <OrbitControls />
                <TheVis analyzer={analyzerRef} />
            </Canvas>
            
        </div>
        <AudioNav audioElmRef={audioElmRef} />
        <audio
            src={audioURL}
            loop
            autoPlay
            ref={audioElmRef}
            style={{
                position: "fixed",
                top: 0,
                zIndex: 4000
            }}
            onPlay={handleOnPlay}
        />
        </>
    )
}

export default NewVis