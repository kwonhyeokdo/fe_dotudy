import React from "react";
import FindId from "./FindId";
import FindPw from "./FindPw";
import {FormattedMessage, useIntl} from "react-intl";
import {Stack, Box, TextField, Typography, Divider, Button} from "@mui/material"

export default function Signin(){
    const [openFindId, setOpenFindId] = React.useState(false);
    const [openFindPw, setOpenFindPw] = React.useState(false);
    const intl = useIntl();

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
                    <FormattedMessage id="signin.title">DOTUDY</FormattedMessage>
                </Typography>
                <TextField
                    required
                    label={intl.formatMessage({id: "signin.id"})}//ID
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
                    label={intl.formatMessage({id: "signin.password"})}//Password
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
                    <FormattedMessage id="signin.signin">로그인</FormattedMessage>
                </Button>
                <Button
                    variant="outlined"
                    onClick={()=>window.location.href = "/signup"}
                >
                    <FormattedMessage id="signin.signup">회원가입</FormattedMessage>
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
                    <Button onClick={()=>setOpenFindId(true)}>
                        <FormattedMessage id="signin.find.id">아이디 찾기</FormattedMessage>
                    </Button>
                    <Button onClick={()=>setOpenFindPw(true)}>
                        <FormattedMessage id="signin.find.password">비밀번호 찾기</FormattedMessage>
                    </Button>
                </Stack>
            </Stack>
            { openFindId && <FindId open={openFindId} close={()=>{setOpenFindId(false)}}/>}
            { openFindPw && <FindPw open={openFindPw} close={()=>{setOpenFindPw(false)}}/>}
        </Box>
    );
}