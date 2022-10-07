import React from 'react';
import { useState, useRef } from 'react';
import guide3 from '../../assets/images/guide3.svg';
import wait from '../../assets/images/waiting.svg';
import record from '../../assets/images/recording.svg';
import style from './test.module.scss';
import EndButton from '../../components/test/endButton';
import EndModal from '../../components/test/endModal';
import useTestTimer from '../../hooks/useTestTimer';
import axios from 'axios';

const Header = () => {
  const {
    question, second, thinking,
    endShow, setEndShow,
    content,
    onClick
  } = useTestTimer();
  
  const [retryShow, setRetryShow] = useState(false);
  
  return(
    <>
      <div>
        <img src={guide3} className={style.currentPage} alt="profile" />
        <div className={style.box2}>
          <div style={{width : '150px'}}>
            <label style={{fontWeight : 'bold'}}> {thinking ? "생각시간" : "답변시간"} </label>
            <h2>{second}</h2>
            <button onClick={onClick} className={style.button}>다음 질문</button>
          </div>
          <div className={style.questionBox}>
            <label className={style.fadein}>Q{question}. {content} </label>
          </div>
          <div style={{display: 'flex', flexDirection : 'column', alignItems : 'center'}}>
            {
              thinking ?
              <img src={wait} style={{width: '150px'}} alt="wait" />
              : 
              <img src={record} style={{width: '150px'}} alt="record" />
            }
            <button onClick={() => setRetryShow(true)} className={style.button}>종료하기</button>
            <EndButton
              show={retryShow}
              onHide={() => setRetryShow(false)}
            />
          </div>
          <EndModal
            show={endShow}
            onHide={() => setEndShow(false)}
          />
        </div>
      </div>
    </>
  );
}

const CONSTRAINTS = { video: true };

function Test (){
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
      console.log("video capture start");
      let videoData = [];

      videoRecorder = new MediaRecorder(videoMediaStream, {
        mimeType: "video/webm; codecs=vp9"    
      });  
      videoRecorder.ondataavailable = event => {
        if(event.data?.size > 0){
          videoData.push(event.data);
        }} 
        videoRecorder.onstop = () => {
          videoBlob = new Blob(videoData, {type: "video/webm"});
          recordedVideoURL = window.URL.createObjectURL(videoBlob); // 이벤트 실행 시에 서버로 파일 POST      
          sendAvi(videoBlob);
          console.log("video capture end");    
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

    const sendAvi = blob => {
      if (blob == null) return;
      let filename = new Date().toString() + ".avi";  
      const file = new File([blob], filename);   
      let fd = new FormData();  
      fd.append("fname", filename);  
      fd.append("file", file);   
      axios.post('',{

      }).then(()=>{

      }).catch((err)=> {

      })
    }

  return (
    <div className={style.box}>
      <Header/>
      <video autoPlay ref={videoRef} />
      <div>
        <button onClick={startVideo}>웹캠 켜기</button>
        <button onClick={VideoCaptureStart}>녹화</button>
        <button onClick={VideoCaptureEnd}>녹화 종료</button>
      </div>
    </div>
  );
}

export default Test;