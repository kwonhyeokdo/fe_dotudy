import React, {useRef, useState, useEffect} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {Box, Stack, TextField, Typography, Button} from "@mui/material"

export const REG_SET = {
    ID: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,20}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,20}$/,
    NICKNAME: /^[a-zA-Z\d가-힣]{2,10}$/,
    EMAIL: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
};

/**
 *  
 *  @param 객체, 배열, 문자열
 *  @description 객체나 배열이 비어있거나 빈문자열일 경우 true를 반환, 아니면 false를 반환
 *  @return boolean
 */
export const isEmpty = function(obj){
    let result = null;
    if(obj === null){
        result = true;
    }else{
        switch(typeof(obj)){
            case "object":
                if(Object.keys(obj).length === 0){
                    result = true;
                }
                break;
            case "undefined":
                result = true;
                break;
            case "string":
                if(obj.length === 0){
                    result = true;
                }
                break;
            default:
                result = false;
                break;
        }
    }
    return result;
};

export function PhoneAuth(props){
    const intl = useIntl();
    const AUTH_TIME = props.countTime;
    let authTime;
    const displayCountTime = (inputSec) =>{
        let min = parseInt(inputSec / 60);
        let sec = parseInt(inputSec % 60);
        min = (min < 10) ? "0" + min : String(min);
        sec = (sec < 10) ? "0" + sec : String(sec);
        return (min + ":" + sec);
    };

    const [phoneBtn, setPhoneBtn] = useState({
        disabled: true
    });
    const [authInput, setAuthInput] = useState({
        disabled: true
    });
    const [authBtn, setAuthBtn] = useState({
        disabled: true
    });
    const [authTimerText, setAuthTimerText] = useState(displayCountTime(AUTH_TIME));
    const [authTimer, setAuthTimer] = useState(null);

    const phoneInputRef = useRef();
    const authInputRef = useRef();

    useEffect(()=>{
        phoneInputRef.current.focus();
    },[]);

    useEffect(()=>{
        if(!authInput.disabled){
            authInputRef.current.value = "";
            authInputRef.current.focus();
        }
    }, [authInput.disabled]);

    const onChangePhone = (event)=>{
        const phoneNumber = event.target.value;
        const reg = /^[0-9]{9,12}$/g;
        
        authInputRef.current.value = "";
        setPhoneBtn({disabled: true});
        setAuthInput({disabled: true});
        setAuthBtn({disabled: true});

        if(reg.test(phoneNumber)){
            setPhoneBtn({disabled: false});
        }
    };

    const onClickPhoneBtn = ()=>{
        setAuthInput({disabled: false});
        setAuthBtn({disabled: true});
        

        // ajax로 서버에게 인증번호 요청
            // callback 받은 후 타이머 발동
            if(authTimer !== null){
                clearInterval(authTimer);
                setAuthTimer(null);
            }
            authTime = AUTH_TIME;
            setAuthTimer(
                setInterval(()=>{
                    setAuthTimerText(displayCountTime(authTime));
                    if(authTime === 0){
                        clearInterval(authTimer);
                    }
                    authTime--;
                }, 1000)
            );
    };

    const onChangeAuthInput = (event)=>{
        const authNumber = event.target.value;
        const reg = /^[0-9]{6}$/g;

        let setDisable = true;
        if(reg.test(authNumber)){
            setDisable = false;
        }

        setAuthBtn({disabled: setDisable});
    };

    const onClickAuthBtn = ()=>{
        //const authInputValue = authInputRef.current.value;
        let isRight = true;
        // 서버로 휴대폰 번호를 보내고 값이 유효한지 판단.
        if(isRight){
            props.pass({
                phoneNumber: phoneInputRef.current.value
            });
        }else{
            alert("인증번호가 유효하지 않습니다.");
        }
    };

    return(
        <Stack 
            spacing={0.5}
            sx={{
                display: (props.hide === true ? "none" : "block")
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
                    label={intl.formatMessage({id: "findId.phoneNumber"})} // 휴대폰 번호
                    required
                    onChange={onChangePhone}
                    inputRef={phoneInputRef}
                />
                <Button
                    variant="outlined"
                    sx={{
                        width: "30%",
                        maxWidth: "100px"
                    }}
                    disabled={phoneBtn.disabled}
                    onClick={onClickPhoneBtn}
                >
                    <FormattedMessage id="findId.phoneAuth">인증하기</FormattedMessage>
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
                        border: "1px solid lightgray",
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
                        placeholder={intl.formatMessage({id: "findId.authNumber"})}//인증번호
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
                        disabled={authInput.disabled}
                        inputRef={authInputRef}
                        onChange={onChangeAuthInput}
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
                        onClick={e=>authInputRef.current.focus()}
                    >
                        {authTimerText}
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    sx={{
                        width: "30%",
                        maxWidth: "100px"
                    }}
                    disabled={authBtn.disabled}
                    onClick={onClickAuthBtn}
                >
                    <FormattedMessage id="findId.authConfirm">확인</FormattedMessage>
                </Button>
            </Box>
        </Stack>
    );
};