import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import FormShortcutDisplayInput from './FormShortcutDisplayInput';
import { FormInput } from './shared/models/FormInput.model';
import { updateMapping } from './store/reducers/shortcut-map-form.reducer';
import { IpcMessages } from './shared/models/IpcMessages.model';

const { ipcRenderer } = window.require('electron');

export default function FormDialog({
  index,
  buttonText,
}: {
  index: number;
  buttonText: string;
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  // TODO: Move shortcut value into the global store
  const [currentShortcut, setCurrentShortcut] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRegister = () => {
    console.log('REGISTERING for INDEX:', index);
    ipcRenderer.send(IpcMessages.REGISTER_SHORTCUT, {
      shortcut: currentShortcut,
      index,
    });
  };
  const handleUnregister = (shortcut: string) => {
    console.log('UNREGISTERING for INDEX:', index);
    ipcRenderer.send(IpcMessages.UNREGISTER_SHORTCUT, {
      shortcut,
      index,
    });
  };

  const handleSubmit = () => {
    // This is a very specifc update reducer.  This should be expanded to allow an entire entity to be passed
    dispatch(
      updateMapping({
        key: index,
        field: FormInput.shortcut,
        value: currentShortcut,
      })
    );
    handleRegister();
    handleClose();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    let { key } = e;
    const mapping: any = {
      Meta: 'Command',
    };
    key = mapping[key] ? mapping[key] : key;
    setCurrentShortcut((prevState) =>
      prevState ? `${prevState}+${key}` : `${key}`
    );
  };

  const handleDelete = () => {
    handleUnregister(currentShortcut);
    setCurrentShortcut('');
    dispatch(
      updateMapping({
        key: index,
        field: FormInput.shortcut,
        value: '',
      })
    );
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onKeyDown={handleKeyDown}
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your keybord shortcut combination then click submit to set
          </DialogContentText>
          <FormShortcutDisplayInput
            currentShortcut={currentShortcut}
            handleDelete={handleDelete}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
