import React,{useState,useRef,useContext,useEffect} from 'react'
import '../css/navbar.css'
import madscience from '../assets/madscience.png'
import SearchIcon from '@material-ui/icons/Search';
import { AppBar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { UserContext } from '../App';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  
  const [open, setOpen] = useState(false);
  const [openabc, setOpenabc] = useState(false);
  const anchorRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState("");
  const [url, setUrl] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logout=()=>{
      localStorage.clear();
      dispatch({Type:'CLEAR'})
      history.push('/login');
    }

    return (
        <AppBar>
        <div className="navbar">
            <div className="nav__left">
              <Link to="/home">
                <div className="madlogo">
                    <img src={madscience} alt="madscience" />
                </div>
                </Link>
               <div className="search">
                 <SearchIcon />
                 <input type="text" placeholder="what do you want?" />
               </div>
            </div>
            <div className="nav__right">
                  <div className="mad">
                       MadScience
                  </div>
                  <div className="madlog" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{cursor:'pointer'}}>
                    <img src={madscience} alt="madscience" />
                  </div>
            </div>
        </div>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><AccountCircleIcon />&nbsp;  <Link to="/profile"><span style={{fontSize:'20px',color:'gray'}}>profile</span></Link></MenuItem>
        <MenuItem onClick={logout}><PowerSettingsNewIcon />&nbsp;   <span style={{fontSize:'20px',color:'gray'}}>logout</span></MenuItem>
      </Menu>
    </AppBar>
    )
}

export default Navbar
