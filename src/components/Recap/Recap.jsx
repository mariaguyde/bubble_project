import style from "./Recap.module.css"
import { useNavigate } from "react-router-dom";
import baoImage from "../../assets/img/bao.png"
import RecapItem from "../RecapItem/RecapItem";
import { useParams, useLocation } from 'react-router-dom';

export default function Recap() {
    const { orderNumber } = useParams();
    const location = useLocation();
    const { cartContent, tableNumber } = location.state;
    const navigate = useNavigate();
    const goBackToHomePage = () => navigate("/")

    return (
        <div className={style["order-recap-page"]}>
            <div className={style["arrow-icon"]} onClick={goBackToHomePage}>
                <i className="bi bi-arrow-left"></i>
            </div>
            <div className={style["order-recap"]}>
                <div className={style["logo-container"]}>
                    <img src={baoImage} alt="image Bao" />
                </div>
                <div className={style["order-number"]}>Commande n°{orderNumber}</div>
                <div className={style["table-number"]}>Table n°{tableNumber}</div>
                <div className={style["separator"]}>~</div>
                <ul className={style["products-list"]}>
                    {cartContent.map((product, i) => <RecapItem key={i} productInfo={product} />)}
                </ul>
                <div className={style["order-total"]}><span>Montant total :</span> {cartContent.reduce((accumulator, currentValue) => accumulator + (currentValue['quantité'] * currentValue['prix']), 0).toFixed(2)}€</div>
            </div>
        </div>
    )
}