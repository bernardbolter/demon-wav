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

// import { ReactP5Wrapper } from "@p5-wrapper/react"
// import { Sketch } from '@p5-wrapper/react'
// import { NextReactP5Wrapper } from "@p5-wrapper/next"
// import { sketch } from './sketch'

// window.p5 = p5

// await import("p5/lib/addons/p5.sound")

// const sketch = p5 => {
//     p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL)

//     p5.updateWithProps = props => {
//         // console.log(props)
//     }

//     p5.draw = () => {
//         // console.log('p5s')
//     }
// }


const TheVis = ({ analyzer }) => {
    const [demon, setDemon] = useContext(DemonContext)
    const imageRef = useRef(null)
    const size = useWindowSize()
    const viewport = useThree(state => state.viewport)
    const [desktopImage, setDesktopImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_desktop.jpg'))
    const [desktopDis, setDesktopDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_desktop.jpg'))
    const [mobileImage, setMobileImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_mobile.jpg'))
    const [mobileDis, setMobileDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_mobile.jpg'))

    // useEffect(() => {
    //     console.log("straight: ", analyzer)
    // }, [analyzer])

    var getAverage = function(dataArray){
        var total = 0,                               // initialize to 0
            i = 0, length = dataArray.length;
        while(i < length) total += dataArray[i++];   // add all
        return length ? total / length : 0;          // divide (when length !== 0)
    }

    useFrame(() => {
        if (analyzer) {
            // console.log(analyzer)

            if (analyzer.sourceNode.mediaElement.currentTime !== 0) {
                setDemon(state => ({ 
                    ...state, 
                    currentTrackTime: analyzer.sourceNode.mediaElement.currentTime,
                    currentTrackLength: analyzer.sourceNode.mediaElement.duration
                
                }))
            }
            
            const fft = analyzer.getFFT();
            // console.log(fft)
            var theAverage = getAverage(fft)
            // console.log(theAverage)
            imageRef.current.material.displacementScale = -theAverage / 2
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
    const [source, setSource] = useState(null)
    // const [ctx, setCtx] = useState(new AudioContext())

    const imageRef = useRef(null)
    const analyzerRef = useRef(null)
    const audioRef = useRef(null)
    const audioElmRef = useRef(null)

    let audioContext

    useEffect(() => {
        setAnalyzer(new AudioAnalyzer(audioElmRef.current))
    }, [])

    // const onFileChange = (e) => {
    //     const file = e.target.files?.[0];
    //     if (!file) return;
    //     setAudioURL(URL.createObjectURL(file))
    //     setAnalyzer(new AudioAnalyzer(audioElmRef.current))
    //     // setDemon(state => {( ...state, currentTrackLength: analyzer.sourceNode.mediaElement.duration)})
    //   };

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
        
    //     // if (window !== undefined) {
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
    //     // }
    //   }, []);

    //   useEffect(() => {
    //     console.log(source)
    //   }, audioURL)


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
                <TheVis analyzer={analyzer} />
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
        />
        </>
    )
}

export default NewVis