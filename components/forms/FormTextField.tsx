import React from 'react';
import { FormHelperText, TextField } from '@mui/material';

function FormTextField({ id, name, value, label, onChange, error, touched }) {
  const inputStyle = {
    '& .MuiFormLabel-root': {
      color: 'white !important',
    },
    '& .MuiInputBase-root': {
      color: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#8179a6',
    },
    ' && .MuiInput-root:hover::before ': {
      borderColor: '#8179a6',
    },
  };

  const errorStyle = {
    position: 'absolute',
    color: 'red',
    fontSize: '1rem !important',
  };

  return (
    <>
      <TextField
        sx={inputStyle}
        type='text'
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        label={label}
      />
      {error && touched ? (
        <FormHelperText sx={errorStyle} id='component-error-text'>
          {error}
        </FormHelperText>
      ) : (
        ''
      )}
    </>
  );
}

export default FormTextField;
