import './Button.css'

interface Props{
    label:string
    height:string
    width:string
    onClick: () => void
    id:string
}

export const Button = (props:Props) => {
    const style ={
        height:props.height,
        width:props.width
    }
  return (
    <div> 
        <button class='button-component' style={style} onclick={props.onClick} id={props.id}>
            {props.label}
        </button>
    </div>
  )
}
