import React, { useState } from "react";
import "./profilePicture.css";

const ProfilePicture = ({ avatar, setAvatar }) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div>
            <img src={avatar} className="image" alt="Avatar"/>  
            
            <div className="pictureContainer">
                <button className="changePicButton" type="button" onClick={() => setShowPopup(true)}>Change Avatar</button>
                <div className="popup" style={{display: showPopup ? "block" : "none"}}>
                    <img src="https://imgur.com/U7NDFB6.png" className="popupPic" alt="bearPic" onClick={() => {setShowPopup(false); setAvatar("https://imgur.com/U7NDFB6.png")}}/>
                    <img src="https://imgur.com/VuvuBaa.png" className="popupPic" alt="frogPic" onClick={() => {setShowPopup(false); setAvatar("https://imgur.com/VuvuBaa.png")}}/>
                    <img src="https://imgur.com/iXIZmIL.png" className="popupPic" alt="rabbitPic" onClick={() => {setShowPopup(false); setAvatar("https://imgur.com/iXIZmIL.png")}}/>
                    <img src="https://imgur.com/QbVIBJA.png" className="popupPic" alt="duckPic" onClick={() => {setShowPopup(false); setAvatar("https://imgur.com/QbVIBJA.png")}}/>
                    <img src="https://i.imgur.com/nNSEEza.png" className="popupPic" alt="seagullPic" onClick={() => {setShowPopup(false); setAvatar("https://i.imgur.com/nNSEEza.png")}}/>
                    <img src="https://i.imgur.com/Evf1GZF.png" className="popupPic" alt="seagullPic" onClick={() => {setShowPopup(false); setAvatar("https://i.imgur.com/Evf1GZF.png")}}/>
                    <img src="https://i.imgur.com/ONAioqy.png" className="popupPic" alt="seagullPic" onClick={() => {setShowPopup(false); setAvatar("https://i.imgur.com/ONAioqy.png")}}/>
                    <img src="https://i.imgur.com/owFQ9Xa.png" className="popupPic" alt="seagullPic" onClick={() => {setShowPopup(false); setAvatar("https://i.imgur.com/owFQ9Xa.png")}}/>
                    <button className="exitPopup" type="button" onClick={() => setShowPopup(false)}>x</button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePicture;
