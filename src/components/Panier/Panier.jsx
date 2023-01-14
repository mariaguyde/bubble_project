import React, { useState } from 'react';
import './Panier.css';
import carteCredit from '../../assets/img/credit-card.svg';
import especes from '../../assets/img/money.png';

const Panier = () => {

    // TODO intégration de la maquette
    // TODO Mise en page des données
    // TODO récupération des éléments du panier du client
    // TODO persistance des infos du panier si possible


    const [itemQuantity, setItemQuantity] = useState(1);


    return (
        <div id="container">
            <h1>Panier</h1>
            <div id="panier_produitslist">
                {/*TODO Boucler sur la liste des éléments du panier*/}
                <div className="panier_produit">
                    <img src={especes} alt="produit"/>
                    <div className="panier_nomProduit">
                        <p>Nom du produit</p>
                        <p>Prix €</p>
                    </div>
                    <div className="panier_produitQuantite">
                        <div onClick={() => itemQuantity !== 0 ? setItemQuantity(itemQuantity - 1) : null}>
                            -
                        </div>
                        <p>{itemQuantity}</p>
                        <div onClick={() => setItemQuantity(itemQuantity + 1)}>
                           +
                        </div>
                    </div>
                </div>
            </div>

            <div id="panier_montantTotal">
                <div>
                    <p>Total</p>
                    <p>0.00$</p>
                </div>
                <hr></hr>
                <div>
                    <p>Total + taxes</p>
                    <p>0.00$</p>
                </div>
            </div>

            <div id="panier_paiement">
                <div id="panier_paiement--carteDebit" className="panier_moyenPaiement">
                    <input
                        type="radio"
                        name="paiement_carteDebit"
                        value="carte-debit"
                    />
                    <img src={carteCredit} alt="carte de crédit"/>
                    <p>Débit ou crédit</p>
                </div>
                <div id="panier_paiement--espece" className="panier_moyenPaiement">
                    <input
                        type="radio"
                        name="paiement_carteDebit"
                        value="espece"
                    />
                    <img src={especes} alt="carte de crédit"/>
                    <p>En comptant</p>
                </div>
            </div>
            <button className="btn_commander">Commander</button>

        </div>
    );
};

export default Panier;
