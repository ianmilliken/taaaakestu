/* eslint-disable no-use-before-define */
import React, { ReactNode } from 'react';
import styles from './Container.module.scss';

type ContainerProps = {
  children: ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
