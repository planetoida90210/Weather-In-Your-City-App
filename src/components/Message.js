import React from 'react';

const Message = (props) => {



const message = props.buttons.filter(button => button.additionalBtn === true).map(button => {
  return button.message
})
let activeMessage = String(message)
    return ( 
    <>
    <p className='activeMessage'>{activeMessage.toUpperCase()}</p>
<p className='extraInfoMessage'>{props.weather[activeMessage]}<span> {activeMessage === 'hummidity' ? '%' : null}</span></p>
</>
     )
}
 
export default Message;