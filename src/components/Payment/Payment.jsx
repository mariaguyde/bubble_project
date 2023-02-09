import style from './Payment.module.css';
import React, {useState} from 'react';

export default function Payment ({cartContent, methodePaiement,commandNumber}) {

    const [inputValues, setInputValue] = useState({
        nom: "",
        prenom: "",
        mail: "",
    });
    const [errors, setErrors] = useState({});


    // TODO GENERER LE NUMERO DE LA TABLE DU CLIENT (1 - 20)
    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = {
            nom: e.target["nom"].value.trim(),
            prenom: e.target["prenom"].value.trim(),
            mail: e.target["email"].value.trim(),
        }

        if (methodePaiement === "carte-debit") {
            // récupération des valeurs + gestion des erreurs des 3 autre champs
            formData = {...formData, carteCredit_number : e.target["carteCredit_number"].value, carteCredit_expirationDate : e.target["carteCredit_expirationDate"].value, carteCredit_cvc : e.target["carteCredit_cvc"].value}
            console.log(formData);

            /*
            if (inputValues.mail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null) {
                errors.mail = false;
            }
            else {
                errors.mail = true;
            }
            //*/
        }

        console.log("DONNEES DU FORM", formData);

        const formErrors = {};
        Object.keys(formData).forEach(key => {
            if(formData[key] === "") {
                formErrors[key] = true;
            }
            if (key == 'mail') {
                //console.log(formData.mail?.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
                formErrors[key] = formData.mail?.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null;
            }
        });

        console.log(formErrors);
        if(Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return
        }


        setErrors({});
        // TODO Redirige vers le recap (facture) usenavigate devrait faire le taff

        /*
        // verif si le format du mail est respecté
        if (inputValues.mail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null) {
            errors.mail = false;
        }
        else {
            errors.mail = true;
        }

        // date expiration carte de crédit
        errors.carteCredit_expirationDate = inputValues.carteCredit_expirationDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/) !== null ? false : true;

        setErrors(errors);
        console.log('après');
        console.log(errors);
        */
    }


    return (
        <div>
            <h1>Paiement</h1>
            <div>
                <p>N° de votre commande : {commandNumber}</p>
            </div>
            <p>Veuillez renseigner les champs suivants afin de recevoir le récapitulatif de votre commande</p>

            <form onSubmit={handleSubmit} id={style["form"]}>
                <div>
                    <label>Votre nom</label>
                    <input type="text"  name="nom" />
                    {errors.nom && (<p>Veuillez renseignez votre nom</p>)}
                </div>
                <div>
                    <label>Votre prénom</label>
                    <input type="text"  name="prenom" />
                    {errors.prenom   && (<p>Veuillez renseignez votre prénom</p>)}
                </div>
                <div>
                    <label>Votre adresse mail</label>
                    <input type="email" name="email"  />
                    {errors.mail && (<p>Veuillez renseignez votre addresse mail</p>)}
                </div>

                {methodePaiement === 'espece' && (<p>Veuillez vous rendre au comptoir pour pouvoir payer votre commande.</p>) }
                {methodePaiement === 'carte-debit' && (
                    <div>
                        <div>
                            <label>Votre numéro de carte de crédit</label>
                            <input name="carteCredit_number"  placeholder="Card Number"/>
                        </div>
                        <div>
                            <label>CVC</label>
                            <input type="text"  name="carteCredit_cvc"/>
                        </div>
                        <div>
                            <label>Date d'expiration de votre carte</label>
                            <input type="text" name="carteCredit_expirationDate"/>
                        </div>
                    </div>
                ) }
                <button type="submit">Valider</button>
            </form>
        </div>
    )
}
