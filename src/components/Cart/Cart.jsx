import CreditCard from "../../assets/img/credit-card.svg";
import CartIcon from "../../assets/img/basket.png";
import Cash from "../../assets/img/money.png";
import CartItem from "../CartItem/CartItem";
import Payment from "../Payment/Payment";
import Modal from '../Modal/Modal';
import style from './Cart.module.css';
import { useState, useEffect } from 'react';

export default function Cart({ cartProducts, setCartContent }) {
    const [showPayment, setShowPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [showCart, setShowCart] = useState(false);
    const [errors, setErrors] = useState({});

    const changeVisibility = (e) => {
        e.preventDefault();

        const formData = {
            paymentMethod: e.target["payment-method"].value.trim(),
        }

        const formErrors = {};

        if (formData["paymentMethod"] === "") {
            formErrors["paymentMethod"] = true;
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setShowPayment(true);
        }
    }

    useEffect(() => {
        setErrors({});
    }, [showPayment])

    return (
        <>
            <div onClick={() => setShowCart(true)} className={style["cart-container"]}>
                <div className={style["quantity-container"]}>
                    {cartProducts.reduce((accumulator, currentValue) => accumulator + currentValue['quantité'], 0)}
                </div>
                <div className={style["cart-icon"]}>
                    <img src={CartIcon} alt="icône panier" />
                </div>
            </div>

            {showCart && (
                <Modal setShowModal={setShowCart}>
                    {showPayment ? (
                        <div>
                            <Payment setShowPaymentComponent={setShowPayment} cartContent={cartProducts} paymentMethod={paymentMethod} />
                        </div>
                    ) :
                        (
                            <div className={style["container"]}>
                                <h1>Panier</h1>
                                <form onSubmit={changeVisibility} className={style["cart-details"]}>
                                    <div className={style["cart-products-list"]}>
                                        {cartProducts.map((product, i) =>
                                            <CartItem key={i} productInfo={product} cartContent={cartProducts} setCartContent={setCartContent} />
                                        )}
                                    </div>
                                    <hr />

                                    <div className={style["cart-total-price"]}>
                                        <p>Total</p>
                                        <p>{cartProducts.reduce((accumulator, currentValue) => accumulator + (currentValue['quantité'] * currentValue['prix']), 0).toFixed(2)}€</p>
                                    </div>

                                    {cartProducts.length > 0 && (
                                        <>
                                            <div className={style["cart-payment"]}>
                                                <div className={style["cart-mean-payment"]}>
                                                    <input
                                                        type="radio" name="payment-method"
                                                        value="card" id="card"
                                                        onChange={() => { setPaymentMethod("card") }}
                                                    />
                                                    <img src={CreditCard} alt="carte de crédit" />
                                                    <label htmlFor="card">Carte</label>
                                                </div>

                                                <div className={style["cart-mean-payment"]}>
                                                    <input
                                                        type="radio" name="payment-method"
                                                        value="cash" id="cash"
                                                        onChange={() => { setPaymentMethod("cash") }}
                                                    />
                                                    <img src={Cash} alt="carte de crédit" />
                                                    <label htmlFor="cash" >Espèces</label>
                                                </div>
                                            </div>
                                            {errors.paymentMethod && (
                                                <div className={style['error-message']}>Veuillez choisir votre moyen de paiement.</div>
                                            )}
                                            <button type="submit" className={style["btn-order"]}>Commander</button>
                                        </>
                                    )}
                                </form>
                            </div>
                        )}
                </Modal>
            )}
        </>
    )
}
