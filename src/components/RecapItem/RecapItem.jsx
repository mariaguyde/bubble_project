import style from './RecapItem.module.css'

export default function RecapItem({ productInfo }) {
    const productOptions = Object.keys(productInfo.options).filter(option => option !== "extras");

    return (
        <li className={style["recap-item"]}>
            <div className={style["recap-item-info"]}>
                <div className={style["recap-item-name"]}>{productInfo.nom}</div>
                <ul className={style["item-options-list"]}>
                    {productOptions.map(option => productInfo.options[option]).filter(values => values.length > 0).map((values, i) => <li key={i} className={style["item-options-list__item"]}>
                        <span>{productOptions[i].charAt(0).toUpperCase() + productOptions[i].slice(1)}</span> : {values.join(", ")}</li>)}
                </ul>
                {productInfo.options.extras.map((extra, i) => (
                    <div key={i} className={style["extra-name"]}>
                       + Extra {extra.toLowerCase()} ({productInfo["prix des extras"][i].prix.toFixed(2)}€)
                    </div>))}
                <div className={style["recap-item-quantity"]}><span>Quantité :</span> {productInfo.quantité}</div>
                <div className={style["recap-item-price"]}><span>Prix :</span> {productInfo.prix.toFixed(2)}€</div>
            </div>
        </li>
    )
}