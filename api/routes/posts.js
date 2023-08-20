const router = require('express').Router() ;
const Post = require('../models/Post') ;


// create post

router.post("/", (req,res)=>{
    console.log(req.body);
   const blogData =  Post({title: req.body.title, desc: req.body.desc});
   blogData.save();
   res.json({"message" : "Success"});
})

// update post

router.put('/:id',async (req ,res)=>{
    try {
        const post  = await Post.findById(req.params.id)
        if(post.username===req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                },{new:true});
                req.status(200).json(updatedPost) ;
            }catch(err){
                res.status(500).json(err)

            }
        }else{
            res.status(401).json('update your post')
        }
    } catch (error) {
        res.status(500).json(err)
    }
    })

    // delete post
    router.delete('/deleteblog/:id',async (req ,res)=>{
        try {
            const post  = await Post.findById(req.params.id)
            if(post.username===req.body.username){
                try{
                  await Post.delete()
                    req.status(200).json('post has been deleted') ;
                }catch(err){
                    res.status(500).json(err)
    
                }
            }else{
                res.status(401).json('delete your post')
            }
        } catch (error) {
            res.status(500).json(err)
        }
        })
    

    // get post 

    router.get('/:id',async(req,res)=>{
        let objid = req.params.id ;
              console.log(objid)

      const blog = await Post.findById({_id:objid}) ;
    res.json(blog)
    })
    

    // router.get('/:id', async (req, res) => {
    //     try {
    //       const postId = req.params.id;
      
    //       if (!mongoose.Types.ObjectId.isValid(postId)) {
    //         return res.status(400).json({ error: 'Invalid post ID' });
    //       }
      
    //       const post = await Post.findById(postId);
      
    //       if (!post) {
    //         return res.status(404).json({ error: 'Post not found' });
    //       }
      
    //       res.json(post);
    //     } catch (error) {
    //       res.status(500).json({ error: 'Internal server error' });
    //     }
    //   });

    

    router.get('/',async(req,res)=>{
        const username = req.query.User ;
        try{
            let posts ;
            if(username){
                posts = await Post.find({username})
            }else{
                posts =await Post.find()
            }
            res.status(200).json(posts) ;

        }catch(err){
            res.status(500).json(err) ;
        }
    })

module.exports =router