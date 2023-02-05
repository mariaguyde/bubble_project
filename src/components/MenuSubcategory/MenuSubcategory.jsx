import style from './MenuSubcategory.module.css'

export default function MenuSubcategory({ name, isActive, selectSubcategory }) {
  return (
    <li onClick={selectSubcategory} className={isActive ? `${style["menu-subcategories-item"]} ${style["menu-subcategories-item--active"]}` : style["menu-subcategories-item"]}>{name}</li>
  )
}
