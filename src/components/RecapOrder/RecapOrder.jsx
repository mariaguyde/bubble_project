import style from './RecapOrder.module.css';
import { useLocation } from "react-router-dom";
import React from 'react';

export default function RecapOrder () {

    const location = useLocation();
    console.log(location.state);

    return (
        <div>Récapitulatif de votre commande</div>
    )
}
