import React from 'react'
import './loader.css';
export default function Loader() {
  return (
     <div>
      
      <div className='blur-background'></div>
      <div className="box-loader">
      <div className='loader-message'>Plan is Generating</div>
      <div className="loader"><div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div></div>
    </div>
    </div>
  )
}
