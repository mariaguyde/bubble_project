import style from './ProductCard.module.css'
import Modal from '../Modal/Modal';
import { useState, useEffect, useRef } from 'react'
import OptionInput from '../OptionInput/OptionInput';

export default function ProductCard({ productDetails, addToCart, cart, selectedCategory }) {
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [formError, setFormError] = useState();
  const form = useRef();
  const productUniqueOptions = Object.keys(productDetails.options.unique);
  const productMultipleOptions = Object.keys(productDetails.options.multiple);
  const productOptions = [...productUniqueOptions, ...productMultipleOptions];

  useEffect(() => {
    setFormError("");
  }, [showProductDetails])

  const addProductToCart = (e) => {
    e.preventDefault();

    const options = {};
    const missingFields = [];

    const selectedValues = productOptions.map(option => e.target[option].length > 0 ? [...e.target[option]] : [e.target[option]]).map(inputArr => inputArr.filter(input => input.checked).map(checkedInput => checkedInput.value));
    selectedValues.forEach((value, i) => options[productOptions[i]] = value);

    for(const key in options) {
        if(productDetails.options.unique.hasOwnProperty(key) && options[key].length === 0) {
        missingFields.push(key)
      }
    }

    if(missingFields.length > 0) {
      form.current.scrollTop = 0;
      setFormError(`Veuillez remplir ${missingFields.length > 1 ? `les champs ${missingFields.map((field, i) => i === missingFields.length - 1 ? `et "${field}"` : `"${field}"`).join(", ")}.` : `le champ "${missingFields[0]}".`}`);
      return;
    }

    setFormError("");

    const productIndex = cart.findIndex(product => product.id === productDetails.id && JSON.stringify(product.options) === JSON.stringify(options))

    if(productIndex !== -1) {
      const newCart = [...cart];
      newCart.splice(productIndex, 1, {...cart[productIndex], quantité: cart[productIndex].quantité + 1 });
      addToCart(newCart);
      return
    }
    
    let price;

    if(productDetails.prix) {
      price = Number(productDetails.prix.replace("€", ""));
    } else {
      price = Number(productDetails.options.unique.taille.find(arr => arr.includes(options.taille[0]))[1].replace("€", ""));
    }

    if(options.extras.length > 0) {
      const extrasPrices = options.extras.map(extra => Number(productDetails.options.multiple.extras.find(extraArr => extraArr[0] === extra)[1].replace("€", "")));
      price = [price, ...extrasPrices].reduce((price, currValue) => price + currValue);
    }

    addToCart([...cart, {...productDetails, options: options, quantité: 1, prix: price}])
  };

  return (
    <>
      <div onClick={() => setShowProductDetails(true)} className={style["product-card"]}>
        <div className={style["product-image"]}>
          <img src={productDetails.image} alt={`image ${productDetails.nom}`} />
        </div>
        <div className={style["product-name"]}>
          {productDetails.nom}
        </div>
      </div>
      {showProductDetails && (
        <Modal setShowModal={setShowProductDetails}>
          <form 
          ref={form}
          onSubmit={addProductToCart} className={style["product-details-form"]}>
            <div className={style["product-details-image"]}>
              <img src={productDetails.image} alt={`image de ${productDetails.nom}`} />
            </div>
            <div className={style["product-details-name"]}>{productDetails.nom}</div>
            <div className={style["product-details-description"]}>{productDetails.description}</div>
            {formError && (<div className={style["error"]}>{formError}</div>)}
            <div className={style["product-details-type"]}>
              <div className={style["product-details-type__title"]}>{selectedCategory.category === "boissons" ? "Goût" : "Viande"}</div>
              <div className={style["product-details-type__name"]}>
                <OptionInput id={productDetails.type} name={productDetails.type} value={productDetails.type} isActive={true} />
              </div>
            </div>
            {selectedCategory.category === "nourriture" && (
              <div className={style["product-details-regime"]}>
                <div className={style["product-details-regime__title"]}>Régime :</div>
                <div className={style["product-details-regime__name"]}>{productDetails.régime.join(", ")}</div>
              </div>
            )}
            {productDetails.prix && (
               <div className={style["product-details-price"]}>
               <div className={style["product-details-price__title"]}>Prix :</div>
               <div className={style["product-details-price__name"]}>{productDetails.prix}</div>
             </div>
            )}
            <div className={style["product-options"]}>
              {productUniqueOptions.map((option, i) => (
                <div key={i} className={style["product-option-container"]}>
                  <div className={style["product-option-name"]}>{option.charAt(0).toUpperCase() + option.slice(1)} <span>*</span>: </div>
                    <div className={style["product-option-inputs"]}>{productDetails.options.unique[option].map((optionValues, i) => Array.isArray(optionValues) ? 
                      <OptionInput key={i} id={`${option}-option-${i}`} name={option} value={optionValues[0]} priceInfo={optionValues[1]} />
                    : 
                      <OptionInput key={i} id={`${option}-option-${i}`} name={option} value={optionValues} />
                    )}
                    </div>
               </div>))}              
            </div>
            <div className={style["product-options"]}>
              {productMultipleOptions.map((option, i) => (
                <div key={i} className={style["product-option-container"]}>
                  <div className={style["product-option-name"]}>{option.charAt(0).toUpperCase() + option.slice(1)} : </div>
                    <div className={style["product-option-inputs"]}>{productDetails.options.multiple[option].map((optionValues, i) => Array.isArray(optionValues) ? 
                      <OptionInput key={i} id={`${option}-option-${i}`} name={option} value={optionValues[0]} priceInfo={optionValues[1]} multiple />
                    : 
                      <OptionInput key={i} id={`${option}-option-${i}`} name={option} value={optionValues} multiple />
                   )}
                    </div>
               </div>))}      
            </div>
            <div className={style["product-details-allergens"]}>
              <div className={style["product-details-allergens__title"]}>Allergènes</div>
              <ul className={style["product-details-allergens"]}>{productDetails.allergènes.map((allergen, i) => <li key={i}>{allergen}</li>)}</ul>
            </div>
            <button type='submit'>
              Ajouter
            </button>
          </form>
        </Modal>
      )}
    </>
  )
}
