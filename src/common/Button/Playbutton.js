import React from 'react'
import { FaPlay } from "react-icons/fa";

const Playbutton = () => {
  return (
    <div style={{
        display:"flex",
        padding:"20px",
        justifyContent:"space-evenly",
        alignItems:"center",
        width:"113px",
        height:"45px",
        backgroundColor: "rgba(255,255,255,0.75)",
        borderRadius:"7px"
    }}
    className='play_button'>
        <FaPlay color='black'/><div style={{fontSize:"24px",color:"black"}}>재생</div>
    </div>
  )
}

export default Playbutton