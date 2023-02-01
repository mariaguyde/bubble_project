import style from './NotFound.module.css'
import Bao from "../../assets/img/bao.gif"
import { Link } from 'react-router-dom'

export default function NotFound({ productName }) {
  return (
    <div className={style["not-found"]}>
        <div className={style["not-found-image"]}>
            <img src={Bao} alt="gif Bao confus" />
        </div>
        {productName ? <div className={style["not-found-text"]}>Oops, le {productName} n'est plus disponible pour le moment. </div> : <div className={style["not-found-text"]}>Oops, on dirait que tu t'es perdu(e). <br/> Clique <Link to="/">ici</Link> pour retrouver ton chemin. </div>}
    </div>
  )
}
