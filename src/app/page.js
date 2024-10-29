"use client"
import { useContext } from "react"
import { DemonContext } from "@/providers/DemonProvider"

import { AnimatePresence, motion } from "framer-motion"

import Visualizer from "@/components/Visualizer"
import AboutWAV from '@/components/AboutWAV'
import Playlist from '@/components/Playlist'
import AboutTrack from "@/components/AboutTrack"

import Logo from "@/svg/Logo"
import PlaylistIcon from "@/svg/PlaylistIcon"

const Home = () => {
  const [demon, setDemon] = useContext(DemonContext)

  return (
    <section className="home-container">
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