import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}

const AudioRecord = () => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = e => {
      console.log(e.data);
      setAudioBlob(e.data);
      setAudioURL(URL.createObjectURL(e.data));
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const sendAudio = () => {
    if (audioBlob == null) return;
    let filename = "test2" + ".webm";
    let fd = new FormData();
    fd.append('data', audioBlob, filename);

    axios.post(`https://api.interview-please.ml/habit?name=${filename}`, fd).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  };

  return (
    <>
      <audio src={audioURL} controls />
      <button onClick={startRecording} disabled={isRecording}>
        start recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        stop recording
      </button>
      <button onClick={sendAudio}>
        제출
      </button>
    </>
  );
};

export default AudioRecord;