import React from 'react'
import Aurora from '../../assets/Backgrounds/Aurora/Aurora'
import './NotFoundTitle.css'

const NotFoundPage = () => {
  return (
    <div className='error_page'>
      <Aurora
      colorStops={["#8F002B", "#8F002B", "#8F002B"]}
      />
      <div className='error_msg'>404<br/>이런! 요청하신 페이지가 없습니다.</div>
    </div>
  )
}

export default NotFoundPage