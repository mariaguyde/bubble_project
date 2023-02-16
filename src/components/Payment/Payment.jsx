import { useNavigate } from "react-router-dom";
import style from './Payment.module.css';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';


export default function Payment({ cartContent, paymentMethod, setShowPaymentComponent }) {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const tableNumber = Math.floor(Math.random() * (20 - 1 + 1) + 1);
    const orderNumber = Math.random().toString(36).substring(3, 9).toUpperCase();
    const orderRecap = [cartContent.map(product => `Produit : ${product.nom} \n${Object.entries(product.options).map(option => `${option[0].charAt(0).toUpperCase() + option[0].slice(1)} : ${option[1].length > 0 ? option[1].join(", ") : "Aucun"}`).join("\n")}\nQuantité : ${product.quantité}\nPrix : ${product.prix.toFixed(2)}€\n${product.options.extras.length > 0 ? `Prix des extras : ${product.options.extras.map((extra, i) => `${extra} - ${product["prix des extras"][i].prix.toFixed(2)}€`).join(", ")}` : ""}\n\n-----\n\n`).join(""), `Montant total : ${cartContent.reduce((accumulator, currentValue) => accumulator + (currentValue['quantité'] * currentValue['prix']), 0).toFixed(2)}€`].join("");
    const form = useRef();

    const goBackToCart = () => {
        setShowPaymentComponent(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = {};

        let formData = {
            lastName: e.target["last-name"].value.trim(),
            firstName: e.target["first-name"].value.trim(),
            mail: e.target["mail"].value.trim(),
        }

        Object.keys(formData).forEach(key => {
            if (formData[key] === "" || key === "mail" && !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formData.mail)) {
                formErrors[key] = true;
            }
        });

        if (paymentMethod === "card") {
            // récupération des valeurs + gestion des erreurs des 3 autre champs
            formData = { ...formData, cardNumber: e.target["card-number"].value, expiryDate: e.target["expiry-date"].value, cvc: e.target["cvc"].value }

            if (!/^((0[1-9])|(1[0-2]))[\/\.\-]*((0[8-9])|(1[1-9]))$/.test(formData.expiryDate)) {
                formErrors['expiryDate'] = true;
            }

            // 5114496353984312
            if (!/^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/.test(formData.cardNumber)) {
                formErrors['cardNumber'] = true;
            }

            if (!/^[0-9]{3,4}$/.test(formData.cvc)) {
                formErrors['cvc'] = true;
            }
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            navigate(`/order-recap/${orderNumber}`, { state: { cartContent, tableNumber } })
            sendEmail();
        }
    }

    const sendEmail = () => {
        emailjs.sendForm('service_zkcmmvy', 'template_hg10m1i', form.current, 'UXRnVF4HinCc3ncEk')
            .then((result) => {

            }, (error) => {
                console.error(error);
            });
    };


    return (
        <div className={style['payment-container']}>
            <div className={style["arrow-icon"]} onClick={goBackToCart}>
                <i className="bi bi-arrow-left"></i>
            </div>

            <h1>Paiement</h1>

            <div className={style['payment-info']}>
                {paymentMethod === 'card' ? <p className={style["payment-info__text"]}>Veuillez renseigner les champs suivants avant de procéder au paiement. </p> : <p className={style["payment-info__text"]}>Renseignez les champs suivants et rendez-vous au comptoir pour payer votre commande.</p>}
            </div>

            <form ref={form} onSubmit={handleSubmit} className={style["payment-form"]}>
                <div className={style["input-container"]}>
                    <label htmlFor="last-name">Nom</label>
                    <input type="text" name="last-name" id="last-name" />
                    {errors.lastName && (<div className={style['error-message']}>Veuillez renseigner votre nom.</div>)}
                </div>
                <div className={style["input-container"]}>
                    <label htmlFor="first-name">Prénom</label>
                    <input type="text" name="first-name" id="first-name" />
                    {errors.firstName && (<div className={style['error-message']}>Veuillez renseigner votre prénom.</div>)}
                </div>
                <div className={style["input-container"]}>
                    <label htmlFor="mail">Adresse mail</label>
                    <input type="email" name="mail" id="mail" placeholder='votreprenom@exemple.com' />
                    {errors.mail && (<div className={style['error-message']}>
                        <p>Veuillez renseigner votre adresse mail.</p>
                    </div>)}
                </div>

                <div className={style["recap"]}>
                    <textarea name="recap" value={orderRecap} hidden readOnly></textarea>
                    <input type="text" name="order-number" value={orderNumber} hidden readOnly />
                    <input type="text" name="table-number" value={tableNumber} hidden readOnly />
                </div>

                {paymentMethod === 'card' && (
                    <div className={style["card-info-container"]}>
                        <div className={style["input-container"]}>
                            <label htmlFor="card-number">Numéro de carte</label>
                            <input name="card-number" id="card-number" placeholder={'5xxx xxxx xxxx xxxx'} />
                            {errors.cardNumber && (<div className={style['error-message']}>
                                <p>Veuillez renseigner votre numéro de carte de crédit.</p>
                            </div>)}
                        </div>
                        <div className={style["input-container"]}>
                            <label htmlFor="cvc">CVC</label>
                            <input type="text" id="cvc" placeholder={"xxx (ex: 512)"} name="cvc" />
                            {errors.cvc && (<div className={style['error-message']}>
                                <p>Veuillez renseigner le code CVC de votre carte.</p>
                            </div>)}
                        </div>
                        <div className={style["input-container"]}>
                            <label htmlFor="expiry-date">Date d'expiration</label>
                            <input type="text" id="expiry-date" placeholder={'MM/AA (ex: 01/08)'} name="expiry-date" />
                            {errors.expiryDate && (<div className={style['error-message']}>
                                <p>Veuillez renseigner la date d'expiration de votre carte.</p>
                            </div>)}
                        </div>
                    </div>
                )}

                <button className={style["btn-order"]} type="submit">Valider</button>
            </form>
        </div>
    )
}