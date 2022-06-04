import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box"

class Home extends React.Component{
    render(){
        return(
            <Container
                fixed
                sx={{
                    margin: 0
                }}
            >
                <Header/>
                <Box sx={{
                    width: "100%",
                    height: 500,
                    backgroundColor: "red"
                }}>

                </Box>
                <Footer/>
            </Container>
        );
    }
}

export default Home;