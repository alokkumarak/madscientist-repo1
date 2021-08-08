import React,{useState,useEffect,useContext} from 'react'
import '../css/homemiddle.css'
import madscience from '../assets/madscience.png'
import Post from './Post'
import Dialog from '@material-ui/core/Dialog';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Input,Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Homemiddle = () => {

     const [completePost,setCompletePost]=useState([]);
     const [time,setTime]=useState(true);  

    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [openabc, setOpenabc] = useState(false);
    const anchorRef = React.useRef(null);
    const [caption, setCaption] = useState("");
    const [photo, setPhoto] = useState("");
    const [url, setUrl] = useState("");

   
    useEffect(() => {
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("instaToken")
            }
        }).then(res => res.json())
            .then(result => {  
                setCompletePost(result.posts);
            })
    }, [])



    useEffect(() => {
        if (url) {
            fetch('/createpost', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('instaToken')
                },
                body: JSON.stringify({
                    caption,
                    photo: url
                })
            }).then(res => res.json())
                .then(post => {
                    if (post.error) {
                        console.log(post.error);
                    }
                    else {
                        console.log(post.message);
                        history.push('/home');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            window.location.reload(false);
            setCaption("")
            setOpenabc(false)
        }

    }, [url])

    const uploadPost=()=>{
        const data = new FormData()
        data.append('file', photo);
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
        setPhoto("");
    }
    // this is for login drawer
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClickOpen = () => {
        setOpenabc(true);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
        setOpenabc(false)
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);



    return (
        <div className="homemiddle">
            <div className="posthere">
                <img src={madscience} alt="madscience" />
                <div className="create"  onClick={handleClickOpen}>
                    <CreateIcon />Create a Post
                </div>
               
            </div>
            <div className="posts">
               {
                   completePost.map(post=>{
                       return <Post likes={post.likes.length} key={post._id} id={post._id} caption={post.caption} photo={post.photo} username={post.createdBy.username} topImage={post.createdBy.profile} userid={post.createdBy._id} completedetail={post}/>
                   })
               }
            </div>

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
                             <img src={madscience} alt="mad" />

                            <div className="postthere">
                                <input
                                    type="text"
                                    placeholder="some caption here"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    required

                                />
                                <Input
                                className="inp"
                                    type="file"
                                    placeholder="upload image here"
                                    style={{ borderBottom: "1px solid rgb(230, 227, 227)", color: '#ffffff' }}
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                />
                                <Button
                                  style={{marginTop:'40px',width:'40%',display:'flex',marginLeft:'auto',marginRight:'auto'}}
                                  variant="contained"
                                  color="secondary"
                                    onClick={uploadPost}
                                >post
                                </Button>
                            </div>
                        </div>
                    </Dialog>
        </div>
    )
}

export default Homemiddle
