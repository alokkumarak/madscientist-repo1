import React,{useRef, useState,useContext} from 'react'
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
import { UserContext } from '../App';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SendIcon from '@material-ui/icons/Send';
import { Avatar, Input } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Post = ({topImage,id,userid,caption,photo,username,likes,completedetail}) => {
  const { state, dispatch } = useContext(UserContext);
  const [like, setLike] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [openabc, setOpenabc] = useState(false);
//   const [comment, setComment] = useState("")
  const [commentShow, setCommentShow] = useState([])


    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
        setOpenabc(false)
  };
  const handleClickOpen = () => {
    setOpenabc(true);
};

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
    }
}

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
};


  // like post
  const likePost = (id) => {
    // e.preventDefault();
    fetch('/like', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('instaToken')
        },
        body: JSON.stringify({
            postId: id
        })
    }).then(res => res.json())
        .then(likes => {
            const newLike = like.map(likee => {
                if (likee._id === likes._id) {
                    return likes
                } else {
                    return likee
                }
            })
            // setLikeState(likes._id);
            setLike(newLike);
        })
        .catch(err => {
            console.log(err);
        })

    window.location.reload(false);
}

// unlike post
const unlikePost = (id) => {
  fetch('/unlike', {
      method: 'put',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('instaToken')
      },
      body: JSON.stringify({
          postId: id
      })
  }).then(res => res.json())
      .then(unlikes => {
          const newData = like.map(unlike => {
              if (unlike._id === unlikes._id) {
                  return unlikes
              }
              else {
                  return unlike
              }
          })
          setLike(newData)
         
      }).catch(err => console.log(err))
  
  window.location.reload(false);

}

// add comment in post
const addComment = (text, postId) => {
  if (!text == "") {
      fetch("/comment", {
          method: "put",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('instaToken')
          },
          body: JSON.stringify({
              postId,
              text
          })
      }).then(res => res.json())
          .then(commentI => {
              // console.log(commentI);
              const commentData = commentShow.map(comment => {
                  if (comment._id === commentI._id) {
                      return commentI;
                  } else {
                      return comment
                  }
              })
              setCommentShow(commentData)
          }).catch(err => console.log(err))
  } else {
      console.log("Please Enter some text to comment");
  }
  window.location.reload(false);
}


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
                 {
                   completedetail.likes.includes(state._id)
                   ?<div className="thumbs"><ThumbUpIcon onClick={()=>unlikePost(completedetail._id)}/></div>
                   : <div><ThumbUpIcon onClick={()=>likePost(completedetail._id)}/></div>

                 }
                  <MessageIcon
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  // aria-haspopup="true"
                  onClick={handleToggle} />
               </div>
               <div className="share">
                       <ShareIcon />
               </div>
            </div>
            <div className="numbers">
                <p>{likes} likes</p>
                <p onClick={handleClickOpen}>see all {completedetail.comments.length} comments</p>
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


      {/* commmet poper */}
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <div className="addcomment">
                            <Paper >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            addComment(e.target[0].value, id)
                                        }}><Input type="text" className="commentFiled" placeholder="Write a comment here..." required /><button ><SendIcon onClick={handleClose} /></button></form>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </div>
                    </Grow>
                )}
            </Popper>




            {/* see comments */}
            <Dialog
                        open={openabc}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <div className="postpage">
                            <CloseIcon onClick={handleClose} />
                             <div className="showComment">
                             {
                            completedetail.comments.map(commentIKJ => {
                                return (
                                    <div className="singleComment">
                                        <div className="commentName">{commentIKJ.postedBy.username}:&nbsp; </div>
                                        <div className="commentComment">
                                            {commentIKJ.text}
                                        </div>
                                    </div>
                                )
                            })
                        }
                             </div>
                      
                        </div>
                    </Dialog>
        </div>
    )
}

export default Post
