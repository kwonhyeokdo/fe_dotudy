import React, {useState} from "react";
import {FormattedMessage} from "react-intl";
import {Box, Divider, Stack, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material"
import {PhoneAuth} from "dotudy/Util";
import {isEmpty} from "dotudy/Util";

export default function FindId(props){
    const [step, setStep] = useState("auth"); // auth, notFoundId, foundId
    const [foundId, setFoundId] = useState("auth"); // auth, notFoundId, foundId

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
        if(goTo === "foundId"){
            setFoundId(id);
        }
        setStep(goTo);
    };
    
    return(
        <Dialog
            open={props.open}
        >
            <DialogTitle variant="h5" sx={{fontWeight: 900}}>
                <FormattedMessage id="findId.title">아이디 찾기</FormattedMessage>
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
                        "foundId": <FoundId id={foundId}/>
                    }[step]}
                </Box>
            </DialogContent>
            <Divider/>
            <DialogActions>
                {   step === "auth" &&
                    <Button onClick={props.close}>
                        <FormattedMessage id="common.cancel">취소</FormattedMessage>
                    </Button>
                }
                {   (step === "notFoundId" || step === "foundId") &&
                    <Box>
                        <Button onClick={()=>{onChangeStep("auth");}}>
                            <FormattedMessage id="sign.findAgain">다시찾기</FormattedMessage>
                        </Button>
                        <Button onClick={props.close}>
                            <FormattedMessage id="common.confirm">확인</FormattedMessage>
                        </Button>
                    </Box>
                }
            </DialogActions>
        </Dialog>
    );
}

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
    const renderId = ()=>{
        const result = [];
        if(!isEmpty(props.id)){
            props.id.forEach((id)=>{
                result.push(<Typography key={id}>- {id}</Typography>);
            });
        }
        return result;
    };
    return(
        <Stack spacing={1}>
            <Typography sx={{fontWeight: 600}}>
                <FormattedMessage id="sign.registedId">가입된 ID</FormattedMessage>
            </Typography>
            <Stack spacing={0.5}>
                {renderId()}
            </Stack>
        </Stack>
    );
};