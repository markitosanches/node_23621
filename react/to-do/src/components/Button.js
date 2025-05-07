const Button = ({text, onClick, color='btn-blue'}) => {
    return(
        <button 
        type="button" 
        className={`btn ${color}`} 
        onClick={onClick}>
            {text}
        </button>
    )
}

export default Button