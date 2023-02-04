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
            id:2,
            name:'Bubble Tea Fraise',
            image: require("../../assets/img/coco-strawberry-latte.png"),
            quantity:1,
            options: {
                multiple: {
                    extras: [
                        ["Litchi", 2],
                        ["Sucre", 2],
                    ],
                },
                unique: {
                    bulles: ["Litchi"],
                    "taux de sucre": ["Faible"],
                    thé: ["Vert"],
                    température: ["Froid"],
                    taille: [
                        ["Petit", 5],
                    ],
                }
            }
        },
        {
            id:3,
            type: "Boeuf",
            name:'Wrap Boeuf',
            image: require("../../assets/img/banhmi-viande.png"),
            prix:4,
            quantity:2,
            options: {
                multiple: {
                    legumes : ['Concombre', 'Carotte', "Oignon rouge"],
                    extras: [
                        ["Carotte", 2],
                        ["Concombre", 2],
                    ],
                },
                unique: {
                    "sauce piquante": ["Oui"],
                }
            },
        },
        {
            id:3,
            type: "Boeuf",
            name:'Wrap Boeuf',
            image: require("../../assets/img/banhmi-viande.png"),
            prix:4,
            quantity:1,
            options: {
                multiple: {
                    legumes : ['Concombre', 'Carotte', "Oignon rouge"],
                    extras: [
                        ["Carotte", 2],
                    ],
                },
                unique: {
                    "sauce piquante": ["Non"],
                }
            },
        },
        {
            id:4,
            type: "Poulet",
            name:'Banh Mi Poulet',
            image: require("../../assets/img/banhmi-viande.png"),
            prix:4,
            quantity:1,
            options: {
                multiple: {
                    légumes: ["Concombre", "Carotte", "Coriandre"],
                    extras: [
                        ["Concombre", 2],
                    ],
                },
                unique: {
                    "sauce piquante": ["Oui"],
                }
            },
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
