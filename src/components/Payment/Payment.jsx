import { useNavigate } from "react-router-dom";
import style from './Payment.module.css';
import React, {useState} from 'react';

export default function Payment ({cartContent, methodePaiement, setShowPaymentComponent}) {

    const tableNumber =  Math.floor(Math.random() * (20 - 1 + 1) + 1);
    const commandNumber = Math.random().toString(36).substring(3,9).toUpperCase();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const goBackPreviousPage = () => {
        console.log('egege');
        setShowPaymentComponent(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = {};
        let formData = {
            nom: e.target["nom"].value.trim(),
            prenom: e.target["prenom"].value.trim(),
            mail: e.target["email"].value.trim(),
        }

        Object.keys(formData).forEach(key => {
            if(formData[key] === "") {
                formErrors[key] = true;
            }
            if (key == 'mail') {
                let regexMail = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                console.log(regexMail.test(formData.mail));
                if (regexMail.test(formData.mail) === false) {
                    formErrors[key] = true;
                }
            }
        });

        if (methodePaiement === "carte-debit") {
            // récupération des valeurs + gestion des erreurs des 3 autre champs
            formData = {...formData, carteCredit_number : e.target["carteCredit_number"].value, carteCredit_expirationDate : e.target["carteCredit_expirationDate"].value, carteCredit_cvc : e.target["carteCredit_cvc"].value}

            let regexExpirationDate = new RegExp(/^((0[1-9])|(1[0-2]))[\/\.\-]*((0[8-9])|(1[1-9]))$/);
            if (regexExpirationDate.test(formData.carteCredit_expirationDate) === false) {
                formErrors['carteCredit_expirationDate'] = true;
            }

            // 5114496353984312
            let regexMasterCard = new RegExp(/^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/);
            //console.log(regexMasterCard.test(formData.carteCredit_number));
            if (regexMasterCard.test(formData.carteCredit_number) === false) {
                formErrors['carteCredit_number'] = true;
            }

            let regexCVC = new RegExp(/^[0-9]{3,4}$/);
            if (regexCVC.test(formData.carteCredit_cvc) === false) {
                formErrors['carteCredit_cvc'] = true;
            }
        }

        console.log("DONNEES DU FORM", formData);
        console.log("ERREURS DU FORM", formErrors);
        if(Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        }
        else {
            setErrors({});
            navigate("/recapitulatif", {state: {
                cart: cartContent,
                orderNumber: commandNumber,
                tableNumber: tableNumber,
            }});
        }
    }

    return (
        <div id={style['payment_container']}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div onClick={goBackPreviousPage}>
                <i className="fa fa-arrow-left"></i>
            </div>
            <h1>Paiement</h1>
            <div id={style['payment_infos']}>
                {/*<div>
                    <p>
                        <span className="material-symbols-outlined">
                         confirmation_number
                        </span>
                        N° de votre commande : {commandNumber}
                    </p>
                    <p>
                        <span className="material-symbols-outlined">
                         table_restaurant
                        </span>
                        N° de votre table : {numeroTable}</p>
                </div>*/}
                {methodePaiement === 'carte-debit' && (<p>Veuillez renseigner les champs suivants afin de recevoir le récapitulatif de votre commande</p>)}
                {methodePaiement === 'espece' && (<p>Après avoir renseigné les champs suivants, merci de vous rendre au comptoir pour pouvoir payer votre commande. Vous recevrez suite à cela un mail avec votre récapitulatif de votre commande.</p>) }

            </div>

            <form onSubmit={handleSubmit} id={style["payment_form"]}>
                <div>
                    <label>Votre nom</label>
                    <input type="text"  name="nom" />
                    {errors.nom && (<div className={style['error_message']}>Veuillez renseignez votre nom</div>)}
                </div>
                <div>
                    <label>Votre prénom</label>
                    <input type="text"  name="prenom" />
                    {errors.prenom   && (<div className={style['error_message']}>Veuillez renseignez votre prénom</div>)}
                </div>
                <div>
                    <label>Votre adresse mail</label>
                    <input type="email" name="email" placeholder={'votreprenom@exemple.com'} />
                    {errors.mail && (<div className={style['error_message']}>
                        <p>Veuillez renseignez votre addresse mail en respectant le format demandé</p>
                    </div>)}
                </div>

                {methodePaiement === 'carte-debit' && (
                    <div>
                        <div>
                            <label>Votre numéro de carte de crédit</label>
                            <input name="carteCredit_number" placeholder={'5xxx xxxx xxxx xxxx'} />
                            {errors.carteCredit_number && (<div className={style['error_message']}>
                                <p>Veuillez renseignez votre numéro de carte de crédit en respectant le format demandé</p>
                            </div>)}
                        </div>
                        <div>
                            <label>CVC</label>
                            <input type="text" placeholder={"XXX (ex:512)"} name="carteCredit_cvc"/>
                            {errors.carteCredit_cvc && (<div className={style['error_message']}>
                                <p>Veuillez renseignez le code CVC de votre carte en respectant le format demandé</p>
                            </div>)}
                        </div>
                        <div>
                            <label>Date d'expiration de votre carte</label>
                            <input type="text" placeholder={'MM/AA (ex:01/08)'} name="carteCredit_expirationDate"/>
                        </div>
                        {errors.carteCredit_expirationDate && (<div className={style['error_message']}>
                            <p>Veuillez renseignez la date d'expiration de votre carte en respectant le format demandé</p>
                        </div>)}
                    </div>
                ) }
                <button className={style["btn_commander"]} type="submit">Valider</button>
            </form>
        </div>
    )
}
