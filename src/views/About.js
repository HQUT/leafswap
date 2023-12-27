import { Link } from "react-router-dom";
import React from 'react'
import { SocialIcon } from 'react-social-icons'

export function About() {
  return (
    <section className="section">
      <div id="pic">
      <h1 className="about">Leafswap</h1>
      <h className="sidebar-slogan">Say Hello To Your Digital Book Adventure!</h>
        <div type="text" className="auText">
        Leafswap is your digital bookshelf with a touch of adventure! Created by KTH students Hiba Qutbuddin Habib and Hibatallah Belhajali, 
        Leafswap is the place where you can discover your favorite books in an efficient and enjoyable way.
          <br></br>
          <br></br>
        <div type="text" className="infoText2">
        <h className="sidebar-slogan">What is Leafswap?</h>
        In our home, there are thousands of books, and we've made it easy for you to find the best book recommendations. 
        You may spot something intriguing in the home view, which you can quickly access it by clicking the home button or 
        simply clicking on our logo. Alternatively, you can use our smart search function to look for books based on the author's 
        name, title, and genre.
            <br/>
            <br/>
        Once you've found a favorite book, you can easily save it in your own collection. We have a pre-defined collection named 
        "Quick Add," but you have the freedom to create your own collections with names of your choice.
            <br/>
            <br/>
        But that's not all! When you create an account, you not only gain access to collections but also to your own profile page. 
        Here, you can choose from various fun avatars and add your personal information. All of this is to make your bookshelf feel just 
        like home, but with the added benefit that you can take it with you wherever you go.
            <br/>
            <br/>
        And if you ever feel that a certain collection or book no longer suits you, no problem! You can easily delete them using 
        our convenient delete function in collections.
            <br/>
            <br/>
        With our handy sidebar menu, you as a user can navigate freely within the application. So why not start your digital book 
        adventure with us and take your very own private bookshelf with you wherever you go?
            <br/>
            <br/>
            
            <h className="sidebar-slogan">Leafswap is waiting for you to dive into the wonderful world of books!</h>

          </div>
          <div style={{ textAlign: 'center' }}>
         <p>You can contact us through the following ways:</p>
         <SocialIcon url="mailto:hibqut1@gmail.com" network="email" />
         <SocialIcon href="https://www.linkedin.com/in/hiba-qutbuddin-habib-713734231/" network="linkedin" />
         </div>
         <div style={{ textAlign: 'center' }}>
         <p>We welcome you to explore our GitHub:</p>
         <SocialIcon href="https://github.com/HQUT?tab=repositories" network="github" />
         </div>

        </div>
      </div>
      <Link to="/" className="home-button">
        Home
      </Link>
    </section>
  );
}
