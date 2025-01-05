"use client"

import { useContext, useMemo, useRef, useEffect } from 'react'
import { DemonContext } from '@/providers/DemonProvider'

import { useWindowSize } from '@/hooks/useWindowSize'

import Play from '@/svg/Play'
import Stop from '@/svg/Stop'
import PlayHead from '@/svg/PlayHead'

const AudioNav = ({ audioRef }) => {
    // console.log("audioElm: ", audioRef.current)
    const [demon, setDemon] = useContext(DemonContext)
    const size = useWindowSize()
    const lineRef = useRef()

    // console.log(demon.currentTrackTime)
    const playheadX = useMemo(() => {
        // console.log('playhead current time: ', demon.currentTrackTime)
        // console.log('playheade track length: ', demon.currentTrackLength)

        if (demon.currentTrackLength === 0 || demon.currentTrackTime === 0) {
            return 0
        } else {
            return ((demon.currentTrackTime / demon.currentTrackLength) * (size.width - 20) )
        }
    }, [demon.currentTrackTime, demon.currentTrackLength])
    
    const clickedProgressBar = e => {
        // console.log('clicked bar: ', e.clientX)
        // console.log('line offset: ', lineRef.current.offsetWidth)
        // console.log('whole width: ', size.width)
        // console.log('track length: ', demon.currentTrackLength)
        const newTime = (e.clientX * demon.currentTrackLength / lineRef.current.offsetWidth) - 3
        // console.log("new time: ", newTime)
        audioRef.current.currentTime = newTime

        setDemon(state => ({
            ...state,
            currentTrackTime: newTime
        }))
    }

    useEffect(() => {
        if (demon.startAudio) {
            audioRef.current.play()
            setDemon(state => ({ 
                ...state, 
                trackPlaying: true
            }))
        }
    }, [demon.startAudio])

    return (
        <section className="audio-nav-container">
            <p 
                className="audio-nav-title"
                onClick={() => setDemon(state => ({ ...state, page: 'track' }))}    
            >UNO – DEMON WAV</p>
            <div 
                className="audio-nav-progress"
                onClick={e => clickedProgressBar(e)}    
            >
                <div
                    className="audio-nav-progress-playhead-begining"
                    style={{
                        width: `${playheadX}px`
                    }}
                />
                    <div 
                        className="audio-nav-progress-playhead-container"
                        style={{
                            transform: `translateX(${playheadX}px)`
                        }}
                    >
                        <PlayHead />
                    </div>
                <div 
                    className="audio-nav-progress-line" 
                    ref={lineRef}    
                />
            </div>
            <div className="audio-nav-svg-container">
                {demon.audioLoaded && (
                    <>
                        {demon.trackPlaying ? (
                            <div
                                className="audio-nav-svg"
                                onClick={() => {
                                    audioRef.current.pause()
                                    setDemon(state => ({ ...state, trackPlaying: false}))
                                }}
                            >
                                <Stop />
                            </div>
                        ) : (
                            <div
                                className="audio-nav-svg"
                                onClick={() => {
                                    audioRef.current.play()
                                    setDemon(state => ({ 
                                        ...state, 
                                        trackPlaying: true
                                    }))
                                }}
                            >
                                <Play />
                            </div> 
                        )}
                    </>
                )}
            </div>
        </section>
    )
}

export default AudioNav