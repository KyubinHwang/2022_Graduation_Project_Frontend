import React from 'react';
import { Modal } from 'react-bootstrap';
import style from '../../screens/guide/guide.module.scss';

const GuideToTest = (props) => {
    const goTo = () => {
        window.location.assign('./test')
    };

    return(
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className={style.modalBody}>
                <p>면접을 시작합니다!</p>
                <p>마음의 준비가 되셨다면 면접 시작하기 버튼을 눌러주세요.</p>
            </Modal.Body>
            <Modal.Footer
                style={{
                    display: "flex",
                    justifyContent: 'center',
                }}
            >
                <button onClick={props.onHide} className={style.modalButton}>한번 더 확인하기</button>
                <button onClick={goTo} className={style.modalButton}>면접 시작하기</button>
            </Modal.Footer>
        </Modal>
    ); 
}

export default GuideToTest;