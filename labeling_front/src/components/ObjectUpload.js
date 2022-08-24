import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FolderIcon from '@mui/icons-material/Folder';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { Button } from '@mui/material';


function ObjectUpload() {
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
                    'http://localhost:8000/api/obejct_list'
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

    const filelist = files.map((file) => (<tr>
        <td><input type="checkbox" name="file" value={file.name}></input></td>
        <td>{<GraphicEqIcon />}</td>
        <td>{file.name}</td>
        <td>{file.size}</td>
    </tr>))


    const uploadModule = async (e) => {
        e.preventDefault();
        console.log(e.target[1].checked);

        var i = 0
        var file =""
        for(i=1;i<e.target.length;i++){
            if(e.target[i].checked == true)
                file = e.target[i].value;
        }
        const language = e.target[0].value;
        const formData = new FormData();
        formData.append("language", language);
        formData.append("file", file);
        formData.append("enctype", "multipart/form-data")
        console.log(formData);
        const URL = "http://127.0.0.1:8000/api/object_file_upload"

        axios({
            method: "post",
            url: URL,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => {
            if (response.status == 200)
                alert("업로드 성공");
            else
                alert("업로드 실패");
        })
    }
    return (
        <>
            <form onSubmit={uploadModule}>
                언어 설정<select name="language">
                    <option label="KR 한국어" value="KR 한국어"></option>
                    <option label="EN English" value="EN English"></option>
                    <option label="KR/EN 한영 멀티 인식" value="KR/EN 한영 멀티 인식"></option>
                    <option label="JP 일본어" value="JP 일본어"></option>
                </select><br></br>
                <p>대상 파일 선택</p>
                <table>
                    <thead>
                        <tr>
                            <td>{<FolderIcon />}</td>
                            <td>testob</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filelist}
                    </tbody>
                </table>
                <p></p>
                <Button 
                    type="submit" 
                    onClick={() => window.location.reload()} 
                    variant='contained'>
                   인식요청 </Button>
            </form>
        </>
    )
}

export default ObjectUpload;