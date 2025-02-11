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
                        target="_blank" rel="noopener noreferrer"
                        className="about-nav-image-container"
                    >
                        <img src="/images/about/about.jpg" />
                        <p className="about-nav-link">ENTER DEMONFOOTWEAR.COM</p>
                    </a>
                    <div className="about-wav-text-container">
                        <p>DEMON WAV IS A MEDIA PLATFORM AND EXPRESSIVE VEHICLE FOR THE BRAND DEMON. DEMON WAV ENABLES THE BRAND TO INVESTIGATE THE THRESHOLD BETWEEN digital and manual craft. LIKE DEMON FOOTWEAR , WAV SITS AT THE INTERSECTION BETWEEN PERSONAL TASTE AND THE WIDER CALLING TO REPRESeNT A GENERATIONAL PERSPECTIVE. </p>
                        <p>The overarching tentative is to probe the current state of-the-art of European taste . Deon’s personal taste becomes a thermometer for the current state of being of late millennial culture. Does a European/Italian/Venetian culture still exists? Or has internet completely withered the possibility of culture of being Vernacular, and local?</p>
                        <p>If Demon as an atelier clings to its Venetian and European origins, being manufacturing and local expertise its backbone, the same is not necessarily true when it comes to music culture, intrinsically entrenched into internet which is by its own nature ubiquitous and international.</p>
                        <p>The overarching goal is to PERUSE LOCAL LANGUAGES in search of the last traits of LOCAL SENSITIVITY in post Internet European pop-culture. This search is inserted in the wider conversation on Webnacularism, neologism from Deon’s thesis “Less is Gore” (2018).</p>
                        <p>In the face of what appears as eternal acceleration, WAV aims at yielding a timeless perspective, still having the early 00 as a anagraphical crib, being DEON born in 1995.</p>
                        <p>DEMON WAV IS A COLLABORATIVE PLATFORM BORN FROM THE JOINING OF VISIONS OF A COLLECTIVE OF ARTISTIC DIRECTORS INCLUDING jonas fuerste, leonhard laupichler, philipp bulk, sophia brinkgerd with ALBERTO DEON - THE METAPHORIC AND ACTUAL VOICE OF THE PROJECT.</p>
                        {/* <p>Demon WAV hatched from the sheer vocation of Alberto Deon to make music. Semantically, WAV is a direct reference to the audio file format known for best preserving the quality of sounds. The expression WAV stands as an etiological allegory to the universe of computer music, and the way it impacted a generational taste.</p>
                        <p>In Demon WAV, music becomes the chosen channel for interweaving cultural and autobiographical references. Expanding the idea of brand, and product into a multifaceted reality that ultimately becomes a mirror to the self.</p>
                        <p className="about-wav-credit">Design by Sophia Brinkgerd, Philipp Bulk, Jonas Fürste, Leonhard Laupichler</p>
                        <p className="about-wav-credit">Development by Bernard Bolter</p> */}
                    </div>
                </div>
                <div className="about-wav-product-container">
                    <div className="about-wav-product">
                        <a href="https://www.demonfootwear.com/products/uno"
                        target="_blank" rel="noopener noreferrer"
                        className="about-wav-product-link">
                            <div className="about-wav-image-container">
                                <img src="/images/about/about_0.jpg" alt="track album cover" />
                            </div>
                            <div className="about-wav-product_text_block">
                                <p>UNO – DEMON WAV</p>
                                <p>0,99€</p>
                            </div>
                        </a>
                    </div>
                    <div className="about-wav-product greyed-out">
                        <div className="about-wav-image-container">
                            <img src="/images/about/about_1.jpg" alt="track album cover" />
                        </div>
                        <div className="about-wav-product_text_block">
                            <p>MORE COMING SOON</p>
                            {/* <p>NOVEMBER 2024</p> */}
                        </div>
                    </div>
                    <div className="about-wav-product greyed-out">
                        <div className="about-wav-image-container">
                            <img src="/images/about/about_2.jpg" alt="track album cover" />
                        </div>
                        <div className="about-wav-product_text_block">
                            <p>MORE COMING SOON</p>
                            {/* <p>NOVEMBER 2024</p> */}
                        </div>
                    </div>
                    <div className="about-wav-product greyed-out">
                        <div className="about-wav-image-container">
                            <img src="/images/about/about_3.jpg" alt="track album cover" />
                        </div>
                        <div className="about-wav-product_text_block">
                            <p>MORE COMING SOON</p>
                            {/* <p>NOVEMBER 2024</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutWAV