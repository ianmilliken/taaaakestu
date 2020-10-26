/* eslint-disable no-use-before-define */
import React, { ReactNode, SyntheticEvent } from 'react';
import styles from './Button.module.scss';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  fill?: boolean;
  size?: 'small' | 'large' | undefined;
  mode?: 'ghost' | 'alert' | undefined;
  onClick?: ((ev: SyntheticEvent) => void) | undefined;
};

const Button: React.FC<Props> = ({
  children,
  disabled = false,
  selected = false,
  fill = false,
  size = undefined,
  mode = undefined,
  onClick = undefined,
}: Props) => {
  let classNames = styles.button;

  if (selected) classNames = classNames.concat(' ', styles.buttonModeSelected);

  if (fill) classNames = classNames.concat(' ', styles.buttonFill);

  if (size === 'small') {
    classNames = classNames.concat(' ', styles.buttonSizeS);
  } else if (size === 'large') {
    classNames = classNames.concat(' ', styles.buttonSizeL);
  }

  if (mode === 'alert') {
    classNames = classNames.concat(' ', styles.buttonModeAlert);
  } else if (mode === 'ghost') {
    classNames = classNames.concat(' ', styles.buttonModeGhost);
  }

  return (
    <button
      type="button"
      className={classNames}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  selected: false,
  fill: false,
  size: undefined,
  mode: undefined,
  onClick: undefined,
};

export default Button;
