import React, {Component} from 'react';
import axios from 'axios';
import AudioAnalyser from "react-audio-analyser";

class AudioRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }

  controlAudio(status) {
    this.setState({
      status
    });
  }

  changeScheme() {
    this.setState({
      audioType: "audio/wav"
    });
  }

  componentDidMount() {
    this.setState({
      audioType: "audio/wav"
    });
  }

  render() {
    const { status, audioSrc, audioType } = this.state;
    const temp = this.state;
    const audioProps = {
      audioType,
      status,
      audioSrc,
      startCallback: e => {
        console.log("succ start", e);
      },
      stopCallback: e => {
        this.setState({
          audioSrc: URL.createObjectURL(e),
          temp : e
        });
        console.log("succ stop", e);
      },
      errorCallback: err => {
        console.log("error", err);
      }
    };

    const sendAudio = () => {
      console.log(temp.temp)
      if (temp.temp == null) return;
      let filename = "test2" + ".wav";
      let fd = new FormData();
      fd.append('data', temp.temp, filename);
      axios.post(`https://api.interview-please.ml/habit?name=${filename}`, fd).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    };


    return (
      <div>
        <AudioAnalyser {...audioProps}>
          <div className="btn-box">
            <button
              className="btn"
              onClick={() => this.controlAudio("recording")}
            >
              Start
            </button>
            <button
              className="btn"
              onClick={() => this.controlAudio("inactive")}
            >
              Stop
            </button>
          </div>
        </AudioAnalyser>
        <button onClick={sendAudio}>
          제출
        </button>
      </div>
    );
  }
}

export default AudioRecord;