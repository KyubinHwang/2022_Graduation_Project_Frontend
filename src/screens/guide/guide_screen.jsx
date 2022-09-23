import React from 'react';
import { useState } from 'react';
import GuideToTest from '../../components/guide/guideToTestModal';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';
import guide2 from '../../assets/images/guide2.svg';
import style from './guide.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from "swiper";
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

SwiperCore.use([Navigation, Autoplay])

function Guide () {
  const animatedItem = {
    0: useScrollFadeIn('up', 1, 0),
  };

  const [show, setShow] = useState(false);

  return (
    <div className={style.box}>
      <img src={guide2} className={style.currentPage} alt="profile" />
      <div className={style.swiperPosition} {...animatedItem[0]}>
        <Swiper
          slidesPerView={2}
          navigation
          autoplay={{
              delay: 5000,
              disableOnInteraction: false
          }}
        >
          <SwiperSlide className={style.imgBox}>
              <div className={style.imagespace}>
              질문을 확인하고 60초동안 질문에 대한 답변을 고민해주세요.<br/>
              60초가 모두 넘어가야 답변시간이 주어집니다. 
              </div>
          </SwiperSlide>
          <SwiperSlide className={style.imgBox}>
              <div className={style.imagespace}>
              90초동안 질문에 대해서 답변해주세요.<br/>
              30초 미만의 시간이 남았을 때 다음 질문으로 넘어갈 수 있습니다.
              </div>
          </SwiperSlide>
          <SwiperSlide className={style.imgBox}>
              <div className={style.imagespace}>
              중도에 면접을 포기하고, 다시 시작하고 싶으신 경우에는 <br/>
              다시하기 버튼을 클릭하시면 메인 화면으로 돌아가실 수 있습니다.
              </div>
          </SwiperSlide>  
          <SwiperSlide className={style.imgBox}>
              <div className={style.imagespace}>
              표정, 시선, 습관어 사용을 분석하여 결과를 제공합니다. <br/>
              실제 기업 문항들에 대한 답변을 대비할 수 있습니다.
              </div>
          </SwiperSlide>  
        </Swiper>
        <button onClick={() => setShow(true)} className={style.button}>면접 시작하기</button>
        <GuideToTest show={show} onHide={() => setShow(false)}/>
      </div>
    </div>
  );
}

export default Guide;