import style from './CategoryVariety.module.css'

export default function CategoryVariety({ name, isActive, selectCategoryVariety }) {
  return (
    <li onClick={selectCategoryVariety} className={isActive ? `${style["category-varieties-item"]} ${style["category-varieties-item--active"]}`: style["category-varieties-item"]}>{name}</li>
  )
}
