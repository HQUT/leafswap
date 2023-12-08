import React from 'react';
import { Sidebar } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import { 
  HiArrowSmLeft,
  HiArrowSmRight, 
  HiChartPie, 
  HiInbox, 
  HiShoppingBag, 
  HiTable, 
  HiUser, 
  HiViewBoards 
} from 'react-icons/hi';
import '../App.css';

function SidebarComp() {
  const location = useLocation();
  const shouldShowAuthItems = location.pathname !== '/login';

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
      {shouldShowAuthItems && (
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/search" icon={HiChartPie}>
              Find books
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards}>
              Collections
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Profile
            </Sidebar.Item>
            <Sidebar.Item href="/about" icon={HiShoppingBag}>
              About us
            </Sidebar.Item>
            <Sidebar.Item href="/login" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            
            <Sidebar.Item href="/" icon={HiArrowSmLeft}>
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      )}
    </Sidebar>
  );
}

export default SidebarComp;
