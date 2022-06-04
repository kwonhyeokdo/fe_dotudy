import React from "react";
import Header from "dotudy/Header";
import Footer from "dotudy/Footer";
import {DataGrid} from '@mui/x-data-grid';
import {Box, Stack, Typography} from "@mui/material";

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
                            rows={rows}
                            columns={columns}
                            experimentalFeatures={{ newEditingApi: true }}
                        />
                    </Box>
                </Box>
            </Stack>
        );
    }
}

const columns = [
    { field: 'labelCode', headerName: '라벨코드', width: 150, editable: true },
    { field: 'korean', headerName: '한국어', width: 150 },
    { field: 'english', headerName: '영어', width: 150 }
];

const rows = [
    { id: 1, labelCode: 'Hello', korean: 'World' },
    { id: 2, labelCode: 'DataGridPro', korean: 'is Awesome' },
    { id: 3, labelCode: 'MUI', korean: 'is Amazing' },
];

export default LabelManagement;