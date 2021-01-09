import React, { useState } from 'react';
import { TextField, Grid, Chip } from '@material-ui/core';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from './shared/models/FormInput.model';
import * as actions from './store';
import { updateMapping } from './store/reducers/shortcut-map-form.reducer';
import { IpcMessages } from './shared/models/IpcMessages.model';

const { ipcRenderer } = window.require('electron');

const initialState = {
  [FormInput.name]: '',
  [FormInput.shortcut]: '',
  [FormInput.x]: '',
  [FormInput.y]: '',
};

export default function FormInputs({ index }: { index: number }) {
  const dispatch = useDispatch();
  const rowMapping = useSelector((state) => state.mapping[index]);
  const updateState = (event: any) => {
    const { value, name } = event.target;
    dispatch(updateMapping({ key: index, field: name, value }));
  };
  // ipcRenderer.removeAllListeners(IpcMessages.MOUSE_MOVED);
  // ipcRenderer.removeAllListeners(IpcMessages.MOUSE_CLICKED);

  ipcRenderer.on(IpcMessages.MOUSE_CLICKED, (details) => {
    console.log(
      '🚀 ~ file: FormInputs.tsx ~ line 32 ~ ipcRenderer.on MOUSE_CLICKED ~ details',
      details
    );
  });
  ipcRenderer.on(IpcMessages.MOUSE_MOVED, (details) => {
    console.log(
      '🚀 ~ file: FormInputs.tsx ~ line 32 ~ ipcRenderer.on MOUSE_MOVED ~ details',
      details
    );
  });
  const handleLocationClick = () => {
    ipcRenderer.send(IpcMessages.GET_MOUSE_POSITION);
  };

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
        <Grid item xs={4}>
          <Chip
            icon={<LocationSearchingIcon />}
            label="Primary clickable"
            clickable
            color="primary"
            onClick={handleLocationClick}
          />
        </Grid>
      </Grid>
    </div>
  );
}
