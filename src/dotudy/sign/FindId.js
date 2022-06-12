import React from "react";
import {useIntl} from "react-intl";
import {TextField} from "@mui/material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

export default function FindId(props){
    const intl = useIntl();
    
    return(
        <Dialog
            open={props.open}
        >
            <DialogTitle>아이디 찾기</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    label={intl.formatMessage({id: "signup.id"})}
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
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>취소</Button>
            </DialogActions>
        </Dialog>
    );
}