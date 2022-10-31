import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import guide4 from '../../assets/images/guide4.svg';
import style from './report.module.scss';
import Partial from '../../components/report/partialAssesment';
import useReportResult from '../../hooks/useReportResult';

function Report () {
  const {result} = useReportResult();

  const goTo = () => {
    window.location.assign('/')
  };

  return (
    <>
      {
        result === 1
        ?
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
        </div>
        :
        <div className={style.box}>
          <img src={guide4} className={style.currentPage} alt="profile" />
          <div className={style.reportForm}>
            <Partial/>
          </div>
          <button className={style.button} onClick={goTo}>처음 화면으로 돌아가기</button>
        </div>
      }
    </>
  );
}

export default Report;