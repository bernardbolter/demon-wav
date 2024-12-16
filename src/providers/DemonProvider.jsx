"use client"

import { useState, createContext} from 'react'

export const DemonContext = createContext(null)

const DemonProvider = ({ children }) => {

   const [demon, setDemon] = useState({
        page: "home",
        startAudio: false,
        trackPlaying: false,
        currentTrackIndex: 0,
        currentTrackTime: 0,
        currentTrackLength: 0,
        currentTrackOffset: 0,
        playCount: 0,
        aboutData: {},
        tracksData: [],
        productsData: [],
        canvasLoaded: false,
        assetsLoaded: false,
        audioLoaded: true,
        audioPlaying: false,
        newTrackTime: 0,
        restartTrack: false,
        backgroundOffestX: 0,
        backgroundOffestY: 0,
   })

   return (
       <DemonContext.Provider
           value={[demon, setDemon]}
       >
           {children}
       </DemonContext.Provider>
   )
}

export default DemonProvider