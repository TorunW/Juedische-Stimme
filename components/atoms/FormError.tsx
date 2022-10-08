import React from 'react'
import { Alert } from '@mui/material'
const FormError = ({message}) => {
  return (
    <Alert severity='error'>{message.toString()}</Alert>
  )
}

export default FormError