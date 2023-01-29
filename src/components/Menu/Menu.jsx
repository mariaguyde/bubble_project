import style from "./Menu.module.css"
import { data } from "../../data/data"
import MenuCategory from "../MenuCategory/MenuCategory"
import ProductCard from "../ProductCard/ProductCard"
import Filter from "../Filter/Filter"
import Cart from "../Cart/Cart"
import LogoBubulle from "../../assets/svg/bu.svg"
import { useState, useEffect } from "react"

export default function Menu() {
    const [selectedCategory, setSelectedCategory] = useState({ category: "boissons", categoryVariety: "", products: Object.keys(data.catégories["boissons"]).map(categoryVariety => data.catégories["boissons"][categoryVariety]["produits"]).flat() });
    const [selectedFilter, setSelectedFilter] = useState("");

    // Note de Maria : l'initialState a été défini par défaut pour que je puisse faire le panier
    // TODO Vider l'initialState une fois que l'ajout d'un produit au panier est fait
    const [cartContent,setCartContent ] = useState(
    [
        {
            id:1,
            name:'Bubble Tea Brown Sugar',
            image: require("../../assets/img/coco-strawberry-latte.png"),
            price:9,
            quantity:1,
            options : {
                        the : 'Vert',
                        bulles : 'Tapioca',
                        lait : 'Amande',
                        taille : "Petit",
                        température: ["Froid"],
                        "taux de sucre": "Moyen",
            },
            extras : [],
        },
        {
            id:2,
            name:'Bubble Tea Fraise',
            image: require("../../assets/img/coco-strawberry-latte.png"),
            price:4, // mettre le prix correspondant à la taille du BBT
            quantity:2,
            options : {
                the : 'Noir',
                bulles : 'Aucune bulles',
                taille : "Petit",
            },
            extras : [],
        },
        {
            id:3,
            type: "Boeuf",
            name:'Wrap Boeuf',
            image: require("../../assets/img/banhmi-viande.png"),
            price:4,
            quantity:3,
            options : {
                legumes : ['Concombre', 'Carotte', "Oignon rouge"],
                sauce_piquante : "Non"
            },
            extras : ["Carotte"],
        },
        {
            id:4,
            type: "Poulet",
            name:'Banh Mi Poulet',
            image: require("../../assets/img/banhmi-viande.png"),
            price:4,
            quantity:3,
            options : {
                sauce_piquante : "Oui"
            },
            extras : ["Carotte", "Concombre"],
        }
    ]);

    useEffect(() => {
        if(selectedFilter) setSelectedFilter("");
    }, [selectedCategory.category, selectedCategory.categoryVariety])

    return (
        <div className={style["menu"]}>
            <div className={style["menu-sidebar"]}>
                <div className={style["menu-logo"]}>
                    <img src={LogoBubulle} alt="Logo Bubulle" />
                </div>
                <div className={style["menu-categories-title"]}>Catégories</div>
                <ul className={style["menu-categories"]}>
                    {Object.keys(data.catégories).map((category, i) => <MenuCategory key={i} name={category} categoryVarieties={Object.keys(data.catégories[category])} isActive={selectedCategory.category === category} selectedCategory={selectedCategory} selectCategory={setSelectedCategory} />)}
                </ul>
                <div className={style["menu-signature"]}>Made with ❤️ <br /> by Yolène CONSTABLE, Aline HY & Maria GUY DE FONTGALLAND</div>
            </div>
            <div className={style["menu-gallery"]}>
                {selectedCategory.categoryVariety && (
                    <div className={style["filters-container"]}>
                        {data.catégories[selectedCategory.category][selectedCategory.categoryVariety]["filtres"].map((filterName, i) => <Filter key={i} name={filterName} isActive={selectedFilter === filterName} selectedCategory={selectedCategory} selectFilter={setSelectedFilter} filterProducts={setSelectedCategory} />)}
                    </div>
                )}
                <div className={style["product-cards-container"]}>
                    {selectedCategory.products.map((product, i) => <ProductCard key={i} productDetails={product} />)}
                </div>
                <Cart cartProducts={cartContent} setCartContent={setCartContent}/>
            </div>
        </div>
    )
}
