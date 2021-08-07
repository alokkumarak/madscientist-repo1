import React from 'react'
import '../css/navbar.css'
import madscience from '../assets/madscience.png'
import SearchIcon from '@material-ui/icons/Search';
import { AppBar } from '@material-ui/core';

const Navbar = () => {
    return (
        <AppBar>
        <div className="navbar">
            <div className="nav__left">
                <div className="madlogo">
                    <img src={madscience} alt="madscience" />
                </div>
               <div className="search">
                 <SearchIcon />
                 <input type="text" placeholder="what do you want?" />
               </div>
            </div>
            <div className="nav__right">
                  <div className="mad">
                       MadScience
                  </div>
                  <div className="madlog">
                    <img src={madscience} alt="madscience" />
                  </div>
            </div>
        </div>
    </AppBar>
    )
}

export default Navbar
