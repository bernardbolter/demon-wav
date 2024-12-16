import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { DemonContext } from '@/providers/DemonProvider'

import { useWindowSize } from '@/hooks/useWindowSize'

import Play from '@/svg/Play'
import Stop from '@/svg/Stop'
import PlayHead from '@/svg/PlayHead'

import Draggable from 'react-draggable'

const AudioNav = ({ audioElmRef }) => {
    // console.log("audioElm: ", audioElmRef)
    const [demon, setDemon] = useContext(DemonContext)
    const size = useWindowSize()
    const lineRef = useRef()

    // console.log(demon.currentTrackTime)
    const playheadX = useMemo(() => {
        console.log(demon.currentTrackTime)
        console.log(demon.currentTrackLength)
        // console.log((demon.currentTrackTime / demon.currentTrackLength) * (size.width - 20))
        if (demon.currentTrackLength === 0 || demon.currentTrackTime === 0) {
            return 0
        } else {
            return ((demon.currentTrackTime / demon.currentTrackLength) * (size.width - 20) + demon.currentTrackOffset)
        }
    }, [demon.currentTrackTime, demon.currentTrackLength])

    useEffect(() => {
        // console.log("in audionav: ", demon.currentTrackTime, demon.currentTrackLength)
        // console.log("audionav 2: ", demon)
    }, [demon.currentTrackTime, demon.currentTrackLength])
    
    const clickedProgressBar = e => {
        console.log('clicked bar: ', e.clientX, e)
        console.log(lineRef.current, size.width)
        const newTime = (e.clientX * demon.currentTrackLength / lineRef.current.offsetWidth) - 3
        console.log(newTime)
        audioElmRef.current.currentTime = newTime

        setDemon(state => ({
            ...state,
            currentTrackTime: newTime
        }))
    }

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
                {/* <Draggable
                    axis="x"
                    handle=".handle"
                    defaultPosition={{x: 0, y: 0}}
                    position={null}
                    grid={[25, 25]}
                    // scale={1}
                    // onStart={this.handleStart}
                    // onDrag={this.handleDrag}
                    // onStop={this.handleStop}
                    > */}
                    <div 
                        className="audio-nav-progress-playhead-container"
                        style={{
                            transform: `translateX(${playheadX}px)`
                        }}
                    >
                        <PlayHead />
                    </div>
                {/* </Draggable> */}
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
                                    audioElmRef.current.pause()
                                    setDemon(state => ({ ...state, trackPlaying: false}))
                                }}
                            >
                                <Stop />
                            </div>
                        ) : (
                            <div
                                className="audio-nav-svg"
                                onClick={() => {
                                    audioElmRef.current.play()
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