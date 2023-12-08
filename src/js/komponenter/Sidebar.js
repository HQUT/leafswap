import React, { useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiChartPie,
  HiShoppingBag,
  HiUser,
  HiViewBoards
} from 'react-icons/hi';
import '../../App.css';

function SidebarComp({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const [setShowPopup] = useState(false);

  const handleSignInClick = () => {
    if (isLoggedIn) {
      setShowPopup(true);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile'); 
    } else {
      navigate('/login?redirect=/profile'); 
    }
  };

  const handleFindBooksClick = () => {
    navigate('/search'); 
  };

  const handleAboutusCick = () =>{
    navigate('/about');
  };

  return (
    <Sidebar aria-label="Sidebar with logo branding example">
      <Sidebar.Logo href="#">
        <img
          className="custom-logo"
          src="https://clipground.com/images/book-logo-png-12.png"
          alt="Leafswap logo"
        />
        <span className="sidebar-title">Leafswap</span>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Sidebar.Item onClick={handleFindBooksClick} icon={HiChartPie}>
            Find books
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Collections
          </Sidebar.Item>
          <Sidebar.Item onClick={handleProfileClick} icon={HiUser}>
            Profile
          </Sidebar.Item>
          <Sidebar.Item onClick = {handleAboutusCick} icon={HiShoppingBag}>
            About us
          </Sidebar.Item>
          {!isLoggedIn && (
            <Sidebar.Item onClick={handleSignInClick} icon={HiArrowSmRight}>
              Sign In/Up
            </Sidebar.Item>
          )}
          {isLoggedIn && (
            <Sidebar.Item onClick={handleLogout} icon={HiArrowSmLeft}>
              Logout
            </Sidebar.Item>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
     
    </Sidebar>
  );
}

export default SidebarComp;
