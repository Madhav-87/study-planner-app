import { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header.jsx';
import './Pomodoro.css'
import { useNavigate } from 'react-router-dom';
export default function Pormodoro() {
    const navigate = useNavigate();
    let [isRunning, setIsRunning] = useState(false);
    let [time, setTime] = useState(25 * 60);
    let [countSession, setCountSession] = useState(0);
    let [studyTime, setStudyTime] = useState(0);
    let [volume,setVolume]=useState(false);
    const audioRef=useRef(null)
    useEffect(()=>{
        audioRef.current = new Audio(
            'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'
        )
    },[])
    const playAudio = () => {
        audioRef.current.play();
    }
   const pauseAudio=()=>{
    audioRef.current.pause();
    audioRef.current.currentTime=0;
   }
    const studyTimefunc = () => {
        let min = Math.floor(studyTime / 60);
        return `${min} min`
    }
    useEffect(() => {
        let timer;
        if (isRunning && time > 0) {
            timer = setInterval(() => {
                setTime(prev => prev - 1);
            }, 1000)
        }

        if (time === 0) {
            clearInterval(timer);
            setStudyTime(prev => { return prev + (25 * 60) });
            setCountSession(prev => prev + 1)
            if(!volume){
            playAudio();
            }
        }
        return () => { clearInterval(timer) }//React clean up interval when new effect run
    }, [isRunning,volume, time]);
    const formatTime = () => {
        let min = Math.floor(time / 60);
        let sec = time % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`
    }
    return (
        <div>
            <Header />
            <div className='pormo-body'>
                <div className='header-section'>
                    <div>
                        <span></span>
                        <button onClick={() => { navigate(-1) }}>
                            <span class="material-symbols-outlined">
                                arrow_back
                            </span>
                            <span>
                                Back
                            </span>
                        </button>
                    </div>
                    <div style={{ lineHeight: "9px" }}>
                        <div><h3>Pormodoro Timer</h3></div>
                        <div className='subtxt'>Focus on your studies with interval training</div>
                    </div>
                </div>
                <div className='study-timer-box'>
                    <div className='subtxt text-white'>Study Timer</div>
                    <div className='timer-txt'>{formatTime()}</div>
                    <div className='control-btn'>
                        <div className='play-pause-btn' onClick={() => { isRunning ? setIsRunning(false) : setIsRunning(true); }}>
                            <span class="material-symbols-outlined">
                                {isRunning ? 'pause' : 'play_arrow'}
                            </span>
                        </div>
                        <div className='play-pause-btn reply-btn'
                        onClick={(e) => { setIsRunning(false); setTime(25 * 60); 
                        e.currentTarget.classList.remove("rotate");
                        void e.currentTarget.offsetWidth;
                        e.currentTarget.classList.add('rotate');
                        pauseAudio()
                        }}>
                            <span class="material-symbols-outlined">
                                replay
                            </span>
                        </div>
                    </div>
                </div>
                <div className='study-box'>
                    <div className='timer-info-box'>
                        <div className='subtxt'>Sessions Completed</div>
                        <div><h1><b>{countSession}</b></h1></div>
                    </div>
                    <div className='timer-info-box'>
                        <div className='subtxt'>Study Time Today</div>
                        <div><h1><b>{studyTimefunc()}</b></h1></div>
                    </div>
                    <div className='timer-info-box'>
                        <div className='subtxt sound-on text-dark'>
                            <span class="material-symbols-outlined">
                                volume_up
                            </span>
                            <span>Sound {volume?'off':'on'}</span>
                        </div>
                        <div>
                            {
                            volume
                            ?
                            (<span class="material-symbols-outlined volume-control-icon" onClick={()=>{setVolume(false);}}><h1>
                           volume_off</h1>
                        </span>)
                            :
                            (<span class="material-symbols-outlined volume-control-icon" onClick={()=>{setVolume(true);pauseAudio()}}><h1>
                            volume_up</h1>
                        </span>)
                            }
                        </div>
                    </div>
                </div>
                <div className='poromodoro-tips-section'>
                    <h3>Pormodoro Tips</h3>
                    <div className='subtxt' style={{ lineHeight: "50px" }}>
                        <ul>
                            <li>Study for 25 minutes, then take a 5-minute break</li>
                            <li>After 4 pormodoros, take a 15-minutes long break</li>
                            <li>Keep your workspace distraction free</li>
                            <li>Use breaks to hydrate and stretch</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
