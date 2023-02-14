import React, { useState } from "react";
import style from "./SelectableInput.module.css";

function SelectableInput({ id, title, name, price, type, onclick }) {

  return (
      <>
        <input className={style["selected"]} id={id} type={type} value={title} name={name}/>
        <label className={style["checkbox__state-notchecked"]} htmlFor={id} onClick={onclick ? onclick : () => {}}>
          
          {title}
          
          {price && <span className={style["price-attribute"]}>&nbsp;- {price}</span>}
     
        </label>
      </>
  );
}

export default SelectableInput;
