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
            <div className="about-track-info-container">
                <div className="about-track-text-container">
                    <p className="about-track-text">“Uno” explores the complex connection between two souls experiencing both unity and conflict. Inspired by personal experiences, the band aimed to create a track that captures the intense emotions of a symbiotic relationship—the feeling of being trapped in the expectations and "ifs" of the other. The lines “We are identical, but I live in your ifs” convey this ambivalence: being one, yet feeling confined. The metaphor of the "sword of Damocles" amplifies the sense of constant threat and uncertainty. Musically, the song captures this tension with a blend of melancholic melodies and powerful arrangements. “Uno” invites the listener to confront their own inner struggles and break free from the chains of "ifs."</p>
                    <p className="about-track-text-artist">Alberto Deon</p>
                    <p className="about-track-text-artist">Leonardo De Biaggio</p>
                    <p className="about-track-text-artist">Giulio Gabrielli</p>
                    <p className="about-track-text-artist">Edoardo Caizzi</p>
                    <p className="about-track-text-artist">Paolo Donato</p>
                    <p className="about-track-text-artist">Edoardo Staff</p>
                    <p className="about-track-text-artist">Iulian Dimitrenco</p>
                </div>
                <div className="about-track-image-container"  >
                    <img src="/TrackCover.jpg" />
                </div>
            </div>
        </section>
    )
}

export default AboutTrack