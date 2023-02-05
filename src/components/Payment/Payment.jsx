import style from './Payment.module.css';
import React from 'react';

export default function Payment ({cartContent, methodePaiement}) {
    console.log(methodePaiement);
    return (
        <div>
            <h1>Paiement</h1>
            <div>
                <p>N° de votre commande : À GENERER LE NUM</p>
            </div>
            <p>Veuillez renseigner les champs suivants afin de recevoir le récapitulatif de votre commande</p>

            <div id={style["form"]}>
                <div>
                    <label>Votre nom</label>
                    <input type="text" placeholder="ex : Cauchet" name="nom"/>
                </div>
                <div>
                    <label>Votre prénom</label>
                    <input type="text" placeholder="ex : Marion" name="prenom"/>
                </div>
                <div>
                    <label>Votre adresse mail</label>
                    <input type="text" placeholder="ex : marioncauchet@test.com" name="mail"/>
                </div>

                {methodePaiement === 'especes' && (<p>Veuillez vous rendre au comptoir pour pouvoir payer votre commande.</p>) }
                {methodePaiement === 'carte-debit' && (
                    <div>
                        <div>
                            <label>Votre numéro de carte de crédit</label>
                            <input type="number" name="carteCredit_number"/>
                        </div>
                        <div>
                            <label>CVC</label>
                            <input type="text" name="carteCredit_cvc"/>
                        </div>
                        <div>
                            <label>Date d'expiration de votre carte</label>
                            <input type="text" name="carteCredit_expirationDate"/>
                        </div>
                    </div>
                ) }
            </div>
            <button>Valider</button>
        </div>
    )
}
