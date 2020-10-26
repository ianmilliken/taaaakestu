/* eslint-disable no-use-before-define */
import React, { ReactNode, useEffect, useState } from 'react';
import Card from './Card';
import styles from './Dialog.module.scss';

type Props = {
  open?: boolean;
  children: ReactNode;
};

const Dialog: React.FC<Props> = ({ open = false, children }: Props) => {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  if (show) {
    return (
      <div className={styles.overlay}>
        <Card>
          <div className={styles.dialog}>
            <div>{children}</div>
          </div>
        </Card>
      </div>
    );
  }

  return null;
};

Dialog.defaultProps = {
  open: false,
};

export default Dialog;
