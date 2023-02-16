import style from "./CartItem.module.css"
import { useState, useEffect } from "react";
import QuantityPicker from "../QuantityPicker/QuantityPicker";

export default function CartItem({ productInfo, cartContent, setCartContent }) {
    const [productQuantity, setProductQuantity] = useState(productInfo.quantité);
    const productCartIndex = cartContent.findIndex(product => product.id === productInfo.id && JSON.stringify(product.options) === JSON.stringify(productInfo.options));

    const removeExtra = (extra) => {
        const extraIndex = productInfo.options.extras.findIndex(extraName => extraName === extra);

        const extras = [...productInfo.options.extras];
        extras.splice(extraIndex, 1);

        const extrasPrices = [...productInfo["prix des extras"]];
        extrasPrices.splice(extraIndex, 1);

        const newCart = [...cartContent];
        newCart.splice(productCartIndex, 1, { ...cartContent[productCartIndex], options: { ...cartContent[productCartIndex].options, extras: extras }, prix: cartContent[productCartIndex].prix - productInfo["prix des extras"][extraIndex].prix, "prix des extras": extrasPrices });
        setCartContent(newCart);
    };

    useEffect(() => {
        setProductQuantity(productInfo.quantité);
    }, [cartContent])

    useEffect(() => {
        const newCart = [...cartContent];

        if (productQuantity === 0) {
            newCart.splice(productCartIndex, 1);
            setCartContent(newCart);
            return;
        }

        newCart.splice(productCartIndex, 1, { ...cartContent[productCartIndex], quantité: productQuantity });
        setCartContent(newCart);
    }, [productQuantity])


    return (
        <div className={style["cart-product"]}>
            <img src={productInfo.image} alt={productInfo.nom} />
            <div className={style['cart-product-details']}>
                <p className={style["product-name"]}>{productInfo.nom}</p>

                <ul className={style['cart-product-details-options']}>
                    {Object.entries(productInfo.options).map(([key, value], i) => {
                        if (key !== 'extras') {
                            return (
                                <li key={i} className={style['cart-product-details-options__item']}><span>{key[0].toUpperCase() + key.slice(1)}</span>  : {value.join(", ")}</li>
                            );
                        }
                    })}
                </ul>

                {productInfo["prix des extras"].map((extra, i) =>
                    <div key={i} className={style['cart-product-single-extra']}>
                        <div className={style["remove-option"]} onClick={() => removeExtra(extra.nom)}>
                            <span>
                                -
                            </span>
                        </div>
                        <p className={style['cart-product-single-extra__name']}>Extra {extra.nom} - {extra.prix.toFixed(2)}€</p>
                    </div>
                )}

                <p className={style['cart-item-price']}>{(productInfo.quantité * productInfo.prix).toFixed(2)}€</p>
            </div>
            <QuantityPicker quantity={productQuantity} setQuantity={setProductQuantity} minimum={0} />
        </div>
    )
}
