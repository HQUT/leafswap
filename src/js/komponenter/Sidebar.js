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
import { useProfile } from './ProfileContext';

function SidebarComp({ isLoggedIn, setIsLoggedIn }) {

  const {profileData} = useProfile();

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
  
  const handleCollectionCick = () =>{
    navigate('/collection');
  };
  const handleHomeClick =() =>{
    navigate('/');
  };
  return ( 
  <div >
   {isLoggedIn && profileData &&  (
    <div className="profileprovider-info">
      <img
        className="profileprovider-img"
        src={profileData.profilePic} 
        alt="Profile"
      />
      <span className="profileprovider-name">{profileData.name}</span>
    </div>
)}
    <Sidebar aria-label="Sidebar with logo branding example">
      <Sidebar.Logo href="#">
      <div onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
        <img
          className="custom-logo"
          src="https://clipground.com/images/book-logo-png-12.png"
          alt="Leafswap logo"
        />
        <span className="sidebar-title">Leafswap </span>
        <span className="sidebar-slogan">Say hello to your digital book adventure!</span>
        </div>
       
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Sidebar.Item onClick={handleFindBooksClick} icon={HiChartPie} style={{ cursor: 'pointer' }} >
            Find books
          </Sidebar.Item>
          {isLoggedIn && ( 
          <Sidebar.Item onClick={handleCollectionCick} icon={HiViewBoards} style={{ cursor: 'pointer' }}>
            Collections
          </Sidebar.Item>
           )}
          <Sidebar.Item onClick={handleProfileClick} icon={HiUser} style={{ cursor: 'pointer' }}>
            Profile
          </Sidebar.Item>
          <Sidebar.Item onClick = {handleAboutusCick} icon={HiShoppingBag} style={{ cursor: 'pointer' }}>
            About us
          </Sidebar.Item>
          {!isLoggedIn && (
            <Sidebar.Item onClick={handleSignInClick} icon={HiArrowSmRight} style={{ cursor: 'pointer' }}>
              Sign In/Up
            </Sidebar.Item>
          )}
          {isLoggedIn && (
            <Sidebar.Item onClick={handleLogout} icon={HiArrowSmLeft} style={{ cursor: 'pointer' }}>
              Logout
            </Sidebar.Item>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
     
    </Sidebar>
    </div>
  );
}

export default SidebarComp;
