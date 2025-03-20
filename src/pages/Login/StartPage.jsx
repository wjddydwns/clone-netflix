import React from 'react'
import LoginPage from './EmailPage/LoginPage'
import ContentPage from './ContentPage/ContentPage'
import { Container } from 'react-bootstrap'

const StartPage = () => {
  return (
    <div>
        <LoginPage/>
        <ContentPage/>
    </div>
  )
}

export default StartPage