import { useContext } from "react"
import { DemonContext } from "@/providers/DemonProvider"
import { useWindowSize } from "@/hooks/useWindowSize"

import Image from "next/image"

import Close from "@/svg/Close"

const AboutTrack = () => {
    const [demon, setDemon] = useContext(DemonContext)
    const size = useWindowSize()

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
                    <p className="about-track-text">{demon.tracksData[demon.currentTrackIndex].text}</p>
                    {demon.tracksData[demon.currentTrackIndex].artists.map(artist => (
                        <p key={artist} className="about-track-text-artist">{artist}</p>
                    ))}
                </div>
                <div className="about-track-image-container">
                    <Image
                        src={`/images/${demon.tracksData[demon.currentTrackIndex].slug}/${demon.tracksData[demon.currentTrackIndex].slug}_cover.jpg`}
                        alt={`cover image for the track by ${demon.tracksData[demon.currentTrackIndex].slug}`}
                        width={size.width < 769 ? size.width * .98 : size.width * .49}
                        height={size.width < 769 ? size.width * .98 : size.width * .49}
                    />
                </div>
            </div>
        </section>
    )
}

export default AboutTrack