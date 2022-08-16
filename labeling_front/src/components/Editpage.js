//인식결과편집 페이지

import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Grid } from '@mui/material';
import ReactPlayer from "react-player";
import MicTwoToneIcon from '@mui/icons-material/MicTwoTone';
import FileExportBtn from './FileExportBtn';
import EditTable from './EditTable'

function Editpage() {

    return (
      <>
        {/*최상단 제목과 아이콘과 내보내기 버튼 */}
        <Box sx={{ width: '100%', height:100, display:'flex'}}>
            <Grid container direction="row" alignItems="center">
                <NoteAltIcon sx={{ fontSize: 40 }}/> <h2>인식 결과 편집</h2>
            </Grid>
            {/*내보내기 버튼 */}
            <Box sx={{

                display:'flex',
                justifyContent:'flex-end',
                alignItems:"center",
                width:'50%'
            }}
                
            >
                <FileExportBtn/>
            </Box>
        </Box>

        {/*중단 파일 이미지와 텍스트 자리 */}
        <Box sx={{ width: '100%'}}>
                바깥
            <Box sx={{ width: '100%' , mt:2, display:'flex'}}>
                {/*파일 이미지와 단축키 안내가 담긴 박스 */}
                <Box sx={{width:'35%', rowGap:3}}>
                    <Box sx={{height:'100', flexDirection:'column'}}>
                        <Box 
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height={300}
                        >
                            <Box sx={{
                                bgcolor:'error.main', 
                                height:250, 
                                width:250, 
                                justifyContent:"center",
                                alignItems:"center",
                                display:'flex',
                                borderRadius: 3
                                }}>
                                <MicTwoToneIcon className="fa-plus-circle"  sx={{fontSize:100}}></MicTwoToneIcon>
                            </Box>
                            
                        </Box>
                        <div>
                            파일 이름
                        </div>
                        <div>
                            파일 정보
                        </div>
                    
                        <Box sx={{height:200}}>
                            단축키 설명
                        </Box>
                    </Box>
                </Box>
                {/*오디오 텍스트 자리 */}
                <Box sx={{width:'65%'}}>
                    <EditTable/>
                </Box>
            </Box>
        </Box>

        {/*하단 오디오 재생바 */}
        <Box>
            <Box 
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
        
                <ReactPlayer
                    url="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
                    width="800px"
                    height="50px"
                    playing={false}
                    controls={true}
                />
            </Box>
        </Box>
      
      
      </>
    );
  };
  
  export default Editpage;