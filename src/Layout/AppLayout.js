import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';
import './AppLayout.style.css'
import logo from '../assets/logo.png'

const AppLayout = () => {
  return (
    <div>
      <div className='box'>
    <Navbar expand="lg" className="bg-transparent nav-color ">
    <Container fluid>
      <Navbar.Brand href="#">
        <img 
        width={100}
        src={logo}/>
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll" >
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="#action1" className='text-white'>홈</Nav.Link>
          <Nav.Link href="#action2" className='text-white'>시리즈</Nav.Link>
          <Nav.Link href="#action3" className='text-white'>영화</Nav.Link>
          <Nav.Link href="#action4" className='text-white'>NEW! 요즘 대세 콘텐츠</Nav.Link>
         
        
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar> 
  
  </div>
  <div className='outlet-container'>
  <Outlet/>
  </div>
  </div>
  
   )
}

export default AppLayout