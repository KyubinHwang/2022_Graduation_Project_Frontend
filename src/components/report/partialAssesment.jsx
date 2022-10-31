import React from 'react';
import style from '../../screens/report/report.module.scss';

function Partial() {

    const customLanguage = [
        "전반적으로 습관어 사용 빈도 수가 상당히 낮습니다! 이대로 답변을 진행할 수 있다면 면접에서도 긴장한 티나 당황한 티가 잘 드러나지 않을 확률이 높습니다.",
        "습관어 사용 빈도 수가 매우 많습니다. 이는 면접관에게 긴장한 티나 당황한 티가 잘 드러날 수 있는 수치입니다. 개선을 위해서는 반복적인 연습이 필요합니다."
    ]

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
                    <p style={{fontWeight : 'bold', fontSize : 24}}>Top 1 '음'</p>
                    <p style={{fontWeight : 'bold', fontSize : 18}}>20 회</p>
                    <p style={{fontWeight : 'bold', fontSize : 24}}>Top 2 '아'</p>
                    <p style={{fontWeight : 'bold', fontSize : 18}}>20 회</p>
                    <p style={{fontWeight : 'bold', fontSize : 24}}>Top 3 '어'</p>
                    <p style={{fontWeight : 'bold', fontSize : 18}}>20 회</p>
                    <p style={{fontWeight : 'bold', fontSize : 24}}>총 평</p>
                    <p style={{fontSize : 16}}>본 프로그램에서 측정되는 습관어는 '아', '아니', '그', '음', '어', '습', '엄'으로 반복적인 단어가 발견될시에 면접자의 습관어를 기록합니다.</p>
                    <p style={{fontSize : 16}}>{customLanguage[0]}</p>
                    <p style={{fontSize : 16}}>면접을 진행할 때에 가장 중요한 점은 면접자의 '자신감'입니다. 자신의 의견을 분명하게 전달할 수 있도록 자신감있는 말투와 표정을 거울을 통해 연습해주세요. 
                        충분한 연습을 통해 AI 면접을 넘어 실제 면접관에게도 좋은 평가를 받을 수 있도록 지속적인 연습을 진행해주세요!</p>
                    <p style={{fontSize : 16}}>면접을 부탁해는 면접자님의 합격을 기원합니다!!</p>
                </div>
            </div>
        </div>
    );
}

export default Partial;