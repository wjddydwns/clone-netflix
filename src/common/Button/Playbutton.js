import React from 'react'
import { FaPlay } from "react-icons/fa";
import './Button.css'

const Playbutton = () => {
  return (
    <div className='play_box'>
        <FaPlay color='black'/><div className='play_button'>재생</div>
    </div>
  )
}

export default Playbutton