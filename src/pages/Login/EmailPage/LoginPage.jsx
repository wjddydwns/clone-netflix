import React from 'react'
import './LoginPage.style.css'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  
  return (
    <div className='content_box'>
      <div className='over_lay_box'>
        <img 
          src='https://assets.nflxext.com/ffe/siteui/vlv3/638e9299-0637-42d1-ba39-54ade4cf2bf6/web/KR-ko-20250203-TRIFECTA-perspective_cfde0186-0612-417f-b5f1-66746713cfff_large.jpg' 
          alt='background'
        />
      </div>
      <div className='title_box'>
        <div className='flex_box'>
          <h1>영화, 시리즈 등을 <br/> 무제한으로</h1>
          <p>5,500원으로 시작하세요. 멤버십은 언제든지 해지 가능합니다.</p>
          <p>시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.</p>
          <div className='Email_box'>
            <input type='text' placeholder='이메일 주소' />
            <button onClick={() => navigate('/browse')}>시작하기</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
