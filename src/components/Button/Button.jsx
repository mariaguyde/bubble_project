import style from './Button.module.css'

export default function Button({ text, backgroundColor, width }) {
  return (
    <button style={{ backgroundColor, width: width ? width : "auto" }} type='submit'>
        {text}
    </button>
  )
}
