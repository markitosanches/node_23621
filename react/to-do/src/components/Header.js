import PropTypes from 'prop-types';
import Button from './Button'
import { useLocation } from 'react-router-dom'
 
const Header = ({title = "To Do List", toggleForm, showAdd}) => {
    // const onClick = () =>{
    //     console.log('Add task')
    // }
    const location = useLocation()
    return(
        <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl"> {title} </h1>
                { location.pathname === '/' && (<Button text={showAdd ? 'Close' : 'Add'} onClick={toggleForm} color={showAdd ? 'btn-red' : 'btn-green'}/>)
                }
               
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;