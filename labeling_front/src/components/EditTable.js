import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react';
import {Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';




export default function BasicTable(props) {
  console.log(props['params'])
  const stt = props['params'];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
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
                
                  <TableCell>
                    {new Date(st.start).toISOString().substring(11, 19)}
                  </TableCell>
                  <TableCell
                    component={'th'}
                    scope="row"
                    color={'blue'}
                    
                  >
                    
                    {new Date(st.end).toISOString().substring(11, 19)}
                  </TableCell>
                
                </TableCell>
                
              </TableCell>
              <TableCell
                align="left"
                display='flex'
              >
                {st.text}<br></br>
                <input type='text' value={st.text} size='100'></input>
              </TableCell>
              

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}
