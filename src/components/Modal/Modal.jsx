import style from './Modal.module.css'
import { useRef } from 'react';

export default function Modal({ setShowModal, children }) {
    const modal = useRef();

    return (
        <>
            <div onClick={(e) => {
                e.target.classList.add(style["modal-overlay--hidden"]);
                modal.current.classList.add(style["modal--hidden"]);
                const closeModal = setTimeout(() => {
                    setShowModal(false)
                    clearTimeout(closeModal);
                }, 550);
            }} className={style["modal-overlay"]}></div>
            <div ref={modal} className={style["modal"]}>
                {children}
            </div>
        </>
    )
}
