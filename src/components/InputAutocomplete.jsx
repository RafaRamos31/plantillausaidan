import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Modal } from 'react-bootstrap';


const filter = createFilterOptions();

export const InputAutocomplete = ({valueList, value, setValues, name, ModalCreate, setRefetch, insert=false, disabled=false}) => {
  const [label, setLabel] = useState('');
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };

  useEffect(() => {
    // eslint-disable-next-line
    setLabel(valueList.find(v => v.id == value)?.nombre)
  // eslint-disable-next-line
  }, [valueList])
  

  return (
    <>
      <Autocomplete
        value={label}
        disabled={disabled}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              toggleOpen(true);
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
          } else {
            setValues((v) => ({...v, [name]: newValue?.id || ''}));
            setLabel(newValue?.nombre);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (insert && params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              nombre: `Agregar nuevo`,
            });
          }
          
          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={valueList}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.nombre;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.nombre}</li>}
        sx={{ width: '84%' }}
        freeSolo
        renderInput={(params) => <TextField {...params} />}
      />
      <Modal
        show={open}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
        centered
      >
        {
          ModalCreate &&
          <ModalCreate handleClose={handleClose} modal={true} modalSetValues={setValues} modalRefetch={setRefetch}/>
        }
        
      </Modal>
    </>
  );
}

const renderBackdrop = () => <div style={{position: 'fixed',
    zIndex: 1040,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: 0.5}}/>;