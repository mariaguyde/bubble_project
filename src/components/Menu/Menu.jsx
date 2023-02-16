import style from "./Menu.module.css"
import { data } from "../../data/data"
import MenuCategory from "../MenuCategory/MenuCategory"
import ProductCard from "../ProductCard/ProductCard"
import Filter from "../Filter/Filter"
import Cart from "../Cart/Cart"
import LogoBubulle from "../../assets/svg/bu.svg"
import { useState } from "react"

export default function Menu() {
    const [selectedCategory, setSelectedCategory] = useState({ category: "boissons", subcategory: "", products: Object.keys(data.catégories["boissons"]).map(subcategory => data.catégories["boissons"][subcategory]["produits"]).flat() });
    const [selectedFilter, setSelectedFilter] = useState("");
    const [cart, setCart] = useState([]);

    return (
        <div className={style["menu"]}>
            <div className={style["menu-sidebar"]}>
                <div className={style["menu-logo"]}>
                    <img src={LogoBubulle} alt="Logo Bubulle" />
                </div>
                <div className={style["menu-categories-title"]}>Catégories</div>
                <ul className={style["menu-categories"]}>
                    {Object.keys(data.catégories).map((category, i) => <MenuCategory key={i} name={category} isActive={selectedCategory.category === category} selectedCategory={selectedCategory} selectCategory={setSelectedCategory} setFilter={setSelectedFilter} />)}
                </ul>
                <div className={style["menu-signature"]}>Made with ❤️ <br /> by Yolène CONSTABLE, Aline HY & Maria GUY DE FONTGALLAND</div>
            </div>
            <div className={style["menu-gallery"]}>
                {selectedCategory.subcategory && (
                    <div className={style["filters-container"]}>
                        {data.catégories[selectedCategory.category][selectedCategory.subcategory]["filtres"].map((filterName, i) => <Filter key={i} name={filterName} isActive={selectedFilter === filterName} selectedCategory={selectedCategory} filterProducts={setSelectedCategory} selectFilter={setSelectedFilter} />)}
                    </div>
                )}
                <div className={style["product-cards-container"]}>
                    {selectedCategory.products.map((product, i) => <ProductCard key={i} productDetails={product} addToCart={setCart} cart={cart} selectedCategory={selectedCategory}/>)}
                </div>
                <Cart cartProducts={cart} setCartContent={setCart} />
            </div>
        </div>
    )
}
