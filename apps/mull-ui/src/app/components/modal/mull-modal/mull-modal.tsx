import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@material-ui/core';
import React, { ReactNode } from 'react';
import './mull-modal.scss';

export interface MullModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  paperClasses?: string;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function MullModal({
  open,
  setOpen,
  children,
  paperClasses,
  maxWidth = 'sm',
}: MullModalProps) {
  paperClasses = `${paperClasses} mull-modal-container`;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth={maxWidth}
      classes={{
        paperWidthXs: paperClasses,
        paperWidthSm: paperClasses,
        paperWidthMd: paperClasses,
        paperWidthLg: paperClasses,
        paperWidthXl: paperClasses,
      }}
    >
      <button
        className="mull-modal-close-button"
        onClick={() => setOpen(false)}
        data-testid="mull-modal-close-button"
      >
        {<FontAwesomeIcon icon={faTimes} size="2x" color="grey" />}
      </button>
      {children}
    </Dialog>
  );
}

export default MullModal;
