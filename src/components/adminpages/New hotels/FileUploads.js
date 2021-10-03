import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';

function FileUploads(props) {

    const [uploadImg, setUploadImg] = useState(null);


    async function submitImg(event) {
        event.preventDefault()

        const formData = new FormData();
        formData.append('files', uploadImg)

        const upLoad = await axios.post('https://aqueous-reef-33257.herokuapp.com/uploads', formData)

        console.log(upLoad.data)
        props.info(upLoad.data)
    }

    function handleChange(event) {
        console.log(event.target.files)
        setUploadImg(event.target.files[0])
    }


    return (
        <div>
            <form onSubmit={submitImg}>
                <input onChange={handleChange} type="file" />
                <button>submit</button>
            </form>
        </div>
    )
}
export default FileUploads
