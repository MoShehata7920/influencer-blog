import mongoose from "mongoose";
import Blog from "../model/Blog";
import blog from "../model/Blog";
import user from "../model/user";
import User from "../model/user";

export const getAllBlogs = async(req,res,next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    }

    catch (err) {
        return console.log(err);
    }

    if (!blogs) {
        return res.status(404).json({message:"No Blogs Found"})
    }

    return res.status(200).json({blogs})
}


export const addBlog = async (req,res,next) => {
    const {title,description,image,user} = req.body ;

    let exisitingUser 
    try {
        exisitingUser = await User.findById (user);
    }

    catch (err) {
        return console.log(err);
    }

    if (!exisitingUser) {
        return res.status(400).json ({message:"Unable To Find The User By This ID"} ) ;
    }

    const blog = new Blog ({
        title,
        description ,
        image ,
        user
    });

    try {
        const session = await mongoose.startSession() ;
        session.startTransaction() ;
        await blog.save({session});
        exisitingUser.blogs.push(blog) ;
        await exisitingUser.save({session});

        await session.commitTransaction() ;
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({message:"There Is Error"});
    }

    return res.status(200).json({blog})
};


export const updateBlog = async (req,res,next) => {

    const {title, description} = req.body ;

    const blogId = req.params.id ;

    let blog ;
    
    try {
        blog = await Blog.findByIdAndUpdate(blogId , {
            title , 
            description
        })
    }

    catch (err) {
        return console.log(err);
    }

    if(!blog) {
        return res.status(500).json({message:"Unable To Update The Blog"})
    }

    return res.status(200).json({blog})
}

export const getById = async (req , res , next) => {
    const id = req.params.id ; 
    let blog ;
    try {
        blog = await Blog.findById(id) ;
    }

    catch (err) {
        return res.status(404).json({message:"There Is Error"});
    }

    if (!blog) {
        return res.status(404).json({message:"No Blog found"});
    }

    return res.status(200).json({blog});
}


export const deleteBlog = async (req , res , next ) => {
    const id = req.params.id ;

    let blog ;

    try {
        blog = await Blog.findByIdAndRemove(id).populate('user') ;
        await blog.user.blogs.pull(blog) ;
        await blog.user.save() ;
    }

    catch {
        return res.status(404).json({message:"There Is Error"});
    }

    if(!blog) {
        return res.status(500).json({message:"Unable To Delete"});
    }

    return res.status(200).json({message:"Deleted Successfully"});
}


export const getByUserId = async (req, res , next) => {
    const userId = req.params.id ; 

    let userBlogs ;

    try {
        userBlogs = await User .findById(userId).populate("blogs") ;
    }

    catch (err) {
        return console.log(err);
    }

    if (!userBlogs) {
        return res.status(404).json({message:"No Blog Found"}) ;
    }

    return res.status(200).json({blogs:userBlogs})
}