import { useState, useEffect } from 'react';
import axios from 'axios';

const useTestTimer = () => {
    const [question, setQuestion] = useState(1);
    const [second, setSecond] = useState(30);
    const [secondCheck, setSecondCheck] = useState(false);
    const [thinking, setThinking] = useState(true);
    const [endShow, setEndShow] = useState(false);
    const [content, setContent] = useState("");

    const url = 'http://15.164.231.34:5000/question?no='

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
                setQuestion(question + 1);
                setSecond(30);
                setThinking(true);
                setSecondCheck(!secondCheck);
                }
                else{
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
                    setSecond(30);
                    setThinking(true);
                    setQuestion(question + 1);
                }
                else{
                    setSecond(90);
                    setThinking(false);
                }
            }
        }
        return () => clearInterval(timer);
    },[question, second, thinking, secondCheck])

    useEffect(() => {
        question === 1 ?
            setContent("본인에 대한 자기소개를 해주세요!")
        :
        axios.get(url + `${question}`)
        .then(
            response => {
                console.log(response.data.text)
                setContent(response.data.text)
            }
        );
    },[question])

    return {
        question, second, thinking,
        endShow, setEndShow,
        content,
        onClick
    };
}

export default useTestTimer;