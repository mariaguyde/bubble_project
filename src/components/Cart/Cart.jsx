import style from './Cart.module.css';
import CartIcon from "../../assets/img/basket.png";
import Modal from '../Modal/Modal';
import React, { useState } from 'react';
import especes from "../../assets/img/money.png";
import carteCredit from "../../assets/img/credit-card.svg";

export default function Cart({ cartProducts }) {

    // intégration de la maquette
    // TODO Mise en page des données
    // TODO récupération des éléments du panier du client
    // TODO persistance des infos du panier si possible


    const [showCart, setShowCart] = useState(false);
    const [itemQuantity, setItemQuantity] = useState(1);
    const [prix, setprix] = useState(1);

    // récupération des produits ajoutés dans le panier
    console.log(cartProducts);

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
                    <div id={style["container"]}>
                        <h1>Panier</h1>
                        <div className={style["panier_details"]}>
                            <div id={style["panier_produitslist"]}>
                                {cartProducts.map(product=>
                                    <div className={style["panier_produit"]}>
                                        <img src={product.image} alt="produit"/>
                                        <div className={style["panier_nomProduit"]}>
                                            <p>{product.name}</p>
                                            <p>{product.price} €</p>
                                        </div>
                                        <div className={style["panier_produitQuantite"]}>
                                            <div onClick={() => itemQuantity !== 0 ? setItemQuantity(itemQuantity - 1) : null}>
                                                -
                                            </div>
                                            <p>{product.quantity}</p>
                                            <div onClick={() => setItemQuantity(product.quantity + 1)}>
                                                +
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={style["panier_montantTotal"]}>
                                <div>
                                    <p>Total</p>
                                    <p>{prix} $</p>
                                </div>
                                <hr></hr>
                                <div>
                                    <p>Total + taxes</p>
                                    <p>{prix*1.2}$</p>
                                </div>
                            </div>

                            <div id={style["panier_paiement"]}>
                                <div className={style["panier_moyenPaiement"]}>
                                    <input
                                        type="radio"
                                        name="paiement_carteDebit"
                                        value="carte-debit"
                                    />
                                    <img src={carteCredit} alt="carte de crédit"/>
                                    <p>Débit ou crédit</p>
                                </div>
                                <div className={style["panier_moyenPaiement"]}>
                                    <input
                                        type="radio"
                                        name="paiement_carteDebit"
                                        value="espece"
                                    />
                                    <img src={especes} alt="carte de crédit"/>
                                    <p>En comptant</p>
                                </div>
                            </div>
                            <button className={style["btn_commander"]}>Commander</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}
