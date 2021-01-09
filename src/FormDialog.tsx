import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';

export default function FormDialog({
  index,
  buttonText,
}: {
  index: number;
  buttonText: string;
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [currentShortcut, setCurrentShortcut] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {};

  const handleKeyDown = (e: KeyboardEvent) => {
    let { key } = e;
    const mapping: any = {
      Meta: 'Command',
    };
    key = mapping[key] ? mapping[key] : key;
    setCurrentShortcut((prevState) =>
      prevState ? `${prevState}+${key}` : `${key}`
    );

    console.log(
      '🚀 ~ file: FormInputs.tsx ~ line 71 ~ handleKeyDown ~ key',
      key
    );
  };

  const handleClear = () => {
    setCurrentShortcut('');
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
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="shortcut"
            type="email"
            value={currentShortcut}
            fullWidth
          /> */}
          <div>Current Shortcut: {currentShortcut}</div>
          <button onClick={handleClear}>Clear</button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
