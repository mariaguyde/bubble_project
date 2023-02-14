import style from './ProductCard.module.css'
import Modal from '../Modal/Modal';
import NotFound from '../NotFound/NotFound';
import { useState, useEffect } from 'react';
import SelectableInput from '../SeletableInput/SelectableInput';
import { v4 as uuidv4 } from "uuid";
import QuantityPicker from '../QuantityPicker/QuantityPicker';

export default function ProductCard({ productDetails, selectedCategory, addToCart, cart }) {

  // Pour afficher les produits
  const [showProductDetails, setShowProductDetails] = useState(false);
  
  // La quantité du produit
  const [productQuantity, setProductQuantity] = useState(1);

  // gestion des erreurs en récupérant les données des input dans le formulaires
  const [formErrors, setFormErrors] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [allergens, setAllergens] = useState();

  // On récupère les options unique et multiples
  const productUniqueOptions = Object.keys(productDetails.options.unique);

  // Si productDetails.options.multiple existe alors on renvoie un array de multiple, si elle n'existe pas tableau vide
  const productMultipleOptions = productDetails.options.multiple ? Object.keys(productDetails.options.multiple) : [];

  const productOptions = [...productUniqueOptions , ...productMultipleOptions];


  // ajout d'un produit dans un panier
  const addProductToCart = (e) => {
    
    const options = {};

    const inputValues = productOptions.map((option) =>
      e.target[option] && e.target[option].length > 0 ? [...e.target[option]] : [e.target[option]]
    ).map((inputArray) =>
      inputArray.filter((input) => input.checked)
        .map((checkedInput) =>
          checkedInput.value
        ))


    inputValues.forEach((inputValue, i) => {
      options[productOptions[i]] = inputValue;
    })

    const productIndex = cart.findIndex((product) => 
    product.id === productDetails.id && JSON.stringify(product.options) === JSON.stringify(options));

    if(productIndex !== -1) {
      const newCart = [...cart];
      newCart.splice(productIndex, 1, {...cart[productIndex], quantité: productQuantity});
      addToCart(newCart);
      return
    }

    let price = productDetails.prix ? productDetails.prix : productDetails.options.unique.taille.find((obj) => obj.nom === options.taille[0]).prix;

    let extras = [];
    if(options.extras.length > 0) {
      extras = options.extras.map((extra) => productDetails.options.multiple.extras.find((obj) => obj.nom === extra));

      const extrasPrices =  extras.map((extra) => 
        extra.prix
      )

      price = [price, ...extrasPrices].reduce((productPrice, currValue) => productPrice + currValue);
    }

    console.log([...cart, {...productDetails, options: options, quantité: productQuantity, prix: price, "prix des extras": extras}]);

    addToCart([...cart, {...productDetails, options: options, quantité: productQuantity, prix: price, "prix des extras": extras}]);

  }

  // gestion des erreurs
  const handleSubmitAndAddingProduct = (e) => {
    e.preventDefault();

    const radioInputsByName = {};

    // on regroupe les input radio par name
    const radioInputs = document.querySelectorAll("input[type='radio']");
    radioInputs.forEach((input) => {
      if (!radioInputsByName[input.name]) {
        radioInputsByName[input.name] = [];
      }
      radioInputsByName[input.name].push(input);
    });

    // On vérifie si au moins un input est :checked pour chaque groupe
    const hasError = Object.keys(radioInputsByName).some((name) => {
      const inputs = radioInputsByName[name];
      const isChecked = inputs.some((input) => input.checked);
      return !isChecked;
    });

    if (hasError) {
      console.log('pas valide')
      setFormErrors(true);
      return
    } 
    setFormErrors(false)
    setFormSuccess(true);
    addProductToCart(e)
  
  };

  const handleAddingAllergens = (e) => {
    const allergenValue = e.toLowerCase();
    if (productDetails.allergènes[allergenValue]) {
      console.log(productDetails.allergènes[allergenValue]);
      const allergens = productDetails.allergènes[allergenValue];
      const allergenList = allergens.map((allergen, i) => <li key={i} className={style["product-card-tag"]}>{allergen}</li>);
      setAllergens(allergenList);
      
    }
  }


  useEffect(() => {
    if (!showProductDetails) {
      setFormSuccess(false);
      setFormErrors(false);
    }
  }, [showProductDetails]);
  

  return (
    <>
      <div onClick={() => setShowProductDetails(true)} className={style["product-card"]}>
        {!productDetails.disponibilité && (
          <div className={style["product-unavailable"]}>
            Indisponible
          </div>
        )}
        <div className={style["product-image"]}>
          <img src={productDetails.image} alt={`notre produit ${productDetails.nom}`} />
        </div>
        <div className={style["product-name"]}>
          {productDetails.nom}
        </div>
      </div>
      
      {showProductDetails && (
        <Modal setShowModal={setShowProductDetails}>
          {productDetails.disponibilité ?
            (
              <div className={style["product-card-wrapper"]}>
              <div className={style["product-card-modal"]}>
                <div className={style["product-card-description"]}>
                  <div className={style["product-card-image"]}>
                    <img src={productDetails.image} alt={`notre produit ${productDetails.nom}`} />
                  </div>
                  {/* Description */}
                  <h3>{productDetails.nom}</h3>
                  <h4>{productDetails.description}</h4>
                  {productDetails.régime && 
                    <div className={style["product-card-special"]}>
                      <h5 className={style["product-card-special__title"]}>Régimes et/ou Allergènes</h5>
                      <ul className={style["product-card-tag-container"]}>
                        <li className={style["product-card-tag"]}>{productDetails.régime}</li>
                          {productDetails.allergènes && (
                              typeof productDetails.allergènes === 'object' && productDetails.allergènes !== null && !Array.isArray(productDetails.allergènes) ? allergens.map((allergen, i) => 
                              <li key={i} className={style["product-card-tag"]} >{allergen}</li>) 
                              : productDetails.allergènes.map((allergen, i) => 
                              <li key={i} className={style["product-card-tag"]}>{allergen}</li>)
                          )}
                      </ul>
                    </div>
                  }
                  <QuantityPicker quantity={productQuantity} setQuantity={setProductQuantity} />
                </div>

                {/* Détails choix personnalisation si c'est un thé ou un sandwich */}
                <div className={style["product-card-custom-container"]}>
                  <form className={style["product-card-custom-subcontainer"]} onSubmit={handleSubmitAndAddingProduct} >
                    {/* il me faut pour les boissons la taille / la température / le taux de sucre / le thé / les bulles / les allergènes / puis il faut calculer le prix à partir de la taille et si des extras rajouter */}
                    
                    <div className={style["product-details-type"]}>
                        {productUniqueOptions.map((option, i) =>
                          <div key={i} className={style["product-details-type__input-container"]}>
                            <h4 className={style["product-details-type__title"]}>{option}</h4>
                            <div className={style["product-details-type__inputs"]}>
                              {productDetails.options.unique[option].map((optionValue, i) => 
                                typeof optionValue === "object" ? <SelectableInput key={i} title={optionValue.nom} id={`option-${option}-${i+1}`} name={option} price={optionValue.prix} type="radio" onclick={() => handleAddingAllergens(optionValue)} />
                                  :
                                  <SelectableInput key={i} title={optionValue} id={`option-${option}-${i+1}`} name={option} type="radio" onclick={() => handleAddingAllergens(optionValue)} />
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                    <div className={style["product-details-type-extras"]}>
                    {productMultipleOptions.map((option, i) =>
                          <div key={i} className={style["product-details-type__input-container"]}>
                            <h4 className={style["product-details-type__title"]}>{option}</h4>
                            <div className={style["product-details-type__inputs"]}>
                          {productDetails.options.multiple[option].map((optionValue, i) =>
                            typeof optionValue === "object" ? <SelectableInput key={i} title={optionValue.nom} id={`option-${option}-${i + 1}`} name={option} price={optionValue.prix} type="checkbox" />
                              :
                              <SelectableInput title={optionValue} id={`option-${option}-${i + 1}`} key={i} name={option} type="checkbox"  />
                          )}
                            </div>
                          </div>
                        )}
                    </div>
                    {formErrors && 
                      <div className={style["product-card-errors"]}>
                        <p>Remplissez bien toutes les options</p>
                      </div> 
                      }
                      {formSuccess && 
                      <div className={style["product-card-success"]}>
                        <p>{productQuantity} produit {productQuantity > 1 ? "ont été ajoutés à votre commande" : "a été ajouté"}</p>
                      </div> 
                      }
                      <div className={style["product-details-price"]}>
                        {productDetails.prix ?
                          <div className={style["product-card-cart"]}>
                            <p className={style["product-card-price"]}>{productDetails.prix}</p>
                          </div> :
                          <div className={style["product-card-cart"]}>
                            <p className={style["product-card-title"]}>Faites votre choix</p>
                          </div>
                        }

                        <button type="submit">Ajouter</button>

                      </div>
                  </form>
                </div>
              </div>
            </div>
            )
            :
            <NotFound productName={productDetails.nom} />}
        </Modal>
      )}
    </>
  )
}
