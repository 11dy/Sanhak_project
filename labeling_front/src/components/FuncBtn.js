//인식, 삭제 버튼 컴포넌트
//나중에 삭제버튼 아예 다른 컴포넌트로 구현 할 수도 있음

import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LocalUpload from './LocalUpload';
import ObjectUpload from './ObjectUpload';

//모달 내부 탭기능 구현
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


//모달 스타일
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function FuncBtn() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>

      <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon />}>인식 작업 요청</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p><strong>인식 작업 요청</strong></p>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Object storage에서 선택" {...a11yProps(0)} />
            <Tab label="파일 업로드" {...a11yProps(1)} />

          </Tabs>
          <TabPanel value={value} index={0}>
            <ObjectUpload />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LocalUpload />
          </TabPanel>
        </Box>

      </Modal>


      <Button variant="contained" startIcon={<DeleteForeverIcon />}>삭제</Button>

    </>
  );
}

export default FuncBtn;