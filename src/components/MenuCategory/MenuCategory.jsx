import style from './MenuCategory.module.css'
import CategoryVariety from '../CategoryVariety/CategoryVariety';
import { data } from "../../data/data"


export default function MenuCategory({ name, categoryVarieties, isActive, selectedCategory, selectCategory }) {

  return (
    <li className={style["menu-categories-item"]}>
      <div className={style["menu-category"]}>
        {isActive && <div className={style["selector"]}></div>}
        <div onClick={() => selectCategory({ category: name, categoryVariety: "", products: Object.keys(data.catégories[name]).map(categoryVariety => data.catégories[name][categoryVariety]["produits"]).flat()})} className={style["menu-category__text"]}>{name}</div>
      </div>
      {isActive && (
        <ul className={style["category-varieties"]}>
          {categoryVarieties.map((categoryVarietyName, i) => <CategoryVariety key={i} name={categoryVarietyName} isActive={selectedCategory.categoryVariety === categoryVarietyName} selectCategoryVariety={() => selectCategory({ ...selectedCategory, categoryVariety: categoryVarietyName, products: data.catégories[name][categoryVarietyName]["produits"]})} />)}
        </ul>
      )}
    </li>
  )
}
