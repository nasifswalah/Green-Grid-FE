import React from 'react';
import './CustomInput.css'

function CustomInput({type, value, label, onchange, onblur, name}) {
  return (
    <div className='common-input-box' >
        <input type={type} required className='custom-input' name={name} value={value} onChange={onchange} onBlur={onblur} />
        <label htmlFor=" ">{label}</label>
    </div>
  )
}

export default CustomInput