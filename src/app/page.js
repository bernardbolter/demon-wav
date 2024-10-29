"use client"
import { useContext } from "react"
import { DemonContext } from "@/providers/DemonProvider"

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

      {demon.page === 'about' && <AboutWAV />}
      {demon.page === 'playlist' && <Playlist />}
      {demon.page === 'track' && <AboutTrack />}
    </section>
  )
}

export default Home