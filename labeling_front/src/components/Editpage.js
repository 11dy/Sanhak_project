//인식결과편집 페이지

import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Grid } from '@mui/material';
import ReactPlayer from "react-player";
import MicTwoToneIcon from '@mui/icons-material/MicTwoTone';
import FileExportBtn from './FileExportBtn';
import EditTable from './EditTable'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function getReadableFileSizeString(fileSizeInBytes) {
    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes /= 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

function func(stt){
    var i = 0;
    var sum = 0;
    for(i=0;i<stt.length;i++){
        sum += stt[i].words.length;
    }

    return sum;
}

function Editpage() {
    const params = useParams();
    const id = params['id'];
    const url = 'http://localhost:8000/api/get_result/' + id;
    const [dataes, setDataes] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);    

    useEffect(() => {
        const fetchDataes = async () => {
            try {
                // 요청이 시작 할 때에는 error 와 users 를 초기화하고
                setError(null);
                setDataes(null);
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);
                const response = await axios.get(
                    url
                );
                setDataes(response.data); // 데이터는 response.data 안에 들어있습니다.
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchDataes();
    }, []);
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!dataes) return null;

    const stt = dataes[1]['SttResponse']['segments']
    const urls = "http://localhost:8000" + dataes[0]['info']['mediaUrl']
    const info = dataes[0]['info']
    const words = func(stt);

    return (
        <>
            {/*최상단 제목과 아이콘과 내보내기 버튼 */}
            <Box sx={{ width: '100%', height: 100, display: 'flex', borderBottom: 1 }}>
                <Grid container direction="row" alignItems="center">
                    <NoteAltIcon sx={{ fontSize: 40 }} /> <h2>인식 결과 편집</h2>
                </Grid>
                {/*내보내기 버튼 */}
                <Box sx={{

                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: "center",
                    width: '50%'
                }}

                >
                    <FileExportBtn />
                </Box>
            </Box>

            {/*중단 파일 이미지와 텍스트 자리 */}
            <Box sx={{ width: '100%' }}>

                <Box sx={{ width: '100%', mt: 2, display: 'flex' }}>
                    {/*파일 이미지와 단축키 안내가 담긴 박스 */}
                    <Box sx={{ width: '35%', rowGap: 3 }}>
                        <Box sx={{ height: '100', flexDirection: 'column' }}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height={300}
                            >
                                <Box sx={{
                                    bgcolor: '#1976D2',
                                    height: 250,
                                    width: 250,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: 'flex',
                                    borderRadius: 3
                                }}>
                                    <MicTwoToneIcon className="fa-plus-circle" sx={{ fontSize: 100 }}></MicTwoToneIcon>
                                </Box>
                            </Box>
                            <div>
                                파일 이름: {info['fileName']}
                            </div>
                            <div>
                                파일 크기: {getReadableFileSizeString(info['fileSize'])}
                            </div>
                            <div>
                                문장 수: {stt.length} 
                            </div>
                            <div>
                                단어 수: {words}
                            </div>
                        </Box>
                    </Box>
                    {/*오디오 텍스트 자리 */}
                    <Box sx={{ width: '65%' }}>
                        <EditTable params={stt} />
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
                        id = "audioFile"
                        url={urls}
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