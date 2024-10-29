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
            <h1>PLAYLIST</h1>
        </section>
    )
}

export default Playlist