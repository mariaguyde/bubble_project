import style from './ProductCard.module.css'
import Modal from '../Modal/Modal';
import NotFound from '../NotFound/NotFound';
import { useState, useEffect, useRef } from 'react';
import SelectableInput from '../SeletableInput/SelectableInput';
import QuantityPicker from '../QuantityPicker/QuantityPicker';

export default function ProductCard({ productDetails, addToCart, cart, selectedCategory }) {

  // Pour afficher les produits
  const [showProductDetails, setShowProductDetails] = useState(false);

  // La quantité du produit
  const [productQuantity, setProductQuantity] = useState(1);

  // gestion des erreurs en récupérant les données des input dans le formulaires
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [allergens, setAllergens] = useState([]);
  const [price, setPrice] = useState();
  const [formSubmitted, setFormSubmitted] = useState(false);

  // On récupère les options unique et multiples
  const productUniqueOptions = Object.keys(productDetails.options.unique);

  // Si productDetails.options.multiple existe alors on renvoie un array de multiple, si elle n'existe pas tableau vide
  const productMultipleOptions = productDetails.options.multiple ? Object.keys(productDetails.options.multiple) : [];

  const productOptions = [...productUniqueOptions, ...productMultipleOptions];
  const productCardForm = useRef();


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

    // réinitialisation du formulaire, de la quantité du produit, du prix du produit etc 
    e.target.reset();
    setProductQuantity(1);
    priceInitialization();
    setAllergens([]);

    // on recherche un produit identique dans le panier
    const productIndex = cart.findIndex((product) =>
      product.id === productDetails.id && JSON.stringify(product.options) === JSON.stringify(options));

    // s'il y a un produit identique, sa quantité sera modifiée par celle du quantity picker
    if (productIndex !== -1) {
      const newCart = [...cart];
      newCart.splice(productIndex, 1, { ...cart[productIndex], quantité: productQuantity });
      // message de succès pour la modification
      setFormSuccess(`La quantité du ${productDetails.nom} a bien été modifiée par ${productQuantity}.`);
      // modification du panier
      addToCart(newCart);
      setTimeout(() => setFormSubmitted(true), 2000);
      return
    }

    // sinon, le produit n'existe pas donc récupération des noms d'extras avec leur prix 
    let extras = [];
    if (options.extras.length > 0) {
      extras = options.extras.map((extra) => productDetails.options.multiple.extras.find((obj) => obj.nom === extra));
    }

    // message de succès pour l'ajout
    setFormSuccess(`${productQuantity} ${productDetails.nom} ${productQuantity > 1 ? "ont été ajoutés au panier." : "a été ajouté au panier."}`);
    // ajout du produit au panier
    addToCart([...cart, { ...productDetails, options: options, quantité: productQuantity, prix: Object.values(price).flat().reduce((acc, currValue) => acc + currValue), "prix des extras": extras }]);
    setTimeout(() => setFormSubmitted(true), 2000);
  }

  // gestion des erreurs
  const handleSubmit = (e) => {
    e.preventDefault();

    // on met à vide les messages d'erreur et de succès
    setFormError("")
    setFormSuccess("");

    const radioInputsByName = {};

    // on regroupe les input radio par name
    const radioInputs = productCardForm.current.querySelectorAll("input[type='radio']");

    radioInputs.forEach((input) => {
      if (!radioInputsByName[input.name]) {
        radioInputsByName[input.name] = [];
      }

      radioInputsByName[input.name].push(input)
    });

    // on vérifie si tous les groupes d'inputs ont au moins un input checked 
    const allInputsChecked = Object.keys(radioInputsByName).every((name) => radioInputsByName[name].some(input => input.checked));

    // si c'est false (il manque un input checked dans un ou plusieurs groupes d'inputs)
    if (!allInputsChecked) {
      setFormError("Remplissez bien toutes les options requises. (*)");
      return
    }

    addProductToCart(e)
  };

  const priceInitialization = () => {
    let priceDetails = {};

    if (productCardForm.current) {
      productCardForm.current.querySelectorAll("input").forEach((input) => priceDetails[input.name] = []);

      priceDetails = { ...priceDetails, initialPrice: productDetails.prix ? productDetails.prix : 0 }

      setPrice(priceDetails);
    }
  }

  const showAllergens = (optionValue) => setAllergens(productDetails.allergènes[optionValue.toLowerCase()]);

  useEffect(() => {
    if (showProductDetails) {
      setFormSuccess("");
      setFormError("");
      setProductQuantity(1);
      setAllergens([])
      priceInitialization();
      setFormSubmitted(false);
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
          <img src={productDetails.image} alt={productDetails.nom} />
        </div>
        <div className={style["product-name"]}>
          {productDetails.nom}
        </div>
      </div>

      {showProductDetails && (
        <Modal setShowModal={setShowProductDetails} formSubmitted={formSubmitted}>
          {productDetails.disponibilité ?
            (
              <div className={style["product-card-wrapper"]}>
                <div className={style["product-card-modal"]}>
                  <div className={style["product-card-description"]}>
                    <div className={style["product-card-image"]}>
                      <img src={productDetails.image} alt={productDetails.nom} />
                    </div>
                    {/* Description */}
                    <h3>{productDetails.nom}</h3>
                    <h4>{productDetails.description}</h4>
                    {productDetails.régime &&
                      <div className={style["product-card-special"]}>
                        <h5 className={style["product-card-special__title"]}>Régime</h5>
                        <ul className={style["product-card-tag-container"]}>
                          {productDetails.régime.map((diet, i) => <li key={i} className={style["product-card-tag"]}>{diet}</li>)}
                        </ul>
                      </div>
                    }
                    {selectedCategory.category === "nourriture" && <div className={style["warning"]}>Légumes non inclus. <br /> Cochez les options souhaitées pour votre {productDetails.nom}.</div>}
                    {productDetails.allergènes && (
                      <div className={style["product-card-allergens-container"]}>
                        <div className={style["product-card-allergens__title"]}>Allergènes</div>
                        <ul className={style["product-card-allergens"]}>{typeof productDetails.allergènes === 'object' && productDetails.allergènes !== null && !Array.isArray(productDetails.allergènes) ? allergens.map((allergen, i) => <li key={i}>{allergen}</li>) : productDetails.allergènes.map((allergen, i) => <li key={i}>{allergen}</li>)}</ul>
                      </div>
                    )}
                    <div className={style["quantity-picker"]}>
                      <QuantityPicker quantity={productQuantity} setQuantity={setProductQuantity} />
                    </div>
                  </div>

                  {/* Détails choix personnalisation si c'est un thé ou un sandwich */}
                  <div className={style["product-card-custom-container"]}>
                    <form ref={productCardForm} className={style["product-card-custom-subcontainer"]} onSubmit={handleSubmit} >

                      <div className={style["product-details-type"]}>
                        {productUniqueOptions.map((option, i) =>
                          <div key={i} className={style["product-details-type__input-container"]}>
                            <h4 className={style["product-details-type__title"]}>{option} <span>*</span></h4>
                            <div className={style["product-details-type__inputs"]}>
                              {productDetails.options.unique[option].map((optionValue, i) =>
                                typeof optionValue === "object" ? <SelectableInput key={i} title={optionValue.nom} id={`option-${option}-${i + 1}`} name={option} price={optionValue.prix} type="radio" productPrice={price} setProductPrice={setPrice} />
                                  :
                                  <SelectableInput key={i} title={optionValue} id={`option-${option}-${i + 1}`} name={option} type="radio" {...(productDetails.allergènes && productDetails.allergènes[optionValue.toLowerCase()] && { showAllergens: () => showAllergens(optionValue) })} />
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
                                typeof optionValue === "object" ? <SelectableInput key={i} title={optionValue.nom} id={`option-${option}-${i + 1}`} name={option} price={optionValue.prix} type="checkbox" productPrice={price} setProductPrice={setPrice} />
                                  :
                                  <SelectableInput title={optionValue} id={`option-${option}-${i + 1}`} key={i} name={option} type="checkbox" />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      {formError &&
                        <div className={style["product-card-errors"]}>
                          <p>{formError}</p>
                        </div>
                      }
                      {formSuccess &&
                        <div className={style["product-card-success"]}>
                          <p>{formSuccess}</p>
                        </div>
                      }
                      <div className={style["product-details-price"]}>
                        {price &&
                          <div className={style["product-card-cart"]}>
                            <p className={style["product-card-price"]}><span>Prix du {productDetails.nom} :</span> {Object.values(price).flat().reduce((initialPrice, optionPrice) => initialPrice + optionPrice).toFixed(2) * productQuantity}</p>
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
