import React,{useState} from 'react'
import '../css/post.css'
import madscience from '../assets/madscience.png'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import MessageIcon from '@material-ui/icons/Message';
import ShareIcon from '@material-ui/icons/Share';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ReportIcon from '@material-ui/icons/Report';

const Post = () => {
    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
        <div className="post">
            <div className="header">
             <img src={madscience} alt="madscience" />
             <div className="mad">
                <h2>MadScientist</h2>
                <p>Head of madscience</p>
             </div>

            </div>
            <div className="content">
                <div className="more">
                     <MoreVertIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
                </div>
                <hr />
               <div className="post_content">
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
               </div>
               <p> read more...</p>
              
            </div>
            <div className="like">
               <div className="like_c">
                  <ThumbUpIcon />
                  <MessageIcon />
               </div>
               <div className="share">
                       <ShareIcon />
               </div>
            </div>

            <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><SaveAltIcon />&nbsp;   <span style={{fontSize:'20px',color:'gray'}}>save</span></MenuItem>
        <MenuItem onClick={handleClose}><ReportIcon />&nbsp;   <span style={{fontSize:'20px',color:'gray'}}>report</span></MenuItem>
      </Menu>
        </div>
    )
}

export default Post
