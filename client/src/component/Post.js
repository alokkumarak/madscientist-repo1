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

const Post = ({topImage,id,userid,caption,photo,username,likes,completedetail}) => {
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
             <img src={topImage} alt="madscience" />
             <div className="mad">
                <h2>{username}</h2>
                <p>Head of madscience</p>
             </div>

            </div>
            <div className="content">
                <div className="more">
                     <MoreVertIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
                </div>
                <hr />
               <div className="post_content">
                {caption}
               </div>
               <p> read more...</p>
               <img src={photo} alt="mad" width="100%" style={{marginTop:'30px',}}/>
              
            </div>
            <div className="like">
               <div className="like_c">
                  <ThumbUpIcon />
                  <MessageIcon/>
               </div>
               <div className="share">
                       <ShareIcon />
               </div>
            </div>
            <div className="numbers">
                <p>{likes} likes</p>
                <p>see all {completedetail.comments.length} comments</p>
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
