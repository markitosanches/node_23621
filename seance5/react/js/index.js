const Button = ({text, classProp="green", onClick}) => {
    return(
        <button 
            className={`text-white px-4 py-2 rounded bg-${classProp}-500 hover:bg-${classProp}-800`} 
            onClick={onClick}> 
            {text}
        </button>
    )
}

const Input = (props) => {
    return(
        <div className="mt-3">
            <label className="block"> {props.text}
                <input type={props.type} className="border rounded px-3 py-2 mt-1 w-full" placeholder={`Insert your ${props.text}`}/>
            </label>
        </div>
    )
}

const ReactAppFromCDN = () => {
    const onClickPrimary = () => {
        alert('Primary')
    }
    const onClickSecondary = () => {
        alert('Secondary')
    }
    return (
        <div className="container mx-auto">
            <div className="px-4 py-5 text-center">
                <h1 className="text-5xl font-bold">React CDN avec Tailwind</h1>
                <div className="mx-auto mt-4">
                    <p className="text-xl mb-4">React Components</p>
                    <div className="flex gap-3 justify-center">
                        <Button text="Primary" classProp="blue" onClick={onClickPrimary}/>
                        <Button text="Secondary" classProp="red" onClick={onClickSecondary}/>
                    </div>
                </div>
                <Input text="Username" type="email"/>
                <Input text="Password" type="password"/>
                <Input text="Birthday" type="date"/>
                <Input text="Age" type="number"/>
                <Input text="Name" />
                
                
            </div>
        </div>  
    );
}

ReactDOM.render(<ReactAppFromCDN />, document.querySelector('#root'))