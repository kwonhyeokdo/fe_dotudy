import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Box, Stack, Typography} from "@mui/material";

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
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent:"center",
                    alignItems:"center",
                    cursor: "default"
                }}
            >
                <Stack spacing={2}>
                    <Typography
                        variant="h3"
                        marginBottom={3}
                    >
                        회원가입
                    </Typography>
                </Stack>
            </Box>
        );
    }
}

export default Signup;