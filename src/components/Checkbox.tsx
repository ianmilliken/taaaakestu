/* eslint-disable no-use-before-define */
import React, { ReactNode, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import styles from './Checkbox.module.scss';

type Props = {
  text?: string;
  checked?: boolean;
  onChange: (nextChecked: boolean) => void;
  children?: ReactNode;
};

const Checkbox: React.FC<Props> = ({
  text = '',
  checked = false,
  onChange,
  children,
}: Props) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <label className={styles.container}>
      <span className={styles.checkbox}>
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        <span className={styles.checkboxBox}>
          {isChecked && <FontAwesomeIcon icon={faCheckSquare} />}
        </span>
      </span>
      {!!text && <span>{text}</span>}
      {children}
    </label>
  );
};

Checkbox.defaultProps = {
  text: '',
  checked: false,
  children: <></>,
};

export default Checkbox;
