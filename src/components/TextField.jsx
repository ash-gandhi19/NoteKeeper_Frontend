import React from 'react';

var TextField = (props) => {
    return(
        <div>
        <input value={props.value} name={props.name} onChange={props.onChange} placeholder={props.placeholder} type={props.type} />
        </div>
    )
};

export default TextField;