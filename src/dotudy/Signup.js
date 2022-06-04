import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Box, Stack} from "@mui/material";

class Signup extends React.Component{
    render(){
        return(
            <Stack>
                <Header/>
                <Content/>
                <Footer/>
            </Stack>
        );
    }
}

class Content extends React.Component{
    render(){
        return(
            <Box>

            </Box>
        );
    }
}

export default Signup;