/* eslint-disable no-use-before-define */
import React, { ReactNode } from 'react';
import { Tooltip } from 'react-tippy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './FormGroup.module.scss';

type Props = {
  label: string;
  tooltip?: string;
  children: ReactNode;
};

const FormGroup: React.FC<Props> = ({
  label,
  tooltip = '',
  children,
}: Props) => {
  return (
    <div className={styles.formGroup}>
      <div>
        {!!tooltip && (
          <Tooltip title={tooltip} position="bottom" arrow size="big">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className={styles.formGroupTooltip}
            />
          </Tooltip>
        )}
        <label>{label}</label>
      </div>
      <div>{children}</div>
    </div>
  );
};

FormGroup.defaultProps = {
  tooltip: '',
};

export default FormGroup;
