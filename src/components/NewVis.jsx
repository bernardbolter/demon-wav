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
    const [audioURL, setAudioURL] = useState(null)
    const progress = useProgress()
    const [analyzer, setAnalyzer] = useState(null)

    const imageRef = useRef(null)
    const analyzerRef = useRef(null)
    const audioRef = useRef(null)
    const audioElmRef = useRef(null)

    // const onFileChange = (e) => {
    //     const file = e.target.files?.[0];
    //     if (!file) return;
    //     setAudioURL(URL.createObjectURL(file))
    //     setAnalyzer(new AudioAnalyzer(audioElmRef.current))
    //     // setDemon(state => {( ...state, currentTrackLength: analyzer.sourceNode.mediaElement.duration)})
    //   };

    useEffect(() => {
        setAudioURL('/audio/uno_alesia.mp3')
        setAnalyzer(new AudioAnalyzer(audioElmRef.current))
    }, [])

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
        </div>
    )
}

export default NewVis