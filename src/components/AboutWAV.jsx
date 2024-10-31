import { useContext } from "react"
import { DemonContext } from "@/providers/DemonProvider"

import Image from "next/image"

import Close from "@/svg/Close"

const AboutWAV = () => {
    const [demon, setDemon] = useContext(DemonContext)

    return (
        <section className="about-wav-container">
            <div
                className="about-wav-close-container"
                onClick={() => setDemon(state => ({ ...state, page: 'home'}))}
            >
                <Close />
            </div>
            <div className="about-wav-content-container">
                <div className="about-wav-demon-container">
                    <a 
                        href="https://www.demonfootwear.com"
                        className="about-nav-image-container"
                    >
                        <img src="/images/about/about.png" />
                        <p className="about-nav-link">ENTER DEMONFOOTWEAR.COM</p>
                    </a>
                    <div className="about-wav-text-container">
                        <p>Demon WAV hatched from the sheer vocation of Alberto Deon to make music. Semantically, WAV is a direct reference to the audio file format known for best preserving the quality of sounds. The expression WAV stands as an etiological allegory to the universe of computer music, and the way it impacted a generational taste.</p>
                        <p>In Demon WAV, music becomes the chosen channel for interweaving cultural and autobiographical references. Expanding the idea of brand, and product into a multifaceted reality that ultimately becomes a mirror to the self.</p>
                        <p>Design by Sophia Brinkgerd, Philipp Bulk, Jonas Fürste, Leonhard Laupichler</p>
                        <p>Development by Bernard Bolter</p>
                    </div>
                </div>
                <div className="about-wav-product-container">
                    
                </div>
            </div>
        </section>
    )
}

export default AboutWAV