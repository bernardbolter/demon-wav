import { useContext } from "react"
import { DemonContext } from "@/providers/DemonProvider"

import Close from "@/svg/Close"

const AboutTrack = () => {
    const [demon, setDemon] = useContext(DemonContext)

    return (
        <section className="about-track-container">
            <div 
                className="about-track-close-container"
                onClick={() => setDemon(state => ({ ...state, page: "track'"}))}    
            >
                <Close />
            </div>
            <h1>ABOUT TRACK</h1>
        </section>
    )
}

export default AboutTrack