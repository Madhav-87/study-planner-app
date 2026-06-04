
import './Login.css'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate=useNavigate();
    return (
        <div className='header-body'>
            <div className='header-title'>
                <div className='title-section'>
                    <div>
                        <span class="material-symbols-outlined">
                            psychology
                        </span>
                    </div>
                    <div>
                        IntelliStudy
                    </div>
                </div>
            </div>
            <div className='title-headline-section'>
                <div className='title-headline'>
                    Your AI Study Companion
                </div>
                <div className='title-subtxt'>
                    Create personalised study plans and master
                    any subject with AI-powered scheduling and
                    Pormodoro timers.
                </div>
                <div className='title-button-section'>
                    <button className='signUp-btn getStarted-btn' onClick={()=>{navigate("/dashboard")}}>Get Started</button>
                </div>
            </div>
            <div className='title-cards-section'>
                <div className='title-cards-panel'>
                    <div class="card">

                        <div class="card-body">
                            <div className='card-icon'>
                                <span class="material-symbols-outlined lightGreen">
                                    book_ribbon
                                </span>
                            </div>
                            <h5 class="card-title">AI-Generated Plans</h5>
                            <p class="card-text">Create optimized study scheduling based on your subjects, exams, and available time.</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div className='card-icon'>
                                <span class="material-symbols-outlined lightGreen">
                                    timer
                                </span>
                            </div>
                            <h5 class="card-title">Pormodoro Timer</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                    <div class="card" id="card4">
                        <div class="card-body">
                            <div className='card-icon'>
                                <span class="material-symbols-outlined lightGreen">
                                    neurology
                                </span>
                            </div>
                            <h5 class="card-title">personalised Learning</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ready-to-start-section'>
                <div><h1>Ready to Ace Your Exams?</h1></div>
                <div>Students can join and can use AI-powered study planning to achieve their academic goals.</div>
                <div><button className='startJouBtn' onClick={()=>{navigate("/dashboard")}}>Start Your Journey</button></div>
            </div>
            <div className='footer-copy-right'>
                <div><span class="material-symbols-outlined">
                    copyright
                </span></div>
                <div>2025 IntelliStudy. All rights reserved.</div>
            </div>
        </div>
    )
}
