"use client"

import { useContext, useEffect } from "react"
import { DemonContext } from "@/providers/DemonProvider"
import { useWindowSize } from "@/hooks/useWindowSize"

import Loading from "@/components/Loading"
import AboutWAV from '@/components/AboutWAV'
import Playlist from '@/components/Playlist'
import AboutTrack from "@/components/AboutTrack"
import NewVis from "@/components/NewVis"

import Logo from "@/svg/Logo"
import PlaylistIcon from "@/svg/PlaylistIcon"
import Play from "@/svg/Play"
// import Tilt from 'react-parallax-tilt'

import dd from "../../public/demonData.json"

const Home = () => {
  const [demon, setDemon] = useContext(DemonContext)
  const size = useWindowSize()
  // console.log(demon)
  
  useEffect(() => {
    // console.log("dd: ", dd)
    setDemon(state => ({ 
      ...state,
      aboutData: dd.about,
      tracksData: dd.tracks,
      productsData: dd.products 
    }))
  }, [dd])



  return (
      <section className="home-container">
        {!demon.assetsLoaded && <Loading text="loading demon WAV" />}
                <div 
                  className="home-logo-container"
                  style={{
                    transform: `translateY(${demon.logoClicked ? 0 : (size.height / 2 ) - 10}px) translateX(-50%)`
                  }}
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
                {/* <Visualizer/> */}
                <NewVis />
                {/* <AudioNav /> */}
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