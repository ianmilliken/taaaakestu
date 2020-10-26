/* eslint-disable no-use-before-define */
import React, { ReactNode } from 'react';
import styles from './Card.module.scss';

type CardProps = {
  children: ReactNode;
  extraClassNames?: string;
};

const Card: React.FC<CardProps> = ({
  children,
  extraClassNames = '',
}: CardProps) => {
  return <div className={`${styles.card} ${extraClassNames}`}>{children}</div>;
};

Card.defaultProps = {
  extraClassNames: '',
};

export default Card;
