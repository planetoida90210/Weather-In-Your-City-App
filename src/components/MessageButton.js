import React from 'react';
import Message from './Message'
import './MessageButton.css'

const MessageButton = (props) => {


const buttons = props.weather.messageButtons.slice()
const btn = buttons.map(button => (
    <React.Fragment key={button.id}>
     <div>
    <button onClick={props.click} className={button.additionalBtn ? 'extraInfo active' : 'extraInfo'} id={button.id} key={button.id}>
        <i className={button.name}></i>
        </button>
        </div>
    </React.Fragment>
))
    return ( 
        <>
            <div  className="extraInfos-container">
            {btn}
            </div>
            <Message weather={props.weather} buttons={buttons}/>
        </>
     );
}
export default MessageButton;