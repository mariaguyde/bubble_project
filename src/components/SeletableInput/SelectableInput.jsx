import style from "./SelectableInput.module.css";
import { useRef } from "react";

function SelectableInput({ id, title, name, price, type, showAllergens, productPrice, setProductPrice }) {
  const input = useRef();

  const actualizeProductPrice = (e, inputType) => {
    switch (inputType) {
      case "radio":
        const uniqueOptionPrice = {};

        uniqueOptionPrice[name] = [price]
        setProductPrice({ ...productPrice, ...uniqueOptionPrice })
        break;

      case "checkbox":
        const currentMultipleOptionPrices = productPrice[name];

        if (e.target.checked) {
          const newMultipleOptionPrices = {};
          newMultipleOptionPrices[name] = [...currentMultipleOptionPrices, price];

          setProductPrice({ ...productPrice, ...newMultipleOptionPrices });
          return
        }

        const newMultipleOptionPrices = {};
        const priceToDelete = currentMultipleOptionPrices.findIndex(optionPrice => optionPrice === price);
        currentMultipleOptionPrices.splice(priceToDelete, 1);
        newMultipleOptionPrices[name] = currentMultipleOptionPrices;

        setProductPrice({ ...productPrice, ...newMultipleOptionPrices });
        break;

      default:
        break;
    }
  }

  return (
    <>
      <input {...(setProductPrice && {
        onChange: (e
        ) => actualizeProductPrice(e, type)
      })} ref={input} className={style["option-input"]} id={id} type={type} value={title} name={name} />
      <label className={style["option-label"]} htmlFor={id} {...(showAllergens && { onClick: showAllergens })}>
        {title}
        {price && <span className={style["price-attribute"]}>&nbsp;- {price}</span>}
      </label>
    </>
  );
}

export default SelectableInput;
