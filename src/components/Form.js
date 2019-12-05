import React from 'react';
import './Form.css'

const Form = (props) => {
    return ( 
        <div className="flex-container">
       <form onSubmit={props.submit}>
           <input
           className='cityName' 
           type="text" 
           value={props.value}
           placeholder='Enter city...'
           onChange={props.inputChange}
           />
           <button onClick={props.click} className='checkBtn'>check weather</button>
       </form>
       </div>
     );
}
 
export default Form;