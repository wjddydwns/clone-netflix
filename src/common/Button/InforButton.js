import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";

const InforButton = () => {
  return (
    <div style={{
        display:"flex",
        padding:"10px",
        fontSize:"24px",
        justifyContent:"space-around",
        alignItems:"center",
        width:"148px",
        height:"45px",
        backgroundColor:"rgba(109, 109, 110, 0.7)",
        borderRadius:"7px"
    }}
    className='infor_button'>
        <IoIosInformationCircleOutline />
        <div>상세정보</div>
    </div>
  )
}

export default InforButton