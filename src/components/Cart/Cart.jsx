import style from './Cart.module.css';
import CartIcon from "../../assets/img/basket.png";
import Modal from '../Modal/Modal';
import React, {useEffect, useState} from 'react';
import especes from "../../assets/img/money.png";
import carteCredit from "../../assets/img/credit-card.svg";
import Payment from "../Payment/Payment";

export default function Cart({ cartProducts, setCartContent }) {

    // intégration de la maquette
    // TODO Mise en page des données
    // récupération des éléments du panier du client
    // Calcul du total
    // Gestion des quantités des produits
    // Mettre les options comme dans la data et les afficher avec cette structure
    // TODO Component Quantity Picker à mettre en place quand j'ai fini la page paiement (vu que cest prioritaire)
    const tableNumber =  Math.floor(Math.random() * (20 - 1 + 1) + 1);
    const [showCart, setShowCart] = useState(false);
    const [prixTotal, setPrixTotal] = useState(0);
    const [methodePaiement, setMethodePaiement] = useState(' ');
    const [showPaymentpart, setshowPaymentpart] = useState('none');
    const [showCartDetails, setShowCartDetails] = useState('block');
    const [commandNumber, setCommandNumber] = useState('block');

    const changeVisibility = () => {
        if (methodePaiement !== ' ') {
            setCommandNumber(Math.random().toString(36).substring(3,9).toUpperCase());
            setShowCartDetails("none");
            setshowPaymentpart("block");
        }
    }

    const calculTotalCart = () => {
        let total = 0;
        cartProducts.map((product) => {
            let totalProduitPersonnalise = 0;

            if (product.options.unique.taille) {
                totalProduitPersonnalise += product.options.unique.taille[0][1];
            }
            else {
                totalProduitPersonnalise += product.prix;
            }
            let totalExtras = 0;
            product.options.multiple.extras.map(extra => totalExtras += extra[1]);
            product.productPersonalizedPrice = totalProduitPersonnalise + totalExtras;
            total += (product.quantity * product.productPersonalizedPrice);
        });
        setPrixTotal(total);
    }

    const changeCartState = (choosedproductIndex, operation) => {
        let dubstbin = null;
        const newCartContent = cartProducts.map((product,i) => {
            if(i === choosedproductIndex){
                if (operation === 'decrease' ) {
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
                    <div className={style["container"]} style={{display: showCartDetails}}>
                        <h1>Panier</h1>
                        <div className={style["panier_details"]}>
                            <div id={style["panier_produitslist"]}>
                                {cartProducts.map((product, i) =>
                                    <div id={product.id} key={'product_'+i} className={style["panier_produit"]}>
                                        <img src={product.image} alt="produit"/>
                                        <div className={style["panier_nomProduit"]}>
                                            <p>{product.name}</p>
                                            {product.options.unique.taille && (
                                                <p>{product.options.unique.taille[0][0]}</p>
                                            )}
                                            {product.options.unique["sauce piquante"] && (
                                                <p>{product.options.unique["sauce piquante"] === "Oui" ? "Avec sauce piquante" : "Sans sauce piquante" }</p>
                                            )}

                                            {product.options.multiple.extras && (
                                                <p> Extra(s) :  {product.options.multiple.extras.map(extra => extra[0] + " ")} </p>
                                            )}

                                            <p>{product.productPersonalizedPrice * product.quantity} €</p>
                                        </div>
                                        <div className={style["panier_produitQuantite"]}>
                                            <div onClick={() => {changeCartState(i, 'decrease');}}>
                                                -
                                            </div>
                                            <p>{product.quantity}</p>
                                            <div onClick={() => {changeCartState(i, 'increase');}}>
                                                +
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <hr/>
                            <div className={style["panier_montantTotal"]}>
                                <div>
                                    <p>Total</p>
                                    <p>{prixTotal} €</p>
                                </div>
                            </div>

                            <div id={style["panier_paiement"]}>
                                <div className={style["panier_moyenPaiement"]}>
                                    <input
                                        type="radio"
                                        name="paiement_moyen"
                                        value="carte-debit"
                                        id="carte-debit"
                                        onChange={()=>{setMethodePaiement("carte-debit")}}
                                    />
                                    <img src={carteCredit} alt="carte de crédit"/>
                                    <label htmlFor="carte-debit">Débit ou crédit</label>
                                </div>
                                <div className={style["panier_moyenPaiement"]}>
                                    <input
                                        type="radio"
                                        name="paiement_moyen"
                                        value="espece"
                                        id="espece"
                                        onChange={()=>{setMethodePaiement("espece")}}
                                    />
                                    <img src={especes} alt="carte de crédit"/>
                                    <label htmlFor="espece" >En espèces</label>
                                </div>
                            </div>

                            {methodePaiement === ' ' && (
                                <div>Veuillez choisir votre moyen de paiement </div>
                            )}


                            <button onClick={changeVisibility} className={style["btn_commander"]}>Commander</button>
                        </div>
                    </div>


                    <div style={{display: showPaymentpart}}>
                        <Payment commandNumber = {commandNumber} cartContent={cartProducts} numeroTable={tableNumber} methodePaiement={methodePaiement} />
                    </div>
                </Modal>
            )}
        </>
    )
}
