import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import FormInputs from './FormInputs';

export default function Form({ getForm }) {
  const mapping = useSelector((state) => state.mapping);
  const [count, setCount] = useState(1);
  const updateCount = (event: any, value: number) => {
    setCount(() => value);
  };

  const createForm = (count: number) => {
    const rows = [];
    for (let i = 0; i < count; i++) {
      rows.push(<FormInputs key={i} index={i} />);
    }
    return rows;
  };

  return (
    <div>
      <Typography id="discrete-slider" gutterBottom>
        Pedals
      </Typography>
      <Slider
        defaultValue={1}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        onChange={updateCount}
      />

      {createForm(count)}
      <div>Current State: {JSON.stringify(mapping)}</div>
    </div>
  );
}
