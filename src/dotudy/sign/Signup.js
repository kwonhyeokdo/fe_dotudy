import React from "react";
import {Box, Button, Divider, Stack, TextField, Typography} from "@mui/material";
import {FormattedMessage, injectIntl} from "react-intl";
import {util_isEmpty} from "dotudy/Util"

class ContentHoc extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id_setHelper: this.props.intl.formatMessage({id: "signup.id.error.message"}), //영문, 숫자 조합 5~20자로 만들어주세요.
            id_setError: true,
            pw_setHelper: this.props.intl.formatMessage({id: "signup.password.error.message"}), //영문, 숫자, 특수문자 조합 5~20자로 만들어주세요.
            pw_setError: true,
            pwc_setHelper: this.props.intl.formatMessage({id: "signup.passwordConfirm.error.message"}), //비밀번호와 같지 않습니다.
            pwc_setError: true,
            nickname_setHelper: this.props.intl.formatMessage({id: "signup.nickname.error.message"}), //특수문자는 사용할 수 없습니다.
            nickname_setError: true,
            email_setHelper: this.props.intl.formatMessage({id: "signup.nickname.error.message"}), //특수문자는 사용할 수 없습니다.
            email_setError: true,
            signupBtn_setDisabled : true
        };
        this.valid = {
            id: false,
            pw: false,
            pwc: false,
            nickname: false,
            email: false
        }
        this.pw_inputRef = React.createRef();
        this.pwc_inputRef = React.createRef();
        this.onChangePwc = this.onChangePwc.bind(this);
        this.onChangeTextField = this.onChangeTextField.bind(this);
        this.setDisableSignupBtn = this.setDisableSignupBtn.bind(this);
        this.onClickSignup = this.onClickSignup.bind(this);
    }

    textFieldRegCheck(value, regArray, successMsg, helperProp, errorProp){
        let setError = false;
        let isError = false;
        let helperMessage = "";

        if(util_isEmpty(regArray)){
            isError = true;
        }

        // 정규식 체크
        if(!isError){
            for(const regMap of regArray){
                if(!(regMap.reg instanceof RegExp)){ // ERROR 관리자에게 문의하세요.
                    setError = "error";
                    break;
                }
                if(!regMap.reg.test(value)){
                    helperMessage += (util_isEmpty(regMap.failMsg) ? "" : regMap.failMsg) + "\n";
                }
            }
        }

        //유효성 결과
        if(isError){ // 에러일 경우
            helperMessage = this.props.intl.formatMessage({id: "system.error"}); //ERROR 관리자에게 문의하세요.
            alert(helperMessage);
            setError = true;
        }else if(util_isEmpty(helperMessage)){ // 성공일 경우
            helperMessage = util_isEmpty(successMsg) ? "" : successMsg;
        }else{ // 실패일 경우
            helperMessage.slice(0, -1); // 마지막 문자('\n') 제거
            setError = true;
        }
        
        this.setState({
            [helperProp]: helperMessage,
            [errorProp]: setError
        });

        return !setError;
    }

    onChangeTextField(event, type){
        let regArray = [];
        let helperProp;
        let errorProp;
        let result = false;
        switch(type){
            case "id":
                regArray.push({
                    reg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,20}$/,
                    failMsg: this.props.intl.formatMessage({id: "signup.id.error.message"}) // 영문, 숫자 조합 5~20자로 만들어주세요.
                });
                helperProp = "id_setHelper";
                errorProp = "id_setError";
                break;
            case "pw":
                regArray.push({
                    reg: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,20}$/,
                    failMsg: this.props.intl.formatMessage({id: "signup.password.error.message"}) // 영문, 숫자, 특수문자 조합 5~20자로 만들어주세요.
                });
                helperProp = "pw_setHelper";
                errorProp = "pw_setError";
                break;
            case "nickname":
                regArray.push({
                    reg: /^[a-zA-Z\d가-힣]{2,10}$/,
                    failMsg: this.props.intl.formatMessage({id: "signup.nickname.error.message"}) // 영문, 숫자, 특수문자 조합 5~20자로 만들어주세요.
                });
                helperProp = "nickname_setHelper";
                errorProp = "nickname_setError";
                break;
            case "email":
                regArray.push({
                    reg: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    failMsg: this.props.intl.formatMessage({id: "signup.email.error.message"}) // 옳바른 이메일 형식이 아닙니다.
                });
                helperProp = "email_setHelper";
                errorProp = "email_setError";
                break;
            default:
                break;
        }
        if(!util_isEmpty(helperProp) && !util_isEmpty(errorProp)){
            result = this.textFieldRegCheck(event.target.value, regArray, "", helperProp, errorProp);

            if(type === "pw"){
                this.onChangePwc();
            }
    
            this.valid[type] = result;
            this.setDisableSignupBtn();
        }else{
            alert(this.props.intl.formatMessage({id: "system.error"})); //ERROR 관리자에게 문의하세요.
        }
    }

    onChangePwc(){
        let pwc = this.pwc_inputRef.current.value;
        let pw = this.pw_inputRef.current.value;
        let helperMessage = "";
        let setError = false;

        if(!this.valid.pw || pwc.length === 0 || pwc !== pw){
            helperMessage = this.props.intl.formatMessage({id: "signup.passwordConfirm.error.message"}); //비밀번호와 같지 않습니다.
            setError = true
        }
        
        this.setState({
            pwc_setHelper: helperMessage,
            pwc_setError: setError
        });

        this.valid["pwc"] = !setError;
        this.setDisableSignupBtn();
    }

    setDisableSignupBtn(){
        let setDisable = false;
        
        for(let prop in this.valid){
            if(!this.valid[prop]){
                setDisable = true;
                break;
            }
        }

        this.setState({
            signupBtn_setDisabled: setDisable
        });
    }

    onClickSignup(){
        alert("gd");
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
                        error={this.state.id_setError}
                        helperText={this.state.id_setHelper}
                        onChange={(event)=>{
                            this.onChangeTextField(event, "id");
                        }}
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
                        error={this.state.pw_setError}
                        helperText={this.state.pw_setHelper}
                        onChange={(event)=>{
                            this.onChangeTextField(event, "pw");
                        }}
                        inputRef={this.pw_inputRef}
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
                        error={this.state.pwc_setError}
                        helperText={this.state.pwc_setHelper}
                        inputRef={this.pwc_inputRef}
                        onChange={this.onChangePwc}
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
                        error={this.state.nickname_setError}
                        helperText={this.state.nickname_setHelper}
                        onChange={(event)=>{
                            this.onChangeTextField(event, "nickname");
                        }}
                    />
                    <TextField
                        required
                        size="small"
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
                        error={this.state.email_setError}
                        helperText={this.state.email_setHelper}
                        onChange={(event)=>{
                            this.onChangeTextField(event, "email");
                        }}
                    />
                    <Divider light/>
                    <Button
                        variant="outlined"
                        disabled={this.state.signupBtn_setDisabled}
                        onClick={this.onClickSignup}
                    >
                        <FormattedMessage id="signup.signup" comment="회원가입"/>
                    </Button>
                </Stack>
            </Box>
        );
    }
}

const Signup = injectIntl(ContentHoc);

export default Signup;