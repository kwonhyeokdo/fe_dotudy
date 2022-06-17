import React, {useEffect, useRef, useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {Box, Divider, Stack, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField} from "@mui/material"
import {PhoneAuth} from "dotudy/Util";
import {isEmpty, REG_SET} from "dotudy/Util";

export default function FindPw(props){
    const [step, setStep] = useState("auth"); // auth, notFoundId, foundId, changePassword, successChange, failChange
    const [foundId, setFoundId] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [canBeChange, setCanBeChange] = useState(false);
    const [changePwBtn, setChangePwBtn] = useState({
        disabled: true
    });
    const [passwd, setPasswd] = useState(null);

    const passPhoneAuth = (event)=>{
        //let phoneNumber = event.phoneNumber;
        
        // 서버에 핸드폰 번호 전송 후 아이디 찾아옴
        const id = ["id1", "id2", "id3"];
        if(isEmpty(id)){ // 아이디가 없을 경우
            onChangeStep("notFoundId");
        }else{ // 아이디가 있을 경우
            onChangeStep("foundId", id);
        }
    };

    const onChangeStep = (goTo, id) => {
        switch(goTo){
            case "foundId":
                setFoundId(id);
                break;
            case "changePassword":
                setSelectedId(id);
                break;
            default:
                break;
        }
        setStep(goTo);
    };

    const goToChangePassword = (event) =>{
        onChangeStep("changePassword", event.selectedId);
    };

    const setNewPwValidation = (newPwValidation) =>{
        setChangePwBtn({disabled: !newPwValidation});
        setCanBeChange(newPwValidation);
        setPasswd()
    };

    const changePw = () =>{
        if(!canBeChange){
            return;
        }
        // 서버로 패스워드를 보냄. - success
            onChangeStep("successChange");
        // fail
            //onChangeStep("failChange");
    };
    
    return(
        <Dialog
            open={props.open}
        >
            <DialogTitle variant="h5" sx={{fontWeight: 900}}>
                <FormattedMessage id="findPw.title">비밀번호 찾기</FormattedMessage>
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <Box
                    sx={{
                        width: 350
                    }}
                >
                    {{
                        "auth": <PhoneAuth countTime={180} hide={false} pass={passPhoneAuth}/>,
                        "notFoundId": <NotFoundId/>,
                        "foundId": <FoundId id={foundId} goToChangePassword={goToChangePassword}/>,
                        "changePassword": <ChangePassword pass={(event)=>setNewPwValidation(event.newPwValidation)} id={selectedId}/>,
                        "successChange": <SuccessChange/>,
                        "failChange": <FailChange/>
                    }[step]}
                </Box>
            </DialogContent>
            <Divider/>
            <DialogActions>
                {   (step === "notFoundId" || step === "foundId" || step === "changePassword" || step === "failChange") &&
                    <Button onClick={()=>{onChangeStep("auth");}}>
                        <FormattedMessage id="sign.findAgain">다시찾기</FormattedMessage>
                    </Button>
                }
                {   (step === "auth" || step === "foundId" || step === "changePassword") &&
                    <Button onClick={props.close}>
                        <FormattedMessage id="common.cancel">취소</FormattedMessage>
                    </Button>
                }
                {   (step === "notFoundId" || step === "successChange" || step === "failChange") &&
                    <Button onClick={props.close}>
                        <FormattedMessage id="common.confirm">확인</FormattedMessage>
                    </Button>
                }
                {   (step === "changePassword") &&
                    <Button disabled={changePwBtn.disabled} onClick={changePw}>
                        <FormattedMessage id="common.change">변경</FormattedMessage>
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
};

const NotFoundId = ()=>{
    return(
        <Stack>
            <Typography sx={{color: "red", fontWeight: 500}}>
                <FormattedMessage id="sign.noSearchId">!! 가입된 계정이 존재하지 않습니다.</FormattedMessage>
            </Typography>
        </Stack>
    );
};

const FoundId = (props)=>{
    const [selectedId, setselectedId] = useState(props.id[0]);
    const renderId = ()=>{
        const result = [];
        result.push();
        if(!isEmpty(props.id)){
            props.id.forEach((id)=>{
                result.push(<FormControlLabel key={id} value={id} control={<Radio/>} label={id} />);
            });
        }
        return result;
    };
    return(
        <Stack spacing={1}>
            <FormControl>
                <FormLabel sx={{fontWeight: 600}} id="sign.registedId">
                    <FormattedMessage id="sign.registedId">가입된 ID</FormattedMessage>
                </FormLabel>
            </FormControl>
            <RadioGroup row onChange={(e)=>setselectedId(e.target.value)}>
                {renderId()}
            </RadioGroup>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row-reverse"
                }}
            >
                <Button onClick={()=>{props.goToChangePassword({selectedId: selectedId});}}><FormattedMessage id="findPw.changePassword">비밀번호 변경하기</FormattedMessage></Button>
            </Box>
        </Stack>
    );
};

const ChangePassword = (props) =>{
    const intl = useIntl();
    const [pwInput, setPwInput] = useState({
        helperText: "",
        error: true,
        validation: false
    });
    const [pwcInput, setPwcInput] = useState({
        helperText: "",
        error: true,
        validation: false
    });
    const pwInputRef = useRef();
    const pwcInputRef = useRef();

    useEffect(()=>{
        props.pass({
            newPwValidation: pwInput.validation && pwcInput.validation,
            passwd: pwInputRef.current.value
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pwInput.validation, pwcInput.validation]);

    const onChangePwInput = ()=>{
        const pw = pwInputRef.current.value;
        let error = false;
        let helperText = "";
        let validation = true;

        if(!REG_SET.PASSWORD.test(pw)){
            error = true;
            helperText = intl.formatMessage({id: "sign.password.error.message"}); // 영문, 숫자, 특수문자 조합 5~20자로 만들어주세요.
            validation = false;
        }
        setPwInput({
            error: error,
            helperText: helperText,
            validation: validation
        });

        onChangePwcInput();
    };

    const onChangePwcInput = ()=>{
        const pwc = pwcInputRef.current.value;
        const pw = pwInputRef.current.value;
        let error = false;
        let helperText = "";
        let validation = true;

        if(pwc.length === 0 || pwc !== pw){
            helperText = intl.formatMessage({id: "sign.passwordConfirm.error.message"}); //비밀번호와 같지 않습니다.
            error = true;
            validation = false;
        }

        setPwcInput({
            error: error,
            helperText: helperText,
            validation: validation
        });
    };

    return(
        <Stack spacing={1}>
            <Typography sx={{fontSize: "1.2rem", fontWeight: 800}}>
                <FormattedMessage id="findPw.setNewPassword">새 비밀번호 설정</FormattedMessage>
            </Typography>
            <Typography sx={{fontSize: "1rem", fontWeight: 500}}>
                <FormattedMessage id="findPw.selectedID">ID : </FormattedMessage>{props.id}
            </Typography>
            <TextField
                size="small"
                required
                label={useIntl().formatMessage({id: "sign.password"})}
                type="password"
                error={pwInput.error}
                helperText={pwInput.helperText}
                inputRef={pwInputRef}
                onChange={onChangePwInput}
            />
            <TextField
                size="small"
                required
                label={useIntl().formatMessage({id: "sign.passwordConfirm"})}
                type="password"
                error={pwcInput.error}
                helperText={pwcInput.helperText}
                onChange={onChangePwcInput}
                inputRef={pwcInputRef}
            />
        </Stack>
    );
};

const SuccessChange = () => {
    return (
        <Stack>
            <Typography sx={{fontWeight: 500}}>
                <FormattedMessage id="findPw.successChangePassword">비밀번호 변경이 완료 되었습니다.</FormattedMessage>
            </Typography>
        </Stack>
    );
};

const FailChange = () => {
    return (
        <Stack>
            <Typography sx={{color: "red", fontWeight: 500}}>
                <FormattedMessage id="findPw.failChangePassword">비밀번호 변경에 실패했습니다. 다시 시도해주세요.</FormattedMessage>
            </Typography>
        </Stack>
    );
};