import style from './Filter.module.css'
import { data } from '../../data/data';

export default function Filter({ name, isActive, selectedCategory, selectFilter, filterProducts }) {
  return (
    <div className={isActive ? `${style["filter"]} ${style["filter--active"]}` : style["filter"]} onClick={() => {
      selectFilter(name);
      filterProducts({ ...selectedCategory, products: data.catégories[selectedCategory.category][selectedCategory.categoryVariety]["produits"].filter(product => product.type === name) });
    }}>
      {name}
    </div>
  )
}
