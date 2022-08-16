import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Dropzone, FileItem, FullScreenPreview } from "dropzone-ui";
function LocalUpload() {
    const [files, setFiles] = useState([]);
    const [imageSrc, setImageSrc] = useState(undefined);
    const updateFiles = (incommingFiles) => {
        console.log("incomming files", incommingFiles);
        setFiles(incommingFiles);
    };
    const onDelete = (id) => {
        setFiles(files.filter((x) => x.id !== id));
    };
    const handleSee = (imageSource) => {
        setImageSrc(imageSource);
    };
    const navigate = useNavigate();

    const uploadModule = async (e) => {
        e.preventDefault();
        const langague = e.target[0].value;

        const upload_file = e.target[1].files[0];

        const formData = new FormData();
        formData.append("langauge", langague);
        formData.append("file", upload_file);
        formData.append("enctype", "multipart/form-data")
        
        const URL = "http://127.0.0.1:8000/api/local_file_upload"

        axios({
            method: "post",
            url: URL,
            data: formData,
            headers: {
                "Content-Type" : "multipart/form-data",
            }
        }).then(response => {
            if(response.status == 200)
                alert("업로드 성공");
            else
                alert("업로드 실패");
        })
    }
    return (
        <>
        <form onSubmit={uploadModule}>
            언어 설정<select name="langauge">
                <option label="KR 한국어" value="KR 한국어"></option>
                <option label="EN English" value="EN English"></option>
                <option label="KR/EN 한영 멀티 인식" value="KR/EN 한영 멀티 인식"></option>
                <option label="JP 일본어" value="JP 일본어"></option>
            </select><br></br>
            <p>파일 업로드</p>
            <Dropzone
                onChange={updateFiles}
                value={files}
                maxFiles={1}
                maxFileSize={52430000}
                dropzoneText="마우스로 파일을 끌고 오거나 여기를 클릭하세요."
                style={{width:"100%",height:"50%",background:"#f2f2f2","box-sizing":"content-box"}}
                >
                {files.map((file) => (
                    <FileItem
                    {...file}
                    />
                ))}
            </Dropzone>
            <input type="submit" value="인식 요청"/>
        </form>
        </>
    );
}

export default LocalUpload;