"use client"

import { useContext, Suspense, useRef, useState, useEffect, useMemo } from "react"
import { DemonContext } from "@/providers/DemonProvider"
import { useWindowSize } from "@/hooks/useWindowSize"

import Loading from "./Loading"

import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import {  OrbitalControls, useProgress } from "@react-three/drei"

import { AudioAnalyzer } from "@/hooks/audioAnylizer"
// https://sabigara.com/posts/audio-visualizer

const NewVis = () => {    
    const [demon, setDemon] = useContext(DemonContext)
    const size = useWindowSize()

    const [desktopImage, setDesktopImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_desktop.jpg'))
    const [desktopDis, setDesktopDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_desktop.jpg'))
    const [mobileImage, setMobileImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_mobile.jpg'))
    const [mobileDis, setMobileDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_mobile.jpg'))
    const [audioURL, setAudioURL] = useState('/audio/uno_alesia.wav')
    const progress = useProgress()

    const imageRef = useRef(null)
    const analyzerRef = useRef(null)
    const audioRef = useRef(null)

    useEffect(() => {

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

    return (
        <div className="visualizer-container">
            <Canvas>
                <ambientLight intensity={2} />
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
                <OrbitalControls />
            </Canvas>
            <AudioNav />
        </div>
    )
}

export default NewVis