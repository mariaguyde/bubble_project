import style from './Cart.module.css';
import CartIcon from "../../assets/img/basket.png";
import Modal from '../Modal/Modal';
import React, {useEffect, useState} from 'react';
import especes from "../../assets/img/money.png";
import carteCredit from "../../assets/img/credit-card.svg";

export default function Cart({ cartProducts, setCartContent }) {

    // intégration de la maquette
    // TODO Mise en page des données
    // récupération des éléments du panier du client
    // Calcul du total
    // Gestion des quantités des produits

    const [showCart, setShowCart] = useState(false);
    const [prixTotal, setPrixTotal] = useState(0);

    const calculTotalCart = () => {
        let total = 0;
        cartProducts.map((product) => {total += product.quantity * product.price;});
        setPrixTotal(total);
    }

    const changeCartState = (choosedproductId, operation) => {
        let dubstbin = null;
        const newCartContent = cartProducts.map((product,i) => {
            if(product.id === choosedproductId){
                if (operation === 'decrease' ) {
                    //product.quantity > 1 ? return  {...product, quantity: product.quantity - 1 } :  dubstbin = i
                    if (product.quantity > 1) {
                        return  {...product, quantity: product.quantity - 1 };
                    }
                    else {
                        dubstbin = i;
                    }
                }
                else {
                    return  {...product, quantity: product.quantity + 1 }
                }
            }
            return  {...product};
        });

        if (dubstbin !== null)
            newCartContent.splice(dubstbin, 1);

        setCartContent(newCartContent);
        calculTotalCart();
    }

    useEffect(() => {
        calculTotalCart();
    }, );

    return (
        <>
            <div onClick={() => setShowCart(true)} className={style["cart-container"]}>
                <div className={style["quantity-container"]}>
                    {cartProducts.length}
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
                                {cartProducts.map((product, i) =>
                                    <div id={product.id} className={style["panier_produit"]}>
                                        <img src={product.image} alt="produit"/>
                                        <div className={style["panier_nomProduit"]}>
                                            <p>{product.name}</p>
                                            {product.options.taille && (
                                                <p>{product.options.taille}</p>
                                            )}

                                            {product.type && (
                                                <p>{product.type}</p>
                                            )}

                                            {product.options['sauce_piquante'] && (
                                                <p>{product.options['sauce_piquante'] === "Oui" ? "Avec sauce piquante" : "Sans sauce piquante" }</p>

                                            )}

                                            {product.extras[0] && (
                                              <p> Extra(s) :  {product.extras.map(extra => <span>{extra} </span>)}</p>
                                            )}
                                            <p>{product.price * product.quantity} €</p>
                                        </div>
                                        <div className={style["panier_produitQuantite"]}>
                                            <div onClick={() => {changeCartState(product.id, 'decrease');}}>
                                                -
                                            </div>
                                            <p>{product.quantity}</p>
                                            <div onClick={() => {changeCartState(product.id, 'increase');}}>
                                                +
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={style["panier_montantTotal"]}>
                                <div>
                                    <p>Total</p>
                                    <p>{prixTotal} $</p>
                                </div>
                                <hr></hr>
                                <div>
                                    <p>Total + taxes</p>
                                    <p>{prixTotal*1.2}$</p>
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
