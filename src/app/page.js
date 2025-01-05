"use client"

import { useContext } from "react"
import { DemonContext } from "@/providers/DemonProvider"
import { useWindowSize } from "@/hooks/useWindowSize"

import Loading from "@/components/Loading"
import AboutWAV from '@/components/AboutWAV'
import Playlist from '@/components/Playlist'
import AboutTrack from "@/components/AboutTrack"
import Visualizer from "@/components/Visualizer"

import Logo from "@/svg/Logo"
import PlaylistIcon from "@/svg/PlaylistIcon"
import Play from "@/svg/Play"

const Home = () => {
  const [demon, setDemon] = useContext(DemonContext)
  const size = useWindowSize()
  // console.log(demon)

  return (
      <section className="home-container">
        {!demon.assetsLoaded && <Loading text="loading demon WAV" />}
                <div 
                  className={demon.logoClicked ? "home-logo-container home-logo-container-clicked" : "home-logo-container"}

                  onClick={() => {
                    if (!demon.logoClicked) {
                      setDemon(state => ({ ...state, logoClicked: true, startAudio: true }))
                      setTimeout(() => {
                        setDemon(state => ({ ...state, greyFaded: true }))
                      }, 1000)
                    } else {
                      if (demon.page === 'about') {
                        setDemon(state => ({ ...state, page: 'home' }))
                      } else {
                        setDemon(state => ({ ...state, page: 'about' }))
                      }
                    }
                  }}
                >
                  <Logo />
                </div>
                {!demon.greyFaded && (
                  <div 
                    className="grey-background"
                    style={{
                      opacity: !demon.logoClicked ? 1 : 0
                    }}
                  />
                )}
                  <div 
                    className="loading-image-container"
                    style={{
                      transform: `translate(${demon.backgroundOffestX}px, ${demon.backgroundOffestY}px) scale(1.15)`,
                      opacity: .5
                    }}
                  >
                    {size.width > 768 ? (
                        <img src='/images/uno_alesia/uno_alesia_desktop.jpg' alt="loading desktop" />
                    ) : (
                      <img src='/images/uno_alesia/uno_alesia_mobile.jpg' alt="loading mobile" />
                    )}
                  </div>
                <Visualizer/>
                {/* <div 
                  className="home-playlist-container"
                  onClick={() => {
                    if (demon.page === 'playlist') {
                      setDemon(state => ({ ...state, page: 'home' }))
                    } else {
                      setDemon(state => ({ ...state, page: 'playlist' }))
                    }
                  }}
                >
                  <PlaylistIcon />
                </div> */}
                {demon.page === 'about' && (
                    <AboutWAV />
                )}
                {/* {demon.page === 'playlist' && (
                    <Playlist />
                )} */}
                {demon.page === 'track' && (
                    <AboutTrack />
                )}
  </section>
  )
}

export default Home