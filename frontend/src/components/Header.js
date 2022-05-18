import React, { useState } from 'react' ;
import { AppBar , Typography , Toolbar, Box , Button,Tabs,Tab} from '@mui/material';
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";


const Header = () => {
const [value, setValue] = useState();

const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  
  return (
   <AppBar 
   position='sticky'
   sx={{background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);"}}>
     <Toolbar>
       <Typography variant = 'h4' >
         BlogsAbb
       </Typography>
      { isLoggedIn && <Box   display="flex" marginLeft={"auto"} marginRight="auto">
      <Tabs  value ={value} onChange={(e ,val)=> setValue(val)} >
        <Tab LinkComponent={Link} to ="/blogs" lable = "All Blogs" />
        <Tab LinkComponent={Link} to ="/myblogs" lable = "My Blogs" />
      </Tabs>
            
       </Box>}
       <Box display= 'flex' marginLeft='auto'>
       { !isLoggedIn && <>  <Button LinkComponent={Link} to ="/login"
          color = 'secondary' sx={{margin : 1, borderRadius : 10}} variant = 'contained'>
           Login
         </Button>
         <Button LinkComponent={Link} to ="/login"
         color = 'secondary'  sx={{margin : 1, borderRadius : 10}} variant = 'contained'>
           SignUp
         </Button></>}
         {isLoggedIn &&
         <Button LinkComponent={Link} to ="/login"
         color = 'secondary'  sx={{margin : 1, borderRadius : 10}} variant = 'contained'>
           LogOut
         </Button>}
       </Box>
     </Toolbar>
   </AppBar>
  )
}

export default Header ;