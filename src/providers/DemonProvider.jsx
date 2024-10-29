"use client"

import { useState, createContext} from 'react'

export const DemonContext = createContext(null)

const DemonProvider = ({ children }) => {

   const [demon, setDemon] = useState({
        page: "home",
        trackPlaying: false,
        currentTrackTime: 0,
        currentTrackLength: 0,
        playCount: 0
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