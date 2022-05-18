import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const login = () => {
  const [inputs, setInputs] = useState({
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
  const handelSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs);
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
sx={{borderRadius : 3 , marginTop :3}} color="secondary" variant="contained">Submet</Button>

<Button onClick={()=>setIsSignup(!isSignup)}
sx={{borderRadius : 3 , marginTop :3}}  color="primary">Change To {isSignup? "Login" : "Signup" } </Button>

          
        </Box>
      </form>
    </div>
  );
}; 

export default login;
