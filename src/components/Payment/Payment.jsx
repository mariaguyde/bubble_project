import style from './Payment.module.css';
import React from 'react';

export default function Payment ({cartContent}) {

    return (
        <div>
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
            </div>
            <button>Valider</button>
        </div>
    )
}
