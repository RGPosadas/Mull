import React from 'react';
import '../styles/navigation.scss';
import AddIcon from '../../assets/icons/nav/AddIcon.svg';
import HomeIcon from '../../assets/icons/nav/HomeIcon.svg';
import MapIcon from '../../assets/icons/nav/MapIcon.svg';
import MenuIcon from '../../assets/icons/nav/MenuIcon.svg';
import ProfileIcon from '../../assets/icons/nav/ProfileIcon.svg';

export default function Navigation() {
    return (    
        <div className="nav-buttons"> 
            <a href="/home"> <img className="home-icon" src={HomeIcon} alt="chat"/> </a>              
            <a href="/map"> <img className="map-icon" src={MapIcon} alt="map"/> </a>
            <img className="add-icon" src={AddIcon} alt="add"/> 
            <img className="menu-icon" src={MenuIcon} alt="menu"/>
            <a href="/profile"> <img className="ProfileIcon" src={ProfileIcon} alt="profile"/> </a>
        </div>
    );
};

