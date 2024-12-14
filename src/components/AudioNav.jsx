import { useContext, useEffect, useMemo } from 'react'
import { DemonContext } from '@/providers/DemonProvider'

import { useWindowSize } from '@/hooks/useWindowSize'

import Play from '@/svg/Play'
import Stop from '@/svg/Stop'
import PlayHead from '@/svg/PlayHead'

const AudioNav = () => {
    const [demon, setDemon] = useContext(DemonContext)
    const size = useWindowSize()
    // console.log(demon.currentTrackTime)
    const playheadX = useMemo(() => {
        // console.log(demon.currentTrackTime)
        // console.log(demon.currentTrackLength)
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
        console.log('clicked bar: ', e)
        if (demon.trackPlaying) {
            setDemon(state => ({ ...state, trackPlaying: false}))
        }
        setDemon(state => ({
            ...state,
            trackPlaying: true,
            newTrackTime: state.currentTrackTime + 20,
            currentTrackOffset: 20
        }))
    } 

    return (
        <section className="audio-nav-container">
            <p 
                className="audio-nav-title"
                onClick={() => setDemon(state => ({ ...state, page: 'track' }))}    
            >UNO – DEMON WAV</p>
            <div className="audio-nav-progress">
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
                    onClick={e => clickedProgressBar(e)}    
                />
            </div>
            <div className="audio-nav-svg-container">
                {demon.audioLoaded && (
                    <>
                        {demon.trackPlaying ? (
                            <div
                                className="audio-nav-svg"
                                onClick={() => setDemon(state => ({ ...state, trackPlaying: !state.trackPlaying}))}
                            >
                                <Stop />
                            </div>
                        ) : (
                            <div
                                className="audio-nav-svg"
                                onClick={() => setDemon(state => ({ 
                                    ...state, 
                                    trackPlaying: !state.trackPlaying,
                                    startAudio: true
                                }))}
                            >
                                <Play />
                            </div> 
                        )}
                    </>
                )}
                <div
                    style={{ width: 20, height: 20, background: "green"}}
                    onClick={() => {
                        setDemon(state => ({ ...state, restartTrack: true }))
                    }}
                />
            </div>
        </section>
    )
}

export default AudioNav