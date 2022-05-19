import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios' ;
import {useDispatch} from "react-redux" ;
import {authActions} from "../store" ;

const Login = () => {
  const dispath = useDispatch() ;
  const [inputs, setInputs] = useState ({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handelChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
      
    })
    )
  };

  const sendRequest = async (type="login") => {
    const res = await axios.post(`http://localhost:4000/api/user/${type}` , {
      name : inputs.name ,
      email : inputs.email , 
      password : inputs.password 
    }). catch (err => console.log(err)) ;

    const data = await res.data ;
    return data
  }

  const handelSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs);

    if (isSignup) {
      sendRequest("signup").then(()=>dispath(authActions.Login())).then(data=>console.log(data)) ; 
    }
    else {
      sendRequest().then(()=>dispath(authActions.Login())).then(data=>console.log(data)) ; 
    }
  };
  return (
    <div>
      <form onChange={handelSubmit}>
        <Box maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >

<Typography padding={3} textAlign="center" variant="h2"> {isSignup? "Signup": "Login"}</Typography>

{isSignup && <TextField name = "name" onChange={handelChange}
value = {inputs.name}
 placeholder="Name" margin="normal" />}

<TextField name = "email" onChange={handelChange}
value = {inputs.email}
 placeholder="Email" type={"email"} margin="normal" />

<TextField name = "password" onChange={handelChange}
 value = {inputs.password}
placeholder="Password" type={"password"} margin="normal" />

<Button type ="submit" 
sx={{borderRadius : 3 , marginTop :3}} color="secondary" variant="contained">Submit</Button>

<Button onClick={()=>setIsSignup(!isSignup)}
sx={{borderRadius : 3 , marginTop :3}}  color="primary">Change To {isSignup? "Login" : "Signup" } </Button>

          
        </Box>
      </form>
    </div>
  );
}; 

export default Login;
