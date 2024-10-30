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
            return (demon.currentTrackTime / demon.currentTrackLength) * (size.width - 20)
        }
    }, [demon.currentTrackTime, demon.currentTrackLength])

    useEffect(() => {
        // console.log("in audionav: ", demon.currentTrackTime, demon.currentTrackLength)
        // console.log("audionav 2: ", demon)
    }, [demon.currentTrackTime, demon.currentTrackLength])

    return (
        <section className="audio-nav-container">
            <p 
                className="audio-nav-title"
                onClick={() => setDemon(state => ({ ...state, page: 'track' }))}    
            >{demon.tracksData[demon.currentTrackIndex].title}</p>
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
                <div className="audio-nav-progress-line" />
            </div>
            <div className="audio-nav-svg-container">
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
                        onClick={() => setDemon(state => ({ ...state, trackPlaying: !state.trackPlaying}))}
                    >
                        <Play />
                    </div>
                )}
            </div>
        </section>
    )
}

export default AudioNav