import React, { useContext, useEffect, useState,useRef } from 'react'
import Navbar from './Navbar'
import '../css/profile.css'
import { Avatar} from '@material-ui/core'
import Settings from '@material-ui/icons/Settings'
import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';
import LiveTvOutlinedIcon from '@material-ui/icons/LiveTvOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'





function Profile() {
    const [mypic, setMypic] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    const anchorRef = useRef(null);
    const [profilePicture, setProfilePicture] = useState([]);



    const history = useHistory();

    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("instaToken")
            }
        }).then(res => res.json())
            .then(myprofile => {
                
                setMypic(myprofile.mypost)
            })
    }, [])



    // show profile pic
    useEffect(() => {
        fetch('/myprofilepic', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("instaToken")
            }
        }).then(res => res.json())
            .then(result => {
               
                setProfilePicture(result.mypost);
               

            })
    }, [])



    return (
        <div className="profile">
            <Navbar />
            {/* {console.log(profilePicture)} */}
            <div className="profile__profile">
                <div className="profile__top">
                    <div className="profile__topLeft">
                        <Avatar src={state ? state.profile : "loading.."} />
                   
                    </div>
                    <div className="profile__topRight">
                        <div className="profile__user">
                            <div className="profile__username">{state ? state.username : "loading..."}</div>
                            <div className="profile__edit">Edit Profile</div>
                            <div className="profile__setting"><Settings /></div>
                        </div>
                        <div className="profile_posts">
                            <div className="profile__post">{mypic.length} posts</div>
                            <div className="profile__follower">251 followers</div>
                            <div className="profile__followings">163 followings</div>
                        </div>
                        <div className="profile__displayName">
                            {state && state.email}
                        </div>
                       

                    </div>
                </div>

              
                <div className="profile__line"></div>

                <div className="profile__igtv">
                    <div className="profile__p"><GridOnOutlinedIcon />&nbsp;POSTS</div>
                    <div className="profile__q"><LiveTvOutlinedIcon />&nbsp;IGTV</div>
                    <div className="profile__r"><BookmarkBorderOutlinedIcon />&nbsp;SAVED</div>
                    <div className="profile__s"><AccountBoxOutlinedIcon />&nbsp;TAGGED</div>
                </div>

                <div className="profile__photos">
                    {
                        mypic.map(post => {
                            return (
                                <div className="profile__photo">
                                    <img src={post.photo} alt="uploaded" />
                                </div>
                            )
                        })
                    }
                </div>

                


            </div>

        </div>
    )
}

export default Profile