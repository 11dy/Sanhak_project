//데이터 테이블 컴포넌트

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';

//열 종류및 스타일

const columns : GridColDef[]= [
  { field: 'name', headerName: '작업대상', width: 255 },
  { field: 'status', headerName: '작업현황', width: 150 },
  { field: 'request_method', headerName: '요청방법', width: 150 },
  {
    field: 'start_time',
    headerName: '작업 시작일',
    dataType: "datetime",
    format: "MM/dd/yyyy hh:mm tt",
    width: 200,
  },
  {
    field: 'end_time',
    headerName: '작업 종료일',
    width: 200,
  },
  {
    field: 'id',
    headerName: '인식 결과 편집',
    width:150,
    renderCell: (params) => {
      const onClick = (e) => {
        window.location.href= './Editpage'
      };

      return <Button onClick={onClick}>인식 결과 편집</Button>;
    },
  }
];

export default function DataTable() {
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setFiles(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          'http://localhost:8000/api/'
        );
        setFiles(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchFiles();
  }, []);
  console.log(files)
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!files) return null;

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows= {files}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection={true}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
}