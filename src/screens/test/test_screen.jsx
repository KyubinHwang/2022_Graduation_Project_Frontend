import React from 'react';
import { useState } from 'react';
import guide3 from '../../assets/images/guide3.svg';
import style from './test.module.scss';
import EndButton from '../../components/test/endButton';
import EndModal from '../../components/test/endModal';
import useTestTimer from '../../hooks/useTestTimer';

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
          <div style={{width : '130px'}}>
            <label style={{fontWeight : 'bold'}}> {thinking ? "생각시간" : "답변시간"} </label>
            <h2>{second}</h2>
            <button onClick={onClick} className={style.button}>다음 질문</button>
          </div>
          <div className={style.questionBox}>
            <label className={style.fadein}>Q{question}. {content} </label>
          </div>
          <div style={{display: 'flex', flexDirection : 'column', alignItems : 'center'}}>
            <div className={style.recording}>
              {
                thinking ?
                <label style={{fontSize : '20px', fontWeight : 'bold'}}>⚪️ Waiting</label>
                : <label style={{color : 'red', fontSize : '20px', fontWeight : 'bold'}}>🔴 Recording</label>
              }
            </div>
            <button onClick={() => setRetryShow(true)} style={{marginTop : '20px'}} className={style.button}>종료하기</button>
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


function Test (){
  return (
    <div className={style.box}>
      <Header/>
      <div className={style.cameraDisplay}>
        <div className={style.cameraScreen}>
          <h3>렌더링한 영상 화면</h3>
        </div>
      </div>
    </div>
  );
}

export default Test;