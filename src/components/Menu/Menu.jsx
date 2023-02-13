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

    // Note de Maria : l'initialState a été défini par défaut pour que je puisse faire le panier
    // TODO Vider l'initialState une fois que l'ajout d'un produit au panier est fait
    const [cartContent,setCartContent ] = useState(
    [
        {
            description:'Il rend complètement gaga!',
            "disponibilité":true,
            id:23204204, // random
            image: "/bubble_project/static/media/coco-bubble-gaga.jpg",
            nom:'Bubble Tea Mangue',
            options: {
               bulles : ['Tapioca'],
               extras : ['Tapioca', 'Litchi', 'Mangue'],
               taille : ['Moyen'],
               'taux de sucre' : ['Faible'],
               'température' : ['Froid'],
               'thé' : ['Vert'],
            },
            prix: 9,
            "prix des extras": [
                {nom:'Tapioca', prix:1},
                {nom:'Litchi', prix:1},
                {nom:'Mangue', prix:1},
            ],
            'quantité':1,
            type:"Fruits"
        },
        {
            description:'Healthy and yummy !',
            "disponibilité":true,
            id:2320423242, // random
            image: "/bubble_project/static/media/banh_mi_vege.jpg",
            nom:'Banh Mi Végé',
            options: {
                extras : ['Sauce piquante'],
                'légumes' : ['Cocombre', 'Carotte', 'Coriandre'],
                'sauce piquante' : ['Oui'],
                'source de protéines' : ['Tofu'],
            },
            prix: 4.5,
            "prix des extras": [
                {nom:'Sauce piquante', prix:1},
            ],
            'quantité':2,
            'régime':['Vegan'],
            type:"Végé"
        }
    ]);

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
                    {selectedCategory.products.map((product, i) => <ProductCard key={i} productDetails={product} />)}
                </div>
                <Cart cartProducts={cartContent} setCartContent={setCartContent}/>
            </div>
        </div>
    )
}
