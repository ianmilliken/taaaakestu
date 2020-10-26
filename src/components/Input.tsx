/* eslint-disable no-use-before-define */
import React, { ChangeEvent, useState, useEffect } from 'react';
import styles from './Input.module.scss';

type Props = {
  defaultValue?: string | number;
  type?: 'text' | 'number';
  helper?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  onChange?: ((value: string) => void) | undefined;
};

const TextInput: React.FC<Props> = ({
  defaultValue = '',
  type = 'text',
  helper = '',
  placeholder = '',
  disabled = false,
  size = 'medium',
  onChange,
}: Props) => {
  const [value, setValue] = useState(defaultValue);

  const getClassName = () => {
    switch (size) {
      case 'xsmall':
        return styles.XSmall;
      case 'small':
        return styles.Small;
      case 'large':
        return styles.Large;
      case 'medium':
      default:
        return styles.Medium;
    }
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const nextValue = ev.currentTarget.value;
    setValue(nextValue);
    if (onChange) onChange(nextValue);
  };

  const input = (
    <input
      className={getClassName()}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  if (helper) {
    return (
      <div className={styles.withHelper}>
        {input}
        <span>{helper}</span>
      </div>
    );
  }

  return input;
};

TextInput.defaultProps = {
  defaultValue: '',
  type: 'text',
  helper: '',
  placeholder: '',
  disabled: false,
  size: 'medium',
  onChange: undefined,
};

export default TextInput;
