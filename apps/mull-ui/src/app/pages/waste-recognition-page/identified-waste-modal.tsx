import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@material-ui/core';
import { DetectionResult, wasteClassMap } from '@mull/types';
import React from 'react';
import { WasteTypeSvgMap } from '../../../constants';
import './identified-waste-page.scss';

export interface IdentifiedWasteModalProps {
  detectionResult: DetectionResult;
  imageSrc: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IdentifiedWasteModal = ({
  detectionResult,
  imageSrc,
  open,
  setOpen,
}: IdentifiedWasteModalProps) => {
  const mapEntry = wasteClassMap[detectionResult?.class];

  // Despite the modal actually running the below code and rendering a full modal during tests, the coverage metric doesn't pick it up. Therefore ignoring for now
  // istanbul ignore next
  return (
    <Dialog
      open={detectionResult && imageSrc ? open : false}
      onClose={() => setOpen(false)}
      classes={{
        paperWidthSm: 'identified-waste-container',
      }}
      maxWidth="sm"
    >
      <button
        className="identified-waste-modal-close"
        onClick={() => setOpen(false)}
        data-testid="identified-waste-modal-close"
      >
        {<FontAwesomeIcon icon={faTimes} size="2x" color="grey" />}
      </button>

      <div className="identified-waste-modal-title">
        <img src={WasteTypeSvgMap[mapEntry?.category]} alt="waste-icon" />
        <h1>{detectionResult?.class}</h1>
      </div>

      <img src={imageSrc} className="identified-waste-modal-image" alt="selected-waste" />

      <div className="identified-waste-modal-info">{mapEntry?.info}</div>
    </Dialog>
  );
};
export default IdentifiedWasteModal;
