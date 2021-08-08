import React, { useState, useContext } from 'react'
import '../css/login.css';
import { Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
 import { UserContext } from '../App';

function Login() {
     const { state, dispatch } = useContext(UserContext);
    const logo = "https://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-white-text-black-background.png"
    const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        fetch("/signin", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(signinData => {
                if (signinData.error) {
                    console.log(signinData.error);
                }
                else {
                    console.log(signinData.message);

                    localStorage.setItem("instaToken", signinData.token);
                    localStorage.setItem("user", JSON.stringify(signinData.user))

                    //dispatch authanticated user
                    // const userDetail = JSON.stringify();
                    dispatch({ type: 'USER', payload: signinData.user });
                    history.push('/home');
                    setEmail("");
                    setPassword("");
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="login">
                    <div className="login__card" >
                        
                       
                            <form className="login__form">
                                <input
                                    className="login__textField"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <input
                                    className="login__textField"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <Button
                                   variant="contained"
                                   color="secondary"
                                    className="login__fb"
                                    style={{ marginTop: 15, width: '100%' }}
                                    onClick={login}
                                >
                                    Sign in
                                </Button>

                            </form>

                        </div>
                       
                    <div className="login__login">
                        <p>don't have an account? <Link to="/" style={{ color: '#0095f6' }}>signup</Link></p>
                    </div>

        </div>
    )
}

export default Login