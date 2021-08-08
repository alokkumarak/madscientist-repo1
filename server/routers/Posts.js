const express=require('express');
const router=express.Router();
const mongoose=require('mongoose')
const Mustlogin=require('../middleWares/Mustlogin.js');
const posts=mongoose.model('posts');
const User=mongoose.model('users');

router.post('/createpost',Mustlogin,(req,res)=>{
    const {caption,photo}=req.body;
    if(!caption || !photo){
        return res.status(405).json({error:'please add all the field'});
    }
    req.user.password=undefined;
    const post=new posts({
        caption,
        photo,
        createdBy:req.user
    })
    post.save()
    .then(result=>{
        res.json({message:'post created successfully !!!!',post:result})
    })
    .catch(error=>{
        console.log(error.message)
    })
})

router.put('/updateprofile', Mustlogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id,
        { $set: { profile: req.body.profile } },
        { new: true },
        (error, result) => {
            if (error) {
                return res.status(422).json({ error: "pic can not updated" });
            }
            else {
                res.json(result)
            }
        })
})

router.get('/myprofilepic', Mustlogin, (req, res) => {
    posts.find({ createdBy: req.body._id })
        
        .then(mypost => {
            res.json({ mypost })
        })
        .catch(error => {
            console.log(error);
        })
})

router.get('/allpost', Mustlogin, (req, res) => {
    posts.find()
        .populate("createdBy", "_id username profile")
        .populate("comments.postedBy", "_id username")
        .sort("-createdAt")
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => {
            console.log(error.message);
        })
})

router.get('/mypost', Mustlogin, (req, res) => {
    posts.find({ createdBy: req.user._id })
        .populate("createdBy", "_id username profile")

        .then(mypost => {
            res.json({ mypost })
        })
        .catch(error => {
            console.log(error);
        })
})

router.put('/like', Mustlogin, (req, res) => {
    posts.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            res.status(405).json({ error: err })
        } else {
            res.json(result)
        }
    })
})

router.put('/unlike', Mustlogin, (req, res) => {
    posts.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            res.status(405).json({ error: err })
        } else {
            res.json(result)
        }
    })
})

router.put('/comment', Mustlogin, (req, res) => {

    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    posts.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
        
    }).populate("comments.postedBy", "_id username")
        .populate("postedBy", "_id username")
        .exec((error, result) => {
            if (error) {
                res.status(500).json({ error: error })
            }
            else {

                res.json(result)
            }
        })
})





module.exports = router;
