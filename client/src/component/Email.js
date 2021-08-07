import React from 'react'
import madscience from '../assets/madscience.png'
import '../css/email.css';

const Email = () => {
    return (
        <div className="email">
            <div className="email_logo">
               <img src={madscience} alt="lkhj" />
            </div>
            <div className="email_name">
               <div>bhanu merguju</div>
               <p>co_founder of madscientist</p>
            </div>
        </div>
    )
}

export default Email
