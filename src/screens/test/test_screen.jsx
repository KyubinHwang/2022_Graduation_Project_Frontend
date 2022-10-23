import React, { useEffect } from 'react';
import { useState, useRef, useCallback } from 'react';
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
      console.log("녹화 시작");
      let videoData = [];

      videoRecorder = new MediaRecorder(videoMediaStream, {
        mimeType: "video/webm; codecs=vp9",
      });  
      videoRecorder.ondataavailable = event => {
        if(event.data?.size > 0){
          videoData.push(event.data);
        }
      } 
      videoRecorder.onstop = () => {
        videoBlob = new Blob(videoData, {type: "video/mp4"});
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
    let filename = "실험이요" + ".mp4";  
    let fd = new FormData();
    fd.append('data', blob, filename);

    axios.post(`https://api.interview-please.ml/s3-upload2?file_name=${filename}`, fd).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const AudioRecord = () => {
    const [stream, setStream] = useState();
    const [media, setMedia] = useState();
    const [onRec, setOnRec] = useState(true);
    const [source, setSource] = useState();
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    const [sound, setSound] = useState();
  
    const onRecAudio = () => {
      // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
      const analyser = audioCtx.createScriptProcessor(0, 1, 1);
      setAnalyser(analyser);
  
      function makeSound(stream) {
        // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
        const source = audioCtx.createMediaStreamSource(stream);
        setSource(source);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
      }
      // 마이크 사용 권한 획득
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setStream(stream);
        setMedia(mediaRecorder);
        makeSound(stream);
  
        analyser.onaudioprocess = function (e) {
          // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
          if (e.playbackTime > 180) {
            stream.getAudioTracks().forEach(function (track) {
              track.stop();
            });
            mediaRecorder.stop();
            // 메서드가 호출 된 노드 연결 해제
            analyser.disconnect();
            audioCtx.createMediaStreamSource(stream).disconnect();
  
            mediaRecorder.ondataavailable = function (e) {
              setAudioUrl(e.data);
              setOnRec(true);
            };
          } else {
            setOnRec(false);
          }
        };
      });
    };
  
    // 사용자가 음성 녹음을 중지했을 때
    const offRecAudio = () => {
      // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
      media.ondataavailable = function (e) {
        setAudioUrl(e.data);
        setOnRec(true);
      };
  
      // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
      stream.getAudioTracks().forEach(function (track) {
        track.stop();
      });
  
      // 미디어 캡처 중지
      media.stop();
      // 메서드가 호출 된 노드 연결 해제
      analyser.disconnect();
      source.disconnect();
    };
  
    const onSubmitAudioFile = useCallback(() => {
      if (audioUrl) {
        console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
        setSound(URL.createObjectURL(audioUrl));
        
      }
      // File 생성자를 사용해 파일로 변환
      const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
      console.log(sound); // File 정보 출력
    }, [audioUrl]);
    
    const play = ()=>{
      const audio = new Audio(sound);
      audio.loop = false;
      audio.volume = 1;
      audio.play();
    }

    return (
      <>
        <button onClick={onRec ? onRecAudio : offRecAudio}>녹음</button>
        <button onClick={onSubmitAudioFile}>결과 확인</button>
        <button onClick={play}>재생</button>
      </>
    );
  };

  useEffect(()=>{
    startVideo();
  },[]);

  return (
    <div className={style.box}>
      <Header/>
      <video id={style.videoElement} autoPlay ref={videoRef} />
      <div>
        <button onClick={VideoCaptureStart}>녹화</button>
        <button onClick={VideoCaptureEnd}>녹화 종료</button>
      </div>
      <AudioRecord/>
    </div>
  );
}

export default Test;