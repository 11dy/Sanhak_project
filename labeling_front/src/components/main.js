import React, { useEffect, useState } from 'react';

import '../App.css';

import DataTable from './DataTable';
import Container from '@mui/material/Container';


import Box from '@mui/material/Box';
import ArticleIcon from '@mui/icons-material/Article';
import { Grid } from '@mui/material';



function Main() {
  return (

    <>
      <Container fixed >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            height: 100,
          }}
        >
          {/*최상단 제목과 아이콘 */}
          <Grid container direction="row" alignItems="center">
            <ArticleIcon color='primary' sx={{ fontSize: 40 }} /> <h2 style={{ color: '' }}>작업 목록</h2>
          </Grid>
        </Box>



        {/*데이터 테이블 */}
        <Box>
          <DataTable></DataTable>
        </Box>
        {/* 그냥 공간*/}
        <Box sx={{ height: 200 }}>

        </Box>
      </Container>

    </>
  );
}

export default Main;
