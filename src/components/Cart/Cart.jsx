import style from './Cart.module.css'
import CartIcon from "../../assets/img/basket.png"
import Modal from '../Modal/Modal';
import { useState } from 'react';

export default function Cart() {
    const [showCart, setShowCart] = useState(false);

    return (
        <>
            <div onClick={() => setShowCart(true)} className={style["cart-container"]}>
                <div className={style["quantity-container"]}>
                    0
                </div>
                <div className={style["cart-icon"]}>
                    <img src={CartIcon} alt="icône panier" />
                </div>
            </div>
            {showCart && (
                <Modal setShowModal={setShowCart}>
                    {/* code here to display all products contained in cart */}
                    Afficher la liste des produits du panier
                </Modal>
            )}
        </>
    )
}
