import React from 'react';
import style from '../../screens/report/report.module.scss';

function Partial() {
    return(
        <div className={style.Evaluate}>
            <div className={style.contentEvaluate2}>
            <div className={style.detailContent}>
                <h4 style={{fontWeight : 'bold', color : '#408CFF', fontSize : 35}}>표정 분석</h4>
                <label style={{fontWeight : 'bold', fontSize : 24}}>B&nbsp;</label><label style={{fontSize : 24}}>등급</label>
                <br/>
                <br/>
                <label style={{fontWeight : 'bold', fontSize : 20}}>3번 - 당신의 인생에서 가장 중요했던 순간은 언제였는지 이에 대해 소개해주세요.</label>
                <p style={{fontWeight : 'bold'}}>답변 시간 - 68초</p>
                <p>3번 질문의 답변 도중 표정유지가 적절하게 이루어지지 못하였습니다. 답변을 하면서 밝은 표정을 유지하여야 하는 점을 유의해주세요. 밝은 표정이 유지되었던 비율이 52.3%로 대체로 낮은 평가를 받았습니다. 답변에서 키워드가 무엇인지 고민하고 이에 자신감있는 어투와 함께 표정을 개선해보세요! </p>
                <br/>
                <label style={{fontWeight : 'bold', fontSize : 20}}>5번 - 자신을 형용사로 표현한다면 어떤 단어로 표현할 수 있을까요?</label>
                <p style={{fontWeight : 'bold'}}>답변 시간 - 68초</p>
                <p>5번 질문의 답변 도중 표정유지가 적절하게 이루어지지 못하였습니다. 답변을 하면서 밝은 표정을 유지하여야 하는 점을 유의해주세요. 밝은 표정이 유지되었던 비율이 52.3%로 대체로 낮은 평가를 받았습니다. 답변에서 키워드가 무엇인지 고민하고 이에 자신감있는 어투와 함께 표정을 개선해보세요! </p>
            </div>
            <div className={style.detailContent}>
                <h4 style={{fontWeight : 'bold', color : '#408CFF', fontSize : 35}}>시선 처리</h4>
                <label style={{fontWeight : 'bold', fontSize : 24}}>B&nbsp;</label><label style={{fontSize : 24}}>등급</label>
                <br/>
                <br/>
                <label style={{fontWeight : 'bold', fontSize : 20}}>3번 - 당신의 인생에서 가장 중요했던 순간은 언제였는지 이에 대해 소개해주세요.</label>
                <p style={{fontWeight : 'bold'}}>답변 시간 - 68초</p>
                <p>3번 질문의 답변 도중 표정유지가 적절하게 이루어지지 못하였습니다. 답변을 하면서 밝은 표정을 유지하여야 하는 점을 유의해주세요. 밝은 표정이 유지되었던 비율이 52.3%로 대체로 낮은 평가를 받았습니다. 답변에서 키워드가 무엇인지 고민하고 이에 자신감있는 어투와 함께 표정을 개선해보세요! </p>
                <br/>
                <label style={{fontWeight : 'bold', fontSize : 20}}>5번 - 자신을 형용사로 표현한다면 어떤 단어로 표현할 수 있을까요?</label>
                <p style={{fontWeight : 'bold'}}>답변 시간 - 68초</p>
                <p>5번 질문의 답변 도중 표정유지가 적절하게 이루어지지 못하였습니다. 답변을 하면서 밝은 표정을 유지하여야 하는 점을 유의해주세요. 밝은 표정이 유지되었던 비율이 52.3%로 대체로 낮은 평가를 받았습니다. 답변에서 키워드가 무엇인지 고민하고 이에 자신감있는 어투와 함께 표정을 개선해보세요! </p>
            </div>
            <div className={style.detailContent}>
                <p style={{fontWeight : 'bold', color : '#408CFF', fontSize : 35}}>습관어 처리</p>
                <label style={{fontWeight : 'bold', fontSize : 24}}>S&nbsp;</label><label style={{fontSize : 24}}>등급</label>
                <br/>
                <br/>
                <p>모든 질문에서 좋은 평가를 받았습니다. 본 프로그램에서 측정되는 습관어는 ‘음, 어, 살짝, 진짜' 등 으로 반복적인 단어가 발생하지 않았습니다. 계속 연습한다면 AI 면접에서 좋은 평가를 받으실 수 있습니다.</p>
            </div>
            <div style={{textAlign : 'center', marginBottom : 30, marginTop : 50}}>
                <button className={style.button}>
                결과 pdf 다운 받기
                </button>
            </div>
            </div>
        </div>
    );
}

export default Partial;