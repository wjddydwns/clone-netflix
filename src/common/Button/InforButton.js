import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";
import './Button.css'
const InforButton = () => {
  return (
    <div style={{

        backgroundColor:"rgba(109, 109, 110, 0.7)",
    }}
    className='play_box'>
        <IoIosInformationCircleOutline />
        <div className='play_button'>상세정보</div>
    </div>
  )
}

export default InforButton