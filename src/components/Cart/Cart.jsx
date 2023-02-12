import style from './Cart.module.css';
import CartIcon from "../../assets/img/basket.png";
import Modal from '../Modal/Modal';
import React, {useEffect, useState} from 'react';
import especes from "../../assets/img/money.png";
import carteCredit from "../../assets/img/credit-card.svg";
import Payment from "../Payment/Payment";

export default function Cart({cartProducts, setCartContent}) {

    // intégration de la maquette
    // TODO Mise en page des données
    // récupération des éléments du panier du client
    // Calcul du total
    // Gestion des quantités des produits
    // Mettre les options comme dans la data et les afficher avec cette structure
    // TODO GÉRER L'AFFICHAGE DES PRODUITS EN FONCTION DE CE QU'ALINE M'ENVOIE (calcul du total + acces au produit)
    // TODO BOUTON MOINS -> SUPPRIMER EXTRAS -> UPDATE TOTAL

    const [showCart, setShowCart] = useState(false);
    const [showPaymentpart, setshowPaymentpart] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [methodePaiement, setMethodePaiement] = useState(' ');
    const [errors, setErrors] = useState({});

    const changeVisibility = (e) => {
        e.preventDefault();
        let formData = {
            paiement_moyen: e.target["paiement_moyen"].value.trim(),
        }
        const formErrors = {};
        if(formData['paiement_moyen'] === '') {
            formErrors['paiement_moyen'] = true;
        }
        if(Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        }
        else {
            setshowPaymentpart(true);
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
        setTotalPrice(total);
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

        if (dubstbin !== null) {
            newCartContent.splice(dubstbin, 1);
        }

        setCartContent(newCartContent);
        calculTotalCart();
    }

    const deleteExtra = (productId, extraName) => {
        let newExtralist = [];
        const newCartContent = cartProducts.map((product,i) => {
            if(i === productId){
                product.options.multiple.extras.map(extra => {
                    if(extra[0] !== extraName) {
                        newExtralist.push(extra);
                    }
                });
                product.options.multiple.extras = newExtralist;
            }
            return product;
        });
        setCartContent(newCartContent);
    }

    useEffect(() => {
        calculTotalCart();
    }, );

    return (
        <>
            <div onClick={() => setShowCart(true)} className={style["cart-container"]}>
                <div className={style["quantity-container"]}>
                    {cartProducts.reduce((accumulator, currentValue) => accumulator + currentValue.quantity,0)}
                </div>
                <div className={style["cart-icon"]}>
                    <img src={CartIcon} alt="icône panier" />
                </div>
            </div>

            {showCart && (
                <Modal setShowModal={setShowCart}>
                    {showPaymentpart ? (
                        <div>
                            <Payment setShowPaymentComponent={setshowPaymentpart} cartContent={cartProducts} methodePaiement={methodePaiement} />
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
                                                            <p>{product.name}</p>
                                                            {product.options.unique.taille && (
                                                                 <p>{product.options.unique.taille[0][0]}</p>
                                                            )}
                                                            {product.options.unique["sauce piquante"] && (
                                                                <p>{product.options.unique["sauce piquante"] === "Oui" ? "Avec sauce piquante" : "Sans sauce piquante" }</p>
                                                            )}

                                                            {product.options.multiple.extras && (
                                                                <div className={style['panier_produitExtras']}>
                                                                    <div >
                                                                        {product.options.multiple.extras.map((extra,j) =>
                                                                            <div key={'extra_'+j} className={style['panier_produitSingleExtra']}>
                                                                                <button onClick={() => deleteExtra(i,extra[0] )}>-</button>
                                                                                <p>Extra {extra[0]}</p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <p>{product.productPersonalizedPrice * product.quantity} €</p>
                                                        </div>
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
                                                <p>{totalPrice} €</p>
                                            </div>
                                        </div>

                                        <div id={style["panier_paiement"]}>
                                            <div className={style["panier_moyenPaiement"]}>
                                                <input
                                                    type="radio" name="paiement_moyen"
                                                    value="carte-debit" id="carte-debit"
                                                    onChange={()=>{setMethodePaiement("carte-debit")}}
                                                />
                                                <img src={carteCredit} alt="carte de crédit"/>
                                                <label htmlFor="carte-debit">Débit ou crédit</label>
                                            </div>

                                            <div className={style["panier_moyenPaiement"]}>
                                                <input
                                                    type="radio" name="paiement_moyen"
                                                    value="espece" id="espece"
                                                    onChange={()=>{setMethodePaiement("espece")}}
                                                />
                                                <img src={especes} alt="carte de crédit"/>
                                                <label htmlFor="espece" >En espèces</label>
                                            </div>
                                        </div>

                                        {errors.paiement_moyen && (
                                            <div className={style['error_message']}>Veuillez choisir votre moyen de paiement </div>
                                        )}
                                        <button type="submit" className={style["btn_commander"]}>Commander</button>
                                </form>
                        </div>
                    )}
                </Modal>
            )}
        </>
    )
}
