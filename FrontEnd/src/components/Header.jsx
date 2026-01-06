import React from 'react'
import '../Header.css';
export default function Header() {
  return (
    <>
     <header>
        <div className='header-title'>
          <div className='title-section'>
            <div>
              <span class="material-symbols-outlined">
                psychology
              </span>
            </div>
            <div>
              Study AI
            </div>
          </div>
          <div className='account-btn-section'>
            <div className='logout-box'>
              <div>
                <span class="material-symbols-outlined text-danger">
                  logout
                </span>
              </div>
              <div>
                <button className='logout-btn'>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
