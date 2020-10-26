/* eslint-disable no-use-before-define */
import React, { ReactNode } from 'react';
import styles from './ButtonGroup.module.scss';

type Props = {
  children: ReactNode;
};

const ButtonGroup: React.FC<Props> = ({ children }: Props) => {
  return <div className={styles.buttonGroup}>{children}</div>;
};

export default ButtonGroup;
