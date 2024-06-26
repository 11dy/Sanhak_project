import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SaveIcon from "@material-ui/icons/Save";
import { useState } from "react";
import { Box, TablePagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/material';
import { fontWeight } from '@mui/system';





export default function BasicTable(props) {
  console.log(props['params'])
  const stt = props['params'];
  const params = useParams();
  const id = params['id'];
  console.log(id)

  const updateModule = async (e) => {
    e.preventDefault();
    const { text_edited } = e.target;
    const formData = new FormData();

    if(!text_edited.length){
      formData.append("text_edited", text_edited.value);
    }
    else{
      var i = 0;
      for (i = 0; i < text_edited.length; i++) {
        console.log(text_edited[i].value)
        formData.append("text_edited", text_edited[i].value);
      }
    }

    formData.append("file_id", id)
    formData.append("enctype", "multipart/form-data")

    const URL = "http://127.0.0.1:8000/api/save_result"

    axios({
      method: "post",
      url: URL,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }).then(response => {
      if (response.status == 200) {
        alert("저장 성공");
        window.location.href = '/';
      }
      else
        alert("저장 실패");
    })
  }
  return (
    <form onSubmit={updateModule}>

      <Button
        type="submit"
        variant='contained'
        startIcon={<SaveIcon/>}>
        저장 </Button>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 600 }}
      >
        <Table sx={{ minWidth: 100 }} aria-label="simple table" stickyHeader>

          <TableHead>
            <TableRow>
              <TableCell width={'15%'}>타임 라인</TableCell>
              <TableCell align="left" width={'85%'}>인식 결과 편집</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*데이터 넣어주는곳 */}
            {stt.map((st) => (
              <TableRow
                key={st.start}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell

                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',

                    }}
                  >

                    <TableCell
                      component={'th'}
                      scope="row"
                      color={'blue'}

                    >
                      <span>{new Date(st.start).toISOString().substring(11, 19)}</span>
                      <br></br>
                      <span>+{new Date(st.end).toISOString().substring(11, 19)}</span>
                    </TableCell>

                  </TableCell>

                </TableCell>
                <TableCell
                  align="left"
                  display='flex'
                >
                  <Grid container direction="row" alignItems="center">
                    <VolumeUpIcon color='primary' sx={{ fontSize: 20 }} />
                    <p>&nbsp;&nbsp;</p>
                    {st.text}
                  </Grid>
                  <br></br>
                  <Grid container direction="row" alignItems="center">
                    <EditIcon color='primary' sx={{ fontSize: 20 }} />
                    <p>&nbsp;&nbsp;</p>
                    <input
                      type="text"
                      name="text_edited"
                      defaultValue={st.textEdited}
                      size='100'

                    ></input>
                  </Grid>

                </TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
}

