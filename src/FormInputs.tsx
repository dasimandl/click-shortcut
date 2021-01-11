import React, { useState } from 'react';
import { TextField, Grid, Chip, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from './shared/models/FormInput.model';
import * as actions from './store';
import { updateMapping } from './store/reducers/shortcut-map-form.reducer';
import { IpcMessages } from './shared/models/IpcMessages.model';
import FormDialog from './FormDialog';

const { ipcRenderer } = window.require('electron');

const initialState = {
  [FormInput.name]: '',
  [FormInput.shortcut]: '',
  [FormInput.x]: '',
  [FormInput.y]: '',
};

export default function FormInputs({ index }: { index: number }) {
  const [isTrackingMouse, setIsTrackingMouse] = useState(false);
  const dispatch = useDispatch();
  const rowMapping = useSelector((state) => state.mapping.entities[index]);
  const updateState = (event: any) => {
    const { value, name } = event.target;
    dispatch(updateMapping({ key: index, field: name, value }));
  };
  ipcRenderer.on(IpcMessages.MOUSE_CLICKED, (_event, payload) => {
    if (payload.index === index) {
      setIsTrackingMouse(!isTrackingMouse);
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
    setIsTrackingMouse(!isTrackingMouse);
    ipcRenderer.send(IpcMessages.GET_MOUSE_POSITION, index);
  };
  const getChipLabel = () => {
    console.log(
      '🚀 ~ file: FormInputs.tsx ~ line 59 ~ getChipLabel ~ getChipLabel'
    );

    if (!rowMapping || !(rowMapping?.x && rowMapping?.y)) {
      return 'Click to select coordinates';
    }
    const { x, y } = rowMapping;

    return isTrackingMouse ? 'Click on screen to set' : `x: ${x} y: ${y}`;
  };

  const getShortcutDialogButtonText = (): string => {
    return rowMapping && rowMapping[FormInput.shortcut]
      ? `${rowMapping[FormInput.shortcut]}`
      : 'Set Shortcut';
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    let { key } = e;
    const mapping: any = {
      Meta: 'Command',
    };
    key = mapping[key] ? mapping[key] : key;
    console.log(
      '🚀 ~ file: FormInputs.tsx ~ line 71 ~ handleKeyDown ~ key',
      key
    );
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
          <FormDialog
            index={index}
            buttonText={getShortcutDialogButtonText()}
          />
        </Grid>
        <Grid item xs={4}>
          <Chip
            icon={<LocationSearchingIcon />}
            label={getChipLabel()}
            clickable
            color="primary"
            onClick={handleLocationClick}
          />
        </Grid>
      </Grid>
    </div>
  );
}
