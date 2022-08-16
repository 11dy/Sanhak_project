import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';

//데이터 클래스
function createData(
  name: string,
  calories: number,
  
) {
  return { name, calories};
}

const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={'10%'}>타임 라인</TableCell>
            <TableCell align="left" width={'90%'}>인식 결과 편집</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {/*데이터 넣어주는곳 */}
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                component="th" 
                scope="row"
              >
                {row.name}
                <TableCell
                    component={'tr'}
                    color={'blue'}
                >
                    좋음
                </TableCell>
              </TableCell>
              <TableCell 
                align="left"
                display='flex'
              >
                {row.calories}
                <TextField fullWidth  id="fullWidth" />
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
