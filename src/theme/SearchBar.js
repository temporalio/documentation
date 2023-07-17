import React, { useState } from 'react';
import './search.css';


function SearchIcon({ open }) {
  if (open) {
    return (
      <img className="temporal-ball"
        src='/img/Temporal_Logo_Animation.gif'
        width='40px'
        height='40px'
      />
    )
  }
  return (
    <img className='search' src='/img/search.svg' width='20px' height='20px' />
  )
}


function SearchBar({ onClick, open }) {
  return (
    <div onClick={onClick} className="widget-container" >
      <div className="widget"
      >
        <div className="widget-text" >
          <SearchIcon open={open} />
          <div class="ask">Ask</div>
        </div>
        <div className="ai-container">
          <span className="ai-text"><span class="ai-text-temporal">Temporal</span>IQ</span>
        </div>
      </div>
    </div >
  );
}


function Modal({ show, close }) {
  if (show) {
    return (
      <div stl className="modal-overlay" onClick={close} >
        <div className="modal" onClick={e => e.stopPropagation()}>
          <iframe src="https://iq.temporal.io" />
        </div>
      </div>
    );
  }

  return null;
}


export default function Search() {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <SearchBar open={open} onClick={() => setOpen(!open)} />
      <Modal show={open} close={() => setOpen(false)} />
    </React.Fragment>
  );
}
