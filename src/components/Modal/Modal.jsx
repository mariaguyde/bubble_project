import style from './Modal.module.css'
import { useRef } from 'react';

export default function Modal({ setShowModal, children }) {
    const modal = useRef();
    const overlay = useRef();

    const hideModal = () => {
        overlay.current.classList.add(style["modal-overlay--hidden"]);
        modal.current.classList.add(style["modal--hidden"]);
        setTimeout(() => setShowModal(false), 550);
    }

    return (
        <>
            <div ref={overlay} onClick={hideModal} className={style["modal-overlay"]}></div>
            <div ref={modal} className={style["modal"]}>
                {children}
                <div onClick={hideModal} className={style["close-icon"]}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#EBEBEB" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>
                </div>
            </div>
        </>
    )
}
