import React from 'react';

import styled from '@emotion/styled';

import { darkGrey, blizzardBlue } from '@/styles/colors';

const Label = styled.label({
  display: 'block',
  marginBottom: '.2rem',
  fontWeight: 500,
});

const Input = styled.input({
  border: `.5px solid ${darkGrey}`,
  borderRadius: '.375rem',
  padding: '.4rem',
  '&:focus': {
    boxShadow: `0 0 0 1px ${blizzardBlue}`,
    outline: 'none',
  },
});

function TextField({
  label, type = 'text', name, value, onChange,
}) {
  const id = `input-${name}`;

  function handleChange(event) {
    const { target } = event;
    onChange({ name, value: target.value });
  }

  return (
    <div>
      <Label htmlFor={id}>
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default React.memo(TextField);
