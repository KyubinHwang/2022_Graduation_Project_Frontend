import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d46e4d9c-6d6d-438d-86b2-ef19867ff3be/resultSample.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220710T071230Z&X-Amz-Expires=86400&X-Amz-Signature=1e33312a0b46c6aa6d95597f871c78d0d4278b962816c7f6b031c509fb6676e2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22resultSample.json%22&x-id=GetObject'

const useReportResult = () => {
    const [result, setResult] = useState([]);

    useEffect(() => {
        axios.get(url)
        .then(res => {
            setResult(res.result);
        });
    },[])

    return {result};
}

export default useReportResult;