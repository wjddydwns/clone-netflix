import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';
import './AppLayout.style.css';
import logo from '../assets/img/logo.png';
import search from '../assets/img/search.png';

const AppLayout = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [scroll, setScroll] = useState(false);
  const searchRef = useRef(null);

  // 스크롤 이벤트 리스너 설정 (cleanup 포함)
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 검색 아이콘 클릭 시 입력창 토글
  const toggleSearch = () => {
    setIsInputVisible((prev) => !prev);
  };

  // 화면 바깥 클릭 시 입력창 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsInputVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div>
      <div className={`box nav ${scroll ? "nav_black" : ""}`}>
        <Navbar expand="lg" className="bg-transparent nav-color">
          <Container fluid>
            <Navbar.Brand href="#">
              <img width={100} src={logo} alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <Nav.Link href="#action1" className="text-white">홈</Nav.Link>
                <Nav.Link href="#action2" className="text-white">시리즈</Nav.Link>
                <Nav.Link href="#action3" className="text-white">영화</Nav.Link>
                <Nav.Link href="#action4" className="text-white">NEW! 요즘 대세 콘텐츠</Nav.Link>
              </Nav>

              {/* 검색 영역 */}
              <div className={`search`} ref={searchRef}>
                <div className={`search-box ${isInputVisible ? "active" : ""}`}>
                  <img
                    className="img"
                    src={search}
                    alt="search"
                    onClick={toggleSearch}
                  />
                  <input
                    className={`input ${isInputVisible ? "toggle" : ""}`}
                    type="text"
                    placeholder="제목, 사람, 장르"
                  />
                </div>
              </div>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
