import style from './Payment.module.css';
import React, {useState} from 'react';

export default function Payment ({cartContent, methodePaiement,commandNumber, numeroTable}) {

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = {
            nom: e.target["nom"].value.trim(),
            prenom: e.target["prenom"].value.trim(),
            mail: e.target["email"].value.trim(),
        }

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

        if (methodePaiement === "carte-debit") {
            // récupération des valeurs + gestion des erreurs des 3 autre champs
            formData = {...formData, carteCredit_number : e.target["carteCredit_number"].value, carteCredit_expirationDate : e.target["carteCredit_expirationDate"].value, carteCredit_cvc : e.target["carteCredit_cvc"].value}

            let regexExpirationDate = new RegExp(/^((0[1-9])|(1[0-2]))[\/\.\-]*((0[8-9])|(1[1-9]))$/);
            if (regexExpirationDate.test(formData.carteCredit_expirationDate) === false ) {
                formErrors['carteCredit_expirationDate'] = true;
            }

            // 5114496353984312
            let regexMasterCard = new RegExp(/^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/);
            //console.log(regexMasterCard.test(formData.carteCredit_number));
            if (regexMasterCard.test(formData.carteCredit_number) === false ) {
                formErrors['carteCredit_number'] = true;
            }

            let regexCVC = new RegExp(/^[0-9]{3,4}$/);
            if (regexCVC.test(formData.carteCredit_cvc) === false ) {
                formErrors['carteCredit_cvc'] = true;
            }
        }

        console.log("DONNEES DU FORM", formData);
        console.log("ERREURS DU FORM", formErrors);
        if(Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return
        }
        setErrors({});
        // TODO Redirige vers le recap (facture) usenavigate devrait faire le taff


    }

    return (
        <div>
            <h1>Paiement</h1>
            <div>
                <p>N° de votre commande : {commandNumber}</p>
                <p>N° de votre table : {numeroTable}</p>
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
                    {errors.mail && (<div>
                        <p>Veuillez renseignez votre addresse mail</p>
                        <p>
                            Votre adresse mail doit respecter le format suivant : <br/>
                            votreprenom@exemple.com
                        </p>
                    </div>)}
                </div>

                {methodePaiement === 'espece' && (<p>Veuillez vous rendre au comptoir pour pouvoir payer votre commande.</p>) }
                {methodePaiement === 'carte-debit' && (
                    <div>
                        <div>
                            <label>Votre numéro de carte de crédit</label>
                            <input name="carteCredit_number"/>
                            {errors.carteCredit_number && (<div>
                                <p>Veuillez renseignez votre numéro de carte de crédit</p>
                                <p>
                                    Votre numéro de carte de crédit doit respecter le format suivant : <br/>
                                    5xxx xxxx xxxx xxxx
                                </p>
                            </div>)}
                        </div>
                        <div>
                            <label>CVC</label>
                            <input type="text"  name="carteCredit_cvc"/>
                            {errors.carteCredit_cvc && (<div>
                                <p>Veuillez renseignez le code CVC de votre carte</p>
                                <p>
                                    Le code CVC de votre carte de crédit doit respecter le format suivant:
                                    XXX (ex:512)<br/>
                                    Il est composé de 3 chiffres habituellement.
                                </p>
                            </div>)}
                        </div>
                        <div>
                            <label>Date d'expiration de votre carte</label>
                            <input type="text" name="carteCredit_expirationDate"/>
                        </div>
                        {errors.carteCredit_expirationDate && (<div>
                            <p>Veuillez renseignez la date d'expiration de votre carte</p>
                            <p>
                                La date d'expiration de votre carte doit respecter le format suivant : <br/>
                                MM/AA (ex:01/08)
                            </p>
                        </div>)}
                    </div>
                ) }
                <button type="submit">Valider</button>
            </form>
        </div>
    )
}
