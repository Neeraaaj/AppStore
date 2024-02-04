import React, { useState } from 'react'

const InputContainer = ({onChangeText, placeholder, stateValue}) => {

  const handleChange = (e) => {
    onChangeText(e.target.value)
  }
    return (
        <input 
            className='w-full h-12 rounded-md outline-none border border-third bg-secondary
            px-4 font-semibold font-sans'
            type='text' 
            placeholder={placeholder}
            value={stateValue}
            onChange={handleChange}
        />
  )
}

export default InputContainer