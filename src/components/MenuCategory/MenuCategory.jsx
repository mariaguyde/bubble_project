import style from './MenuCategory.module.css'
import MenuSubcategory from '../MenuSubcategory/MenuSubcategory';
import { data } from "../../data/data"


export default function MenuCategory({ name, isActive, selectedCategory, selectCategory, setFilter }) {

  const onSelectCategory = () => selectCategory({ category: name, subcategory: "", products: Object.keys(data.catégories[name]).map(subcategory => data.catégories[name][subcategory]["produits"]).flat() });
  const onSelectSubcategory = (subcategoryName) => {
    selectCategory({ ...selectedCategory, subcategory: subcategoryName, products: data.catégories[name][subcategoryName]["produits"] });
    setFilter("Tout");
  };

  return (
    <li className={style["menu-categories-item"]}>
      <div className={style["menu-category"]}>
        {isActive && <div className={style["selector"]}></div>}
        <div onClick={onSelectCategory} className={style["menu-category__text"]}>{name}</div>
      </div>
      {isActive && (
        <ul className={style["menu-subcategories"]}>
          {Object.keys(data.catégories[name]).map((subcategoryName, i) => <MenuSubcategory key={i} name={subcategoryName} isActive={selectedCategory.subcategory === subcategoryName} selectSubcategory={() => onSelectSubcategory(subcategoryName)} />)}
        </ul>
      )}
    </li>
  )
}
