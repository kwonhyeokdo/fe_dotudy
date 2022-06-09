import React from "react";
import {Box, Button, Divider, Stack, TextField, Typography} from "@mui/material";
import {injectIntl} from "react-intl";

class ContentHoc extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            idHelper : this.props.intl.formatMessage({id: "signup.id.error.message"})
        };
        this.onChangeId = this.onChangeId.bind(this);
    }

    onChangeId(event){
        let isValid = true;
        // ID 정규식 체크
        // ID 중복 체크
        console.log(event);
        if(isValid){
            this.setState({idHelper : this.props.intl.formatMessage({id: "signup.id.success.message"})});
        }else{
            this.setState({idHelper : this.props.intl.formatMessage({id: "signup.id.error.message"})});
        }
    }

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
                <Stack spacing={2}
                    sx={{
                        width: 350
                    }}
                >
                    <Typography
                        variant="h3"
                        marginBottom={3}
                    >
                        {this.props.intl.formatMessage({id: "signup.title"})}
                    </Typography>
                    <TextField
                        required
                        label={this.props.intl.formatMessage({id: "signup.id"})}
                        variant="filled"
                        size="small"
                        InputProps={{
                            style: {
                                fontSize: 16
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: 16
                            }
                        }}
                        error
                        helperText={this.state.idHelper}
                        onChange={this.onChangeId}
                    />
                    <Divider light/>
                    <TextField
                        required
                        label={this.props.intl.formatMessage({id: "signup.password"})}
                        variant="filled"
                        size="small"
                        InputProps={{
                            style: {
                                fontSize: 16
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: 16
                            }
                        }}
                        type="password"
                        autoComplete="current-password"
                        error
                        helperText={this.props.intl.formatMessage({id: "signup.password.error.message"})}
                    />
                    <TextField
                        required
                        label={this.props.intl.formatMessage({id: "signup.passwordConfirm"})}
                        variant="filled"
                        size="small"
                        InputProps={{
                            style: {
                                fontSize: 16
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: 16
                            }
                        }}
                        type="password"
                        autoComplete="current-password"
                        error
                        helperText={this.props.intl.formatMessage({id: "signup.passwordConfirm.error.message"})}
                    />
                    <Divider light/>
                    <TextField
                        required
                        label={this.props.intl.formatMessage({id: "signup.nickname"})}
                        variant="filled"
                        size="small"
                        InputProps={{
                            style: {
                                fontSize: 16
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: 16
                            }
                        }}
                        error
                        helperText={this.props.intl.formatMessage({id: "signup.nickname.error.message"})}
                    />
                    <TextField
                        required
                        label={this.props.intl.formatMessage({id: "signup.email"})}
                        variant="filled"
                        InputProps={{
                            style: {
                                fontSize: 16
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: 16
                            }
                        }}
                        error
                        helperText={this.props.intl.formatMessage({id: "signup.email.error.message"})}
                    />
                    <Divider light/>
                    <Button
                        variant="outlined"
                        disabled
                    >
                        회원가입
                    </Button>
                </Stack>
            </Box>
        );
    }
}

const Signup = injectIntl(ContentHoc);

export default Signup;