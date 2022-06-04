import React from "react";
import Header from "dotudy/Header";
import Footer from "dotudy/Footer";
import {DataGrid, GridActionsCellItem, GridToolbarContainer} from '@mui/x-data-grid';
import {Box, Button, Stack, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import LoopIcon from '@mui/icons-material/LoopOutlined';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

class LabelManagement extends React.Component{
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
    constructor(){
        super();
        this.columns = [
            { field: 'labelCode', headerName: '라벨코드', width: 350, editable: true },
            { field: 'korean', headerName: '한국어', width: 350, editable: true },
            { field: 'english', headerName: '영어', width: 350, editable: true },
            { field: 'actions', type: 'actions', headerName: 'Actions', width: 150,
              getActions: ({id}) => {
                return [
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<LoopIcon/>}
                        label="Loop"
                        color="inherit"
                    />
                ];
              }
            }
        ];

        this.rows = [
            { id: 1, labelCode: 'Hello', korean: 'World' },
            { id: 2, labelCode: 'DataGridPro', korean: 'is Awesome' },
            { id: 3, labelCode: 'MUI', korean: 'is Amazing' }
        ];
    }

    GridToolbar(){
        return (
            <GridToolbarContainer sx={{width:"100%", display: "flex", justifyContent: "flex-start"}}>
              <Button color="primary" startIcon={<AddIcon />}>
                행 추가
              </Button>
              <Button color="primary" startIcon={<SaveIcon />} sx={{marginLeft: "auto"}}>
                저장
              </Button>
            </GridToolbarContainer>
        );
    }

    render(){
        return(
            <Stack >
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
                        라벨 관리
                    </Typography>
                    <Box 
                        sx={{
                            width: "100%",
                            height: "80vh",
                            marginTop: 2
                        }}
                    >
                        <DataGrid
                            checkboxSelection={true}
                            disableSelectionOnClick
                            rows={this.rows}
                            columns={this.columns}
                            experimentalFeatures={{ newEditingApi: true }}
                            components={{
                                Toolbar: this.GridToolbar
                            }}
                        />
                    </Box>
                </Box>
            </Stack>
        );
    }
}

export default LabelManagement;