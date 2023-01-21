import style from './OptionInput.module.css'

export default function OptionInput({ id, name, value, priceInfo, multiple, isActive }) {
  return (
    <>
      {multiple ? <input className={style["input"]} id={id} type="checkbox" name={name} value={value} /> : <input className={style["input"]} id={id} type="radio" name={name} value={value} />}
      <label htmlFor={id} className={isActive ? `${style["option"]} ${style["option--active"]}` : style["option"]}>{value} {priceInfo && <span>- {priceInfo}</span>}</label>    
    </>
  )
}
