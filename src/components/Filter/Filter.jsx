import style from './Filter.module.css'
import { data } from '../../data/data';

export default function Filter({ name, isActive, selectedCategory, selectFilter, filterProducts }) {

  const onFilter = () => {
    selectFilter(name);

    if (name === "Tout") {
      filterProducts({ ...selectedCategory, products: data.catégories[selectedCategory.category][selectedCategory.subcategory]["produits"] });
      return
    }

    filterProducts({ ...selectedCategory, products: data.catégories[selectedCategory.category][selectedCategory.subcategory]["produits"].filter(product => product.type === name) });
  }
    ;
  return (
    <div className={isActive ? `${style["filter"]} ${style["filter--active"]}` : style["filter"]} onClick={onFilter}>
      {name}
    </div>
  )
}
