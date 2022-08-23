//데이터 테이블 컴포넌트

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import Modal from '@mui/material/Modal';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FuncBtn from './FuncBtn';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

//삭제 모달 스타일
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


//열 종류및 스타일

const columns: GridColDef[] = [
  { field: 'name', headerName: '작업대상', width: 255 },
  { field: 'status', headerName: '작업현황', width: 150 },
  { field: 'request_method', headerName: '요청방법', width: 150 },
  {
    field: 'start_time',
    headerName: '작업 시작일',
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
    width: 150,
    renderCell: (params) => {
      const id = params['id']
      const onClick = (e) => {
        window.location.href = './Editpage/' + id
      };

      return <Button onClick={onClick}>인식 결과 편집</Button>;
    },
  }
];

export default function DataTable() {
  //삭제 버튼 클릭시 모듈 나오게 하려고 씀
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const [selectionModel, setSelectionModel] = useState([]);

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

      <Box sx={{ width: '100%' }}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent='flex'
        >
          {/*인식, 삭제 버튼 */}
          <Box>
            <FuncBtn></FuncBtn>

            <Button onClick={handleOpen} variant="contained" startIcon={<DeleteOutlinedIcon />} color='primary'>삭제</Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Box
                  sx={{ borderBottom: 1 }}
                >
                  <p><strong>작업 삭제</strong></p>
                </Box>
                <Box
                  sx={{ borderBottom: 1, height: 80 }}
                >
                  선택한 작업을 삭제 하시겠습니까?

                  {/* <pre style={{ fontSize: 10 }}>
              {JSON.stringify(selectionModel, null, 4)}
            </pre> */}
                </Box>
                {/*버튼 컨테이너 */}
                <Box
                  sx={{

                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: "center",

                  }}
                >
                  {/*취소버튼 */}
                  <Button
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={handleClose}
                  >
                    취소
                  </Button>

                  {/*삭제버튼 */}
                  <Button
                    
                    onClick={async (e) => {
                      const formData = new FormData();
                      selectionModel.map((id) => { formData.append("delete_ids", id) })
                      formData.append("enctype", "multipart/form-data")

                      const URL = "http://127.0.0.1:8000/api/delete_file"

                      axios({
                        method: "post",
                        url: URL,
                        data: formData,
                        headers: {
                          "Content-Type": "multipart/form-data",
                        }
                      }).then(response => {
                        if (response.status == 200)
                          alert("삭제 성공");
                        else
                          alert("삭제 실패");
                        window.location.reload()
                      })
                    }
                    }
                    
                    variant="contained"
                    startIcon={<CheckIcon />}
                  >
                    삭제
                  </Button>
                </Box>
              </Box>

            </Modal>

          </Box>
        </Stack>
      </Box>


      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}


        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={files}
        columns={columns}

        checkboxSelection

        onSelectionModelChange={(id) => {
          setSelectionModel(id);
          const selectedIDs = new Set(id);
          const selectedRowData = files.filter((row) =>
            selectedIDs.has(row.id.toString())
          );

          console.log(selectedRowData);
        }
        }
        {...files}


        pageSize={10}
        rowsPerPageOptions={[5]}

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