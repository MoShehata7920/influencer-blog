import user from "../model/user";
import User from "../model/user";
import bcrypt from 'bcryptjs' ;

export const getAllUser = async(req,res,next) => {
    let users ; 
    try {
        users = await User.find() ;
    } catch (err) {
        return res.status(404).json({message:"There is Error"})
    }
    if (!users)  {
        return res.status(404).json({ message:"No User Found" })
    }

    return res.status(200).json({users}) ;
}


export const signup = async (req, res, next) => {
    // console.log(req.body);
    const { name , email, password } = req.body ; 

    let exisitingUser ;
    try {
        exisitingUser = await User.findOne({email});
    }
    catch (err) {
        return console.log(err);
    }
    if (exisitingUser) {
        return res.status(400).json({message:"User Already Exist! Login Instead"});
    } 


    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password:hashedPassword , 
        blogs:[] ,
        // typeofuser

    })


    try {
        await user.save();
    }
    catch (err) {
        return res.status(404).json({message:"There is Error"})
    }

    return res.status(201).json({user}) ; 
};


export const login = async (req,res,next) => {
    const {email,password} = req.body ; 
    let exisitingUser ;
    try {
        exisitingUser = await user.findOne({email})
    }catch (err) {
        return res.status(404).json({message:"There is Error"})
    }
    if (!exisitingUser) {
        return res.status(404).json({message:"Couldn't Find User By This Email"})
    } 

    const isPasswordCorrect = bcrypt.compareSync(password,exisitingUser.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({message:"Incorrect Password"})
    }
    return res.status(200).json({message:"Login Successfully" , user: existingUser })

}