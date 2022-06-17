import React from "react";
import {injectIntl, FormattedMessage} from "react-intl";
import {DataGrid, GridActionsCellItem, GridToolbarContainer} from '@mui/x-data-grid';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import LoopIcon from '@mui/icons-material/LoopOutlined';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
class ContentHoc extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rows: []
        };
        this.columns = [
            { field: 'labelCode', headerName: '라벨코드', width: 350, editable: true },
            { field: 'korean', headerName: '한국어', width: 350, editable: true },
            { field: 'english', headerName: '영어', width: 350, editable: true },
            { field: 'actions', type: 'actions', headerName: 'Actions', width: 150,
                getActions: (param) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        color="inherit"
                        onClick={this.deleteRow.bind(this, param)}
                    />,
                    <GridActionsCellItem
                        icon={<LoopIcon/>}
                        label="Loop"
                        color="inherit"
                    />
                ]
            }
        ];
        this.createGridToolbar = this.createGridToolbar.bind(this);
    }

    setRowCss(param){
        if(param.row.state === 'delete'){

        }
    }

    deleteRow(param){
        let index = this.state.rows.findIndex(row => row.id === param.id);
        if(index !== -1){
            let copyRows = [...this.state.rows];
            if(copyRows[index].state === "insert"){
                copyRows.splice(index, 1);
            }else{
                copyRows[index].state = "delete";
            }
            this.setState({
                rows: copyRows
            });
        }
    }

    insertRow(){
        let newRow = {
            id: this.state.rows.length + 1,
            state: "insert"
        };
        this.setState({
            rows: this.state.rows.concat(newRow)
        });
    }

    createGridToolbar(){
        return (
            <GridToolbarContainer sx={{width:"100%", display: "flex", justifyContent: "flex-start"}}>
                <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={this.insertRow.bind(this)}
                >
                    행 추가
                </Button>
                <Button
                    color="primary"
                    startIcon={<SaveIcon />}
                    sx={{marginLeft: "auto"}}
                >
                    저장
                </Button>
            </GridToolbarContainer>
        );
    }

    render(){
        return(
            <Stack>
                <Box
                    sx={{
                        width: "100%",
                        paddingY: 5,
                        paddingX: 10
                    }}
                >
                    <Typography
                        textAlign="left"
                        sx={{
                            fontSize: "3vh"
                        }}
                    >
                        <FormattedMessage id="labelManageMent.title">라벨관리</FormattedMessage>
                    </Typography>
                    <Box
                        sx={{
                            width: "100%",
                            marginTop: 2,
                            padding: 2,
                            border: "1px solid #BBBBBB",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <TextField
                            label= {this.props.intl.formatMessage({id: 'labelManageMent.codeAndLabel'})}
                            variant="outlined"
                            size="small"
                            sx={{
                                width: 450
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex"
                            }}
                        >
                            <Button
                                color="error"
                                variant="outlined"
                                sx={{
                                    marginRight: 1
                                }}
                            >
                                초기화
                            </Button>
                            <Button
                                variant="outlined"
                            >
                                검색
                            </Button>
                        </Box>
                    </Box>
                    <Box 
                        sx={{
                            width: "100%",
                            height: "80vh",
                            marginTop: 2,
                            '& .rowCss--insert':{
                                bgcolor: "rgba(0, 0, 255, 0.1)"
                            },
                            '& .rowCss--delete':{
                                bgcolor: "rgba(255, 0, 0, 0.1)"
                            }
                        }}
                    >
                        <DataGrid
                            checkboxSelection={true}
                            disableSelectionOnClick
                            rows={this.state.rows}
                            columns={this.columns}
                            experimentalFeatures={{
                                newEditingApi: true
                            }}
                            components={{
                                Toolbar: this.createGridToolbar
                            }}
                            getRowClassName={(params) => {
                                return `rowCss--${params.row.state}`;
                            }}
                        />
                    </Box>
                </Box>
            </Stack>
        );
    }
}

const LabelManagement = injectIntl(ContentHoc);

export default LabelManagement;