import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@material-ui/core';
import { DetectionResult } from '@mull/types';
import { WasteTypeSvgMap } from 'apps/mull-ui/src/constants';
import React from 'react';
import { categoryMap } from '../../services/maps';
import './identified-waste-page.scss';

export interface IdentifiedWasteModalProps {
  detectionResult?: DetectionResult;
  imageSrc: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IdentifiedWasteModal = ({
  detectionResult = null,
  imageSrc = null,
  open,
  setOpen,
}: IdentifiedWasteModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      data-testid="close-modal"
      classes={{
        paperWidthSm: 'identified-waste-container',
      }}
      maxWidth="sm"
    >
      <div className="identified-waste-modal-close" onClick={() => setOpen(false)}>
        <button>{<FontAwesomeIcon icon={faTimes} size="2x" color="grey" />}</button>
      </div>
      <div className="identified-waste-modal-title">
        <img src={WasteTypeSvgMap[categoryMap[detectionResult?.class]]} alt="waste-icon" />
        <h1>{detectionResult?.class}</h1>
      </div>

      <img src={imageSrc} className="identified-waste-modal-picture" alt="selected-waste" />

      <div className="identified-waste-modal-info">ahhh</div>
    </Dialog>
  );
};
export default IdentifiedWasteModal;
