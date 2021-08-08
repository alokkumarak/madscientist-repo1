import React from 'react'
import '../css/home.css'
import Homeleft from './Homeleft'
import Homemiddle from './Homemiddle'
import Homeright from './Homeright'
import Navbar from './Navbar'

const Home = () => {
    return (
        <div className="home">
              <Navbar />
            <div className="home_left">
              <Homeleft />
            </div>
            <div className="home_middle">
               <Homemiddle />
           </div>
          <div className="home_right">
            <Homeright />
          </div>
        </div>
    )
}

export default Home
