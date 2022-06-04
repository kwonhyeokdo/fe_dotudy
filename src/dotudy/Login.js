import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Stack, Box, TextField, Typography, Divider, Button} from "@mui/material"

class Login extends React.Component{
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
                        DOTUDY
                    </Typography>
                    <TextField
                        required
                        label="ID"
                        InputProps={{
                            style: {
                                fontSize: 25
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: 25
                            }
                        }}
                    />
                    <TextField
                        required
                        label="Password"
                        InputProps={{
                            style: {
                                fontSize: 25
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: 25
                            }
                        }}
                        type="password"
                        autoComplete="current-password"
                    />
                    <Divider light/>
                    <Button
                        variant="contained"
                    >
                        로그인
                    </Button>
                    <Button
                        variant="outlined"
                    >
                        회원가입
                    </Button>
                    <Divider light/>
                    <Stack
                        direction="row"
                        spacing={2}
                        divider={<Divider orientation="vertical" flexItem />}
                        sx={{
                            display: "flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                    >
                        <Button>
                            아이디 찾기
                        </Button>
                        <Button>
                            비밀번호 찾기
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        );
    }
}

export default Login;