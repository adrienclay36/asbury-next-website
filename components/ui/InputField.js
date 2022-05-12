import React from 'react'
import { TextInput } from '@mantine/core'
const InputField = ({ label, error, required = true }) => {
  return (
    <TextInput label={label} error={error} required={required}/>
  )
}

export default InputField