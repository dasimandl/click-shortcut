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
  const rowMapping = useSelector((state) => state.mapping.entities[index]);
  const updateState = (event: any) => {
    const { value, name } = event.target;
    dispatch(updateMapping({ key: index, field: name, value }));
  };
  ipcRenderer.on(IpcMessages.MOUSE_CLICKED, (_event, payload) => {
    if (payload.index === index) {
      // ipcRenderer.removeAllListeners(IpcMessages.MOUSE_MOVED);
      // ipcRenderer.removeAllListeners(IpcMessages.MOUSE_CLICKED);
      dispatch(
        updateMapping({
          key: index,
          field: FormInput.x,
          value: payload.event.x,
        })
      );
      dispatch(
        updateMapping({
          key: index,
          field: FormInput.y,
          value: payload.event.y,
        })
      );
    }
  });
  const handleLocationClick = () => {
    ipcRenderer.send(IpcMessages.GET_MOUSE_POSITION, index);
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
            label={`x: ${rowMapping?.x} y: ${rowMapping?.y}`}
            clickable
            color="primary"
            onClick={handleLocationClick}
          />
        </Grid>
      </Grid>
    </div>
  );
}
