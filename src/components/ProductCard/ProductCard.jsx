import style from './ProductCard.module.css'
import Modal from '../Modal/Modal';
import NotFound from '../NotFound/NotFound';
import { useState } from 'react'

export default function ProductCard({ productDetails }) {
  const [showProductDetails, setShowProductDetails] = useState(false);

  return (
    <>
      <div onClick={() => setShowProductDetails(true)} className={style["product-card"]}>
        {!productDetails.disponibilité && (
          <div className={style["product-unavailable"]}>
            Indisponible
          </div>
        )}
        <div className={style["product-image"]}>
          <img src={productDetails.image} alt={`image ${productDetails.nom}`} />
        </div>
        <div className={style["product-name"]}>
          {productDetails.nom}
        </div>
      </div>
      {showProductDetails && (
        <Modal setShowModal={setShowProductDetails}>
          {productDetails.disponibilité ?
            (<form>/* code here to display the product details */</form>)
            :
            <NotFound productName={productDetails.nom} />}
        </Modal>
      )}
    </>
  )
}
