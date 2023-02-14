import carteCredit from "../../assets/img/credit-card.svg";
import CartIcon from "../../assets/img/basket.png";
import especes from "../../assets/img/money.png";
import React, {useEffect, useState} from 'react';
import Payment from "../Payment/Payment";
import Modal from '../Modal/Modal';
import style from './Cart.module.css';

export default function Cart({cartProducts, setCartContent}) {

    // intégration de la maquette
    // TODO Mise en page des données
    // récupération des éléments du panier du client
    // Calcul du total
    // Gestion des quantités des produits
    // Mettre les options comme dans la data et les afficher avec cette structure
    // TODO GÉRER L'AFFICHAGE DES PRODUITS EN FONCTION DE CE QU'ALINE M'ENVOIE (calcul du total + acces au produit)
    // Bouton Supprimer Extras

    const [showPaymentpart, setshowPaymentpart] = useState(false);
    const [methodePayment, setMethodePayment] = useState(' ');
    const [totalPrice, setTotalPrice] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [errors, setErrors] = useState({});

    const changeVisibility = (e) => {
        e.preventDefault();
        let formData = {
            payment_moyen: e.target["paiement_moyen"].value.trim(),
        }
        const formErrors = {};
        if(formData['payment_moyen'] === '') {
            formErrors['payment_moyen'] = true;
        }
        if(Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        }
        else {
            setshowPaymentpart(true);
        }
    }

    const calculTotalCart = () => {
        //console.log('calcul cart content');
        let total = 0;
        cartProducts.map((product) => {
            let totalProduitPersonalized = 0;
            totalProduitPersonalized += product.prix;
            let totalExtras = 0;
            product['prix des extras'].map(extra => totalExtras += extra.prix);
            product.productPersonalizedPrice = totalProduitPersonalized + totalExtras;
            total += (product['quantité'] * product.productPersonalizedPrice);
        });
        setTotalPrice(total);
    }

    const changeCartState = (choosedproductIndex, operation) => {
        let dubstbin = null;
        const newCartContent = cartProducts.map((product,i) => {
            if(i === choosedproductIndex){
                if (operation === 'decrease' ) {
                    if (product['quantité'] > 1) {
                        return  {...product, 'quantité': product['quantité'] - 1 };
                    }
                    else {
                        dubstbin = i;
                    }
                }
                else {
                    return  {...product, 'quantité': product['quantité'] + 1 }
                }
            }
            return  {...product};
        });

        if (dubstbin !== null) {
            newCartContent.splice(dubstbin, 1);
        }

        setCartContent(newCartContent);
        calculTotalCart();
    }

    const deleteExtra = (productId, extraName) => {
        let newExtralist = [];
        let newExtraPricelist = [];
        const newCartContent = cartProducts.map((product,i) => {
            if(i === productId){

                product['prix des extras'].map(extra => {
                    if(extra.nom !== extraName) {
                        newExtraPricelist.push(extra);
                    }
                });
                //*/

                product.options.extras.map(extra => {
                    if(extra !== extraName) {
                        newExtralist.push(extra);
                    }
                });

                product['prix des extras'] = newExtraPricelist;
                product.options.extras = newExtralist;
                //**/
            }
            return product;
        });
        setCartContent(newCartContent);
        //calculTotalCart();
    }

    useEffect(() => {
        calculTotalCart();
    }, );


    return (
        <>
            <div onClick={() => setShowCart(true)} className={style["cart-container"]}>
                <div className={style["quantity-container"]}>
                    {cartProducts.reduce((accumulator, currentValue) => accumulator + currentValue['quantité'],0)}
                </div>
                <div className={style["cart-icon"]}>
                    <img src={CartIcon} alt="icône panier" />
                </div>
            </div>

            {showCart && (
                <Modal setShowModal={setShowCart}>
                    {showPaymentpart ? (
                        <div>
                            <Payment setShowPaymentComponent={setshowPaymentpart} cartContent={cartProducts} methodePayment={methodePayment} />
                        </div>
                    ) :
                    (
                        <div className={style["container"]}>
                                <h1>Panier</h1>
                                <form onSubmit={changeVisibility} className={style["panier_details"]}>
                                        <div id={style["panier_produitslist"]}>
                                            {cartProducts.map((product, i) =>
                                                <div id={product.id} key={'product_'+i} className={style["panier_produit"]}>
                                                    <div className={style["panier_nomProduit"]}>
                                                        <img src={product.image} alt="produit"/>
                                                        <div className={style['panier_produitDetails']}>
                                                            <p>{product.nom}</p>

                                                            {product.options && (
                                                                <div className={style['panier_produitDetailsOptions']}>
                                                                    {Object.entries(product.options).map(([key, value]) => {
                                                                        if (key !== 'extras') {
                                                                            return (
                                                                                <div>{key[0].toUpperCase() + key.slice(1)}  :  <div>{value.map(itemValue => <p> {itemValue} </p>)}</div></div>
                                                                            );
                                                                        }
                                                                    })}
                                                                </div>
                                                            )}

                                                            {product.options.extras && (
                                                                <div className={style['panier_produitExtras']}>
                                                                    <div>
                                                                        {product.options.extras.map((extra,j) =>
                                                                            <div key={'extra_'+j} className={style['panier_produitSingleExtra']}>
                                                                                <button onClick={() => deleteExtra(i,extra)}>-</button>
                                                                                <p>Extra {extra}</p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <p>{product.productPersonalizedPrice * product['quantité']} €</p>
                                                        </div>
                                                    </div>
                                                    <div className={style["panier_produitQuantity"]}>
                                                            <div onClick={() => {changeCartState(i, 'decrease');}}>
                                                                -
                                                            </div>
                                                            <p>{product['quantité']}</p>
                                                            <div onClick={() => {changeCartState(i, 'increase');}}>
                                                            +
                                                            </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <hr/>

                                        <div className={style["panier_totalPrice"]}>
                                            <div>
                                                <p>Total</p>
                                                <p>{totalPrice} €</p>
                                            </div>
                                        </div>

                                        {totalPrice > 0 && (
                                            <div id={style["panier_payment"]}>
                                                <div className={style["panier_meanPayment"]}>
                                                    <input
                                                        type="radio" name="paiement_moyen"
                                                        value="carte-debit" id="carte-debit"
                                                        onChange={()=>{setMethodePayment("carte-debit")}}
                                                    />
                                                    <img src={carteCredit} alt="carte de crédit"/>
                                                    <label htmlFor="carte-debit">Débit ou crédit</label>
                                                </div>

                                                <div className={style["panier_meanPayment"]}>
                                                    <input
                                                        type="radio" name="paiement_moyen"
                                                        value="espece" id="espece"
                                                        onChange={()=>{setMethodePayment("espece")}}
                                                    />
                                                    <img src={especes} alt="carte de crédit"/>
                                                    <label htmlFor="espece" >En espèces</label>
                                                </div>
                                            </div>
                                        )}

                                        {errors.payment_moyen && (
                                            <div className={style['error_message']}>Veuillez choisir votre moyen de paiement </div>
                                        )}

                                        {totalPrice > 0 && (
                                            <button type="submit" className={style["btn_order"]}>Commander</button>
                                        )}

                                </form>
                        </div>
                    )}
                </Modal>
            )}
        </>
    )
}
