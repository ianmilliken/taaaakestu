/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import React, { ReactNode, KeyboardEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Accordion.module.scss';

type Props = {
  title: string;
  children: ReactNode;
};

const Accordion: React.FC<Props> = ({ title, children }: Props) => {
  const [open, setOpen] = useState(false);

  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter') {
      setOpen(!open);
    }
  };

  return (
    <>
      <div
        className={styles.accordion}
        role="button"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
      >
        <h4 className={styles.accordionTitle}>{title}</h4>
        <FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} />
      </div>
      {open && children}
    </>
  );
};

export default Accordion;
