"use client"
import { useContext, useEffect, Suspense, lazy } from "react"
import { DemonContext } from "@/providers/DemonProvider"

import { AnimatePresence, motion } from "framer-motion"

import Loading from "@/components/Loading"
import AboutWAV from '@/components/AboutWAV'
import Playlist from '@/components/Playlist'
import AboutTrack from "@/components/AboutTrack"

const Visualizer = lazy(() => import("@/components/Visualizer"))

import Logo from "@/svg/Logo"
import PlaylistIcon from "@/svg/PlaylistIcon"

import dd from "../../public/demonData.json"

const Home = () => {
  const [demon, setDemon] = useContext(DemonContext)
  console.log(demon)
  
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
        {!demon.canvasLoaded && <Loading text="loading demon WAV" />}
        <div 
          className="home-logo-container"
          onClick={() => setDemon(state => ({ ...state, page: 'about' }))}
        >
          <Logo />
        </div>
          
            <Visualizer/>
          
        <div 
          className="home-playlist-container"
          onClick={() => setDemon(state => ({ ...state, page: 'playlist' }))}
        >
          <PlaylistIcon />
        </div>
        <AnimatePresence>
          {demon.page === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AboutWAV />
            </motion.div>
          )}
          {demon.page === 'playlist' && (
            <motion.div
              key="playlist"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Playlist />
            </motion.div>
          )}
          {demon.page === 'track' && (
            <motion.div
              key="track"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AboutTrack />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
  )
}

export default Home