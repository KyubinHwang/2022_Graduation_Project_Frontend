import React from 'react';
import style from '../../screens/report/report.module.scss';

function Total(props){
    return(
        <div className={style.Evaluate}>
            <div className={style.contentEvaluate}>
            <div>
                <h1 style={{fontWeight : 'bold'}}>총 평가</h1>
                <label style={{color : '#408CFF', fontWeight : 'bold', fontSize : 40}}>S&nbsp;</label>
                <label style={{fontSize : 30}}>등급</label>
            </div>
            <div className={style.scoreBox}>
                <div>
                <h4 style={{fontWeight : 'bold'}}>표정 분석</h4>
                <label style={{fontWeight : 'bold', fontSize : 20}}>&nbsp;</label><label style={{fontSize : 20}}>등급</label>
                <p></p>
                </div>
                <div>
                <h4 style={{fontWeight : 'bold'}}>시선 처리</h4> 
                <label style={{fontWeight : 'bold', fontSize : 20}}>&nbsp;</label><label style={{fontSize : 20}}>등급</label>
                <p></p>
                </div>
                <div>
                <h4 style={{fontWeight : 'bold'}}>습관어 처리</h4>
                <label style={{fontWeight : 'bold', fontSize : 20}}>&nbsp;</label><label style={{fontSize : 20}}>등급</label>
                <p></p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Total;