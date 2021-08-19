import React from 'react';
import './Form.css';

const Form = props => {
    return ( 
        <div className="search-box">
            <form onSubmit={props.submit}>
                <input type="text" 
                value={props.value} 
                placeholder="Wpisz miasto"
                onChange={props.change}
                className="search-bar"
                />
                <button type="submit">Wyszukaj miasto</button>
            </form>
        </div>
     );
}
 
export default Form;