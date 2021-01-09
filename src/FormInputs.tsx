import React, { useState } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from './shared/models/FormInput';
import * as actions from './store';

const initialState = {
  [FormInput.name]: '',
  [FormInput.shortcut]: '',
  [FormInput.x]: '',
  [FormInput.y]: '',
};

export default function FormInputs({ index }: { index: number }) {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const updateState = (event: any) => {
    const { value, name } = event.target;
    console.log(
      '🚀 ~ file: FormInputs.tsx ~ line 19 ~ updateState ~ value, name ',
      value,
      name
    );
    dispatch(actions.updateMapping(index, value));
    setState((prevState) => {
      const newState = { ...prevState, [name]: value };
      // updateForm(newState, index);

      return newState;
    });
  };
  const counter = useSelector((states) => states);
  console.log(
    '🚀 ~ file: FormInputs.tsx ~ line 29 ~ FormInputs ~ counter',
    counter
  );

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            onChange={updateState}
            fullWidth
            id="outlined-basic"
            label="Name"
            name={FormInput.name}
            variant="outlined"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={updateState}
            fullWidth
            id="outlined-basic"
            label="Shortcut"
            name={FormInput.shortcut}
            variant="outlined"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            onChange={updateState}
            id="outlined-basic"
            label="x"
            name={FormInput.x}
            variant="outlined"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            onChange={updateState}
            id="outlined-basic"
            label="y"
            name={FormInput.y}
            variant="outlined"
            defaultValue=""
          />
        </Grid>
      </Grid>
    </div>
  );
}
