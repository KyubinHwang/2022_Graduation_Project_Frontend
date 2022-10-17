import { useState, useEffect } from 'react';
// import axios from 'axios';

// const url = ''

const useReportResult = () => {
    const [result, setResult] = useState(0);

    useEffect(() => {
        // axios.get(url)
        // .then(res => {
        //     // setResult(res.data.text);
        // }).catch(err => {
        //     console.log(err)
        // });
    },[])

    return {result};
}

export default useReportResult;