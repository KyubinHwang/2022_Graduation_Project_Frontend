import { useState, useEffect } from 'react';
import axios from 'axios';

const CONSTRAINTS = { video: true };

let videoMediaStream = null;

let videoRecorder = null;
let recordedVideoURL = null;
let videoBlob = null;

const useTestTimer = (videoRef) => {
    const [question, setQuestion] = useState(1);
    const [second, setSecond] = useState(3);
    const [secondCheck, setSecondCheck] = useState(false);
    const [thinking, setThinking] = useState(true);
    const [endShow, setEndShow] = useState(false);
    const [content, setContent] = useState("");
  
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
      if (videoRef && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = stream;
        videoMediaStream = stream;
      }
    };
  
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
          console.log(videoBlob)
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
      let filename = `test${question}` + ".webm";  
      let fd = new FormData();
      fd.append('data', blob, filename);
  
      axios.post(`https://api.interview-please.ml/gaze?name=${filename}`, fd).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }

    const url = 'https://api.interview-please.ml/question?no='

    const onClick = () => {
        if(thinking){
        // 생각시간은 못넘어가게 팝업 창 잠시 띄우기
        }
        else{
            if(second > 15){
                // 60초이상 지난 후 지나갈 수 있다는 팝업 창 잠시 띄우기
            }
            else{
                if(question < 5){
                    VideoCaptureEnd();
                    setQuestion(question + 1);
                    setSecond(3);
                    setThinking(true);
                    setSecondCheck(!secondCheck);
                }
                else{
                    VideoCaptureEnd();
                    setEndShow(true);
                }
            }
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setSecond(second - 1)
        }, 1000);

        // endpoint  /question?no=
        // no=숫자 이 때 숫자는 params로 질문 번호 될 예정
        //url 뒤에 url + question으로 요청시킬거
        

        if(question === 5 && second === -1 && !thinking){
            setEndShow(true);
            setSecond(0);
        }
        else{
            if(second === -1){
                setSecondCheck(!secondCheck);
                if(secondCheck){
                    VideoCaptureEnd();
                    setSecond(3);
                    setThinking(true);
                    setQuestion(question + 1);
                }
                else{
                    VideoCaptureStart();
                    setSecond(9);
                    setThinking(false);
                }
            }
        }
        return () => clearInterval(timer);
    },[question, second, thinking, secondCheck, VideoCaptureStart, VideoCaptureEnd])

    useEffect(() => {
        question === 1 ?
            setContent("본인에 대한 자기소개를 해주세요!")
        :
        axios.get(url + `${question}`)
        .then(
            response => {
                setContent(response.data.text)
            }
        );
        startVideo();
    },[question])

    return {
        question, second, thinking,
        endShow, setEndShow,
        content,
        onClick
    };
}

export default useTestTimer;