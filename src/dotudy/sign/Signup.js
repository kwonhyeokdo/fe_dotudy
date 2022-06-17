import React from "react";
import {Box, Button, Divider, Stack, TextField, Typography} from "@mui/material";
import {FormattedMessage, injectIntl} from "react-intl";
import {isEmpty, REG_SET} from "dotudy/Util"

class ContentHoc extends React.Component{
    constructor(props){
        super(props);
        
        this.authTimer = null;
        this.AUTH_TIME = 180;
        this.authTime = this.AUTH_TIME;

        this.state = {
            id_setHelper: this.props.intl.formatMessage({id: "signup.id.error.message"}), //영문, 숫자 조합 5~20자로 만들어주세요.
            id_setError: true,
            pw_setHelper: this.props.intl.formatMessage({id: "sign.password.error.message"}), //영문, 숫자, 특수문자 조합 5~20자로 만들어주세요.
            pw_setError: true,
            pwc_setHelper: this.props.intl.formatMessage({id: "sign.passwordConfirm.error.message"}), //비밀번호와 같지 않습니다.
            pwc_setError: true,
            nickname_setHelper: this.props.intl.formatMessage({id: "signup.nickname.error.message"}), //특수문자는 사용할 수 없습니다.
            nickname_setError: true,
            email_setHelper: this.props.intl.formatMessage({id: "signup.nickname.error.message"}), //특수문자는 사용할 수 없습니다.
            email_setError: true,
            phone_setError: true,
            phoneBtn_setDisabled: true,
            auth_setDisabled: true,
            authTimer_text: this.displayCountTime(this.authTime),
            authBtn_setDisabled: true,
            authOutline: "1px solid red",
            signupBtn_setDisabled : true
        };
        this.valid = {
            id: false,
            pw: false,
            pwc: false,
            nickname: false,
            email: false,
            phone: false,
            auth: false
        }

        this.pw_inputRef = React.createRef();
        this.pwc_inputRef = React.createRef();
        this.auth_inputRef = React.createRef();

        this.onChangePwc = this.onChangePwc.bind(this);
        this.onChangeTextField = this.onChangeTextField.bind(this);
        this.setDisableSignupBtn = this.setDisableSignupBtn.bind(this);
        this.onClickSignup = this.onClickSignup.bind(this);
        this.onChnagePhone = this.onChnagePhone.bind(this);
        this.onChangeAuth = this.onChangeAuth.bind(this);
        this.onClickPhoneBtn = this.onClickPhoneBtn.bind(this);
        this.onClickAuthBtn = this.onClickAuthBtn.bind(this);
    }

    textFieldRegCheck(value, regArray, successMsg, helperProp, errorProp){
        let setError = false;
        let isError = false;
        let helperMessage = "";

        if(isEmpty(regArray)){
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
                    helperMessage += (isEmpty(regMap.failMsg) ? "" : regMap.failMsg) + "\n";
                }
            }
        }

        //유효성 결과
        if(isError){ // 에러일 경우
            helperMessage = this.props.intl.formatMessage({id: "common.system.error"}); //ERROR 관리자에게 문의하세요.
            alert(helperMessage);
            setError = true;
        }else if(isEmpty(helperMessage)){ // 성공일 경우
            helperMessage = isEmpty(successMsg) ? "" : successMsg;
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
                    reg: REG_SET.ID,
                    failMsg: this.props.intl.formatMessage({id: "signup.id.error.message"}) // 영문, 숫자 조합 5~20자로 만들어주세요.
                });
                helperProp = "id_setHelper";
                errorProp = "id_setError";
                break;
            case "pw":
                regArray.push({
                    reg: REG_SET.PASSWORD,
                    failMsg: this.props.intl.formatMessage({id: "sign.password.error.message"}) // 영문, 숫자, 특수문자 조합 5~20자로 만들어주세요.
                });
                helperProp = "pw_setHelper";
                errorProp = "pw_setError";
                break;
            case "nickname":
                regArray.push({
                    reg: REG_SET.NICKNAME,
                    failMsg: this.props.intl.formatMessage({id: "signup.nickname.error.message"}) // 영문, 숫자 조합 2~10자로 만들어주세요.
                });
                helperProp = "nickname_setHelper";
                errorProp = "nickname_setError";
                break;
            case "email":
                regArray.push({
                    reg: REG_SET.EMAIL,
                    failMsg: this.props.intl.formatMessage({id: "signup.email.error.message"}) // 옳바른 이메일 형식이 아닙니다.
                });
                helperProp = "email_setHelper";
                errorProp = "email_setError";
                break;
            default:
                break;
        }
        if(!isEmpty(helperProp) && !isEmpty(errorProp)){
            result = this.textFieldRegCheck(event.target.value, regArray, "", helperProp, errorProp);

            if(type === "pw"){
                this.onChangePwc();
            }
    
            this.valid[type] = result;
            this.setDisableSignupBtn();
        }else{
            alert(this.props.intl.formatMessage({id: "common.system.error"})); //ERROR 관리자에게 문의하세요.
        }
    }

    onChangePwc(){
        let pwc = this.pwc_inputRef.current.value;
        let pw = this.pw_inputRef.current.value;
        let helperMessage = "";
        let setError = false;

        if(!this.valid.pw || pwc.length === 0 || pwc !== pw){
            helperMessage = this.props.intl.formatMessage({id: "sign.passwordConfirm.error.message"}); //비밀번호와 같지 않습니다.
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
        alert("회원가입");
    }

    onChnagePhone(event){
        const phoneNumber = event.target.value;
        const reg = /^[0-9]{9,12}$/g;
        this.valid.auth = false;
        this.valid.phone = false;
        this.auth_inputRef.current.value = "";
        this.setState({
            phone_setError: true,
            phoneBtn_setDisabled: true,
            auth_setDisabled: true,
            authBtn_setDisabled: true,
            authOutline: "1px solid red"
        },()=>{
            if(reg.test(phoneNumber)){
                this.setState({
                    phone_setError: false,
                    phoneBtn_setDisabled: false
                });
            }else{
                this.auth_inputRef.current.value="";
            }
    
            this.setDisableSignupBtn();
        });
    }

    onClickPhoneBtn(){
        this.valid.phone = true;
        this.valid.auth = false;
        this.auth_inputRef.current.value = "";
        this.setState({
            auth_setDisabled: false,
            authBtn_setDisabled: true,
            authOutline: "1px solid red"
        },()=>{
            this.auth_inputRef.current.focus();
        });
        this.auth_inputRef.current.value = "";

        // ajax로 서버에게 인증번호 요청
            // callback 받은 후 타이머 발동
            if(this.authTimer != null){
                clearInterval(this.authTimer);
                this.authTime = this.AUTH_TIME;
            }
            this.authTimer = setInterval(()=>{
                this.setState({
                    authTimer_text: this.displayCountTime(this.authTime)
                });
                if(this.authTime === 0){
                    clearInterval(this.authTimer);
                    this.authTimer = null;
                }
                this.authTime--;
            }, 1000);
    }

    onChangeAuth(event){
        const authNumber = event.target.value;
        this.valid.auth = false;
        const reg = /^[0-9]{6}$/g;

        if(reg.test(authNumber)){
            this.setState({
                authBtn_setDisabled: false
            });
        }else{
            this.setState({
                authBtn_setDisabled: true
            });
        }
    }

    onClickAuthBtn(){
        this.valid.auth = true;
        this.setDisableSignupBtn();
        if(this.authTimer != null){
            clearInterval(this.authTimer);
            this.authTime = this.AUTH_TIME;
        }
        this.setState({
            auth_setDisabled: true,
            authOutline: "1px solid lightgray",
            authTimer_text: this.displayCountTime(this.authTime)
        });
        alert("인증되었습니다.");
    }

    displayCountTime(inputSec){
        let min = parseInt(inputSec / 60);
        let sec = parseInt(inputSec % 60);
        min = (min < 10) ? "0" + min : String(min);
        sec = (sec < 10) ? "0" + sec : String(sec);
        return (min + ":" + sec);
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
                        label={this.props.intl.formatMessage({id: "sign.password"})}
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
                        label={this.props.intl.formatMessage({id: "sign.passwordConfirm"})}
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
                        label={this.props.intl.formatMessage({id: "signup.email"})}//이메일
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
                    <Stack
                        spacing={1}
                        sx={{
                            width: "100%"
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <TextField
                                size="small"
                                sx={{
                                    width: "69%"
                                }}
                                label={this.props.intl.formatMessage({id: "signup.phone.phoneNumber"})} // 휴대폰 번호
                                required
                                error={this.state.phone_setError}
                                onChange={this.onChnagePhone}
                            />
                            <Button
                                variant="outlined"
                                sx={{
                                    width: "30%",
                                    maxWidth: "100px"
                                }}
                                disabled={this.state.phoneBtn_setDisabled}
                                onClick={this.onClickPhoneBtn}
                            >
                                <FormattedMessage id="signup.phone.auth">인증하기</FormattedMessage>
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box
                                sx={{
                                    width: "69%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    border: this.state.authOutline,
                                    borderRadius: '4px'
                                }}
                            >
                                <TextField
                                    variant="standard"
                                    size="small"
                                    sx={{
                                        width: "70%",
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingX: 1
                                    }}
                                    placeholder={this.props.intl.formatMessage({id: "signup.phone.authNumber"})} // 인증 번호
                                    required
                                    InputProps={{
                                        disableUnderline: true,
                                        style: {
                                            padding: 0
                                        }
                                    }}
                                    inputProps={{
                                       style: {
                                         padding: 0
                                       }
                                    }}
                                    inputRef={this.auth_inputRef}
                                    onChange={this.onChangeAuth}
                                    disabled={this.state.auth_setDisabled}
                                />
                                <Typography
                                    sx={{
                                        width: "30%",
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "lightgray"
                                    }}
                                    onClick={()=>this.auth_inputRef.current.focus()}
                                >
                                    {this.state.authTimer_text}
                                </Typography>
                            </Box>
                            <Button
                                variant="outlined"
                                sx={{
                                    width: "30%",
                                    maxWidth: "100px"
                                }}
                                disabled={this.state.authBtn_setDisabled}
                                onClick={this.onClickAuthBtn}
                            >
                                <FormattedMessage id="signup.phone.authConfirm">확인</FormattedMessage>
                            </Button>
                        </Box>
                    </Stack>
                    <Divider light/>
                    <Button
                        variant="outlined"
                        disabled={this.state.signupBtn_setDisabled}
                        onClick={this.onClickSignup}
                    >
                        <FormattedMessage id="signup.signup">회원가입</FormattedMessage>
                    </Button>
                </Stack>
            </Box>
        );
    }
}

const Signup = injectIntl(ContentHoc);

export default Signup;