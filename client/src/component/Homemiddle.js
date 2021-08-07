import React from 'react'
import '../css/homemiddle.css'
import madscience from '../assets/madscience.png'
import Post from './Post'

const Homemiddle = () => {
    return (
        <div className="homemiddle">
            <div className="posthere">
                <img src={madscience} alt="madscience" />
                <div className="create">
                    Create a Post
                </div>
            </div>
            <div className="posts">
               <Post />
               <Post />
               <Post />
               <Post />
               <Post />
            </div>
        </div>
    )
}

export default Homemiddle
