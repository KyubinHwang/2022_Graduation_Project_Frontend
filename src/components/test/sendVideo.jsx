import React, { useEffect } from 'react';
import style from '../../screens/test/test.module.scss';
import { useRef } from 'react';
import axios from 'axios';

const CONSTRAINTS = { video: true };

const RecordVideo = () => {
    const videoRef = useRef(null);
    let videoMediaStream = null;
  
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
      if (videoRef && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = stream;
        videoMediaStream = stream;
      }
    };
    
    let videoRecorder = null;
    let recordedVideoURL = null;
    let videoBlob = null;
  
    const VideoCaptureStart = () => {
      if (navigator.mediaDevices.getUserMedia) {
        console.log("녹화 시작");
        let videoData = [];
  
        videoRecorder = new MediaRecorder(videoMediaStream, {
          mimeType: "video/webm; codecs=vp9",
        });  
        videoRecorder.ondataavailable = (event) => {
          if (event.data?.size > 0) {
            videoData.push(event.data);
          }
        } 
        videoRecorder.onstop = () => {
          videoBlob = new Blob(videoData, {type: "video/webm"});
          recordedVideoURL = window.URL.createObjectURL(videoBlob); // 이벤트 실행 시에 서버로 파일 POST  
          sendAvi(videoBlob);
          console.log('녹화 완료');
        }
        videoRecorder.start();  
      }
    };
  
    const VideoCaptureEnd = () => {
      if(videoRecorder){
        videoRecorder.stop();
        videoRecorder = null;
      }
    };
  
    const sendAvi = (blob) => {
      if (blob == null) return;
      let filename = "test1" + ".webm";  
      let fd = new FormData();
      fd.append('data', blob, filename);
  
      axios.post(`https://api.interview-please.ml/s3-upload2?file_name=${filename}`, fd).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }

    const downloadBtn = () => {
        if (recordedVideoURL) {
            const link = document.createElement("a");
            document.body.appendChild(link);
            // 녹화된 영상의 URL을 href 속성으로 설정
            link.href = recordedVideoURL;
            // 저장할 파일명 설정
            link.download = "video.webm";
            link.click();
            document.body.removeChild(link);
        }
    }

    useEffect(()=>{
        startVideo();
      },[]);
    
    return (
        <>
            <video id={style.videoElement} autoPlay ref={videoRef}/>
            <div>
                <button onClick={VideoCaptureStart}>녹화</button>
                <button onClick={VideoCaptureEnd}>녹화 종료</button>
                <button onClick={downloadBtn}>재생</button>
            </div>
        </>
    );
}

export default RecordVideo;