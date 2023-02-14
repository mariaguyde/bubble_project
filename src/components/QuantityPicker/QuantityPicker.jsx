import style from './QuantityPicker.module.css'

export default function QuantitySelector({ quantity, setQuantity, minimum }) {
  const modifyQuantity = (action) => {
    let minQuantity = 1;

    if (minimum !== undefined) {
      minQuantity = minimum;
    }

    if (action === "add") {
      if (quantity + 1 <= 5) {
        setQuantity(quantity + 1)
      }
      return
    }

    if (quantity - 1 >= minQuantity) {
      setQuantity(quantity - 1)
    }
  };

  return (
    <div className={style["quantity-picker-container"]}>
      <div onClick={() => modifyQuantity("subtract")} className={style["quantity-picker"]}>
        <span>
          -
        </span>
      </div>
      <div className={style["quantity"]}>{quantity}</div>
      <div onClick={() => modifyQuantity("add")} className={style["quantity-picker"]}>
        +
      </div>
    </div>
  )
}