import React, { useState } from 'react';
import FormInputs from './FormInputs';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';

export default function Form() {
  const [count, setCount] = useState(1);
  const [form, setForm] = useState({});
  const updateForm = (value: any, key: number) => {
    setForm((prevState) => ({ ...prevState, [key]: value }));
  };
  const updateCount = (event: any, value: number) => {
    setCount(() => value);
  };

  const createForm = (count: number) => {
    const rows = [];
    for (let i = 0; i < count; i++) {
      rows.push(<FormInputs key={i} index={i} updateForm={updateForm} />);
    }
    return rows;
  };

  return (
    <div>
      <Typography id="discrete-slider" gutterBottom>
        Temperature
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
      <div>Current State: {JSON.stringify(form)}</div>

      {createForm(count)}
    </div>
  );
}
