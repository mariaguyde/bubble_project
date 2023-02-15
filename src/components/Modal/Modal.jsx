import style from './Modal.module.css'
import CloseIcon from "../../assets/svg/close-icon.svg"
import { useRef } from 'react';

export default function Modal({ setShowModal, children }) {
    const modal = useRef();

    const hideModal = (e) => {
        e.target.classList.add(style["modal-overlay--hidden"]);
        modal.current.classList.add(style["modal--hidden"]);
        const closeModal = setTimeout(() => {
            setShowModal(false)
            // clearTimeout(closeModal);
        }, 550);
    }

    return (
        <>
            <div onClick={hideModal} className={style["modal-overlay"]}></div>
            <div ref={modal} className={style["modal"]}>
                {children}
                <div onClick={hideModal} className={style["close-icon"]}>
                    <img src={CloseIcon} alt="icône fermeture" />
                </div>
            </div>
        </>
    )
}