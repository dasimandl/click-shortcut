import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import KeyboardIcon from '@material-ui/icons/Keyboard';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { Icon } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

export default function FormShortcutDisplayInput({
  currentShortcut,
  handleDelete,
}: {
  currentShortcut: string;
  // TODO: Create a Function interface (possibily an abstract class)
  handleDelete: any;
}) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <Icon className={classes.iconButton} aria-label="menu">
        <KeyboardIcon />
      </Icon>
      <InputBase
        className={classes.input}
        value={currentShortcut}
        placeholder="Start typing to create shortcut"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="close"
        onClick={handleDelete}
      >
        <CloseOutlined />
      </IconButton>
    </Paper>
  );
}
