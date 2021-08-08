import React, { useEffect, useState } from 'react'
import '../css/signup.css';
import { Button, Input } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'

function SignUp() {
    const history = useHistory();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [profile, setProfile] = useState("")
    const [url, setUrl] = useState(undefined)

    useEffect(() => {
        if (url) {
            uploadData();
        }
    }, [url])

    const uploadProfile = () => {
        const data = new FormData()
        data.append('file', profile);
        data.append('upload_preset', 'insta-post')
        data.append('cloud_name', 'dpucwezsk')
        fetch('https://api.cloudinary.com/v1_1/dpucwezsk/image/upload', {
            method: 'post',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)

            })
            .catch(error => {
                console.log(error);
            })
        setProfile("");
    }

    const uploadData = () => {
        if (password.length <= 6) {
            console.log('password must be atleast 6 character');
            return
        }
            fetch("/signup", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword,
                    profile: url
                })
            }).then(res => res.json())
                .then(signupData => {
                    if (signupData.error) {
                        console.log(signupData.error);
                    }
                    else {
                        console.log(signupData.message);
                        history.push('/login');
                        setUsername("");
                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");
                    }
                })
                .catch(error => console.log(error));

       
        

    }

    const signup = () => {
        if (profile) {
            uploadProfile();
        }
        else {
            uploadData();
        }

    }

    
    return (
        <div className="signup">
                    <div className="signup__card">
                            <form className="signup__form">
                                <input
                                    className="signup__textField"
                                    type="email" placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className="signup__textField"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    className="signup__textField"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    className="signup__textField"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Input
                                    type="file"
                                    placeholder="upload image here"
                                    style={{ borderBottom: "1px solid rgb(230, 227, 227)", color: '#ffffff' }}
                                    onChange={(e) => setProfile(e.target.files[0])}
                                    target="upload profile pic"
                                />
                                <Button
                                variant="contained"
                                color="secondary"
                                    className="signup__fb"
                                    style={{ marginTop: 15, width: '100%' }}
                                    onClick={signup}>Sign up</Button>

                            </form>
                            
                    </div>

                    <div className="signup__login">
                        <p>Have an account? <Link to='/login' style={{ color: '#0095f6' }}>Log in</Link></p>
                    </div>
                   
            
        
        </div>
    )
}

export default SignUp
