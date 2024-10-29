import { useContext } from "react"
import { DemonContext } from "@/providers/DemonProvider"

import Close from "@/svg/Close"

const Playlist = () => {
    const [demon, setDemon] = useContext(DemonContext)

    return (
        <section className="playlist-container">
            <div 
                className="playlist-close-container"
                onClick={() => setDemon(state => ({ ...state, page: "home'"}))}    
            >
                <Close />
            </div>
            <div className="playlist-text-container">
                <h1 className="playlist-text">UNO - ALESIA</h1>
                <h1 className="playlist-more-text">MORE COMING SOON</h1>
            </div>
        </section>
    )
}

export default Playlist