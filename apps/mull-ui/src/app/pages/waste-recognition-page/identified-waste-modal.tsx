import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';
import { svgMap } from '../../../utilities';
import './identified-waste-page.scss';

export interface IdentifiedWasteModalProps {
  wasteIcon?: string;
  wasteTitle?: string;
  wastePicture?: string;
  wasteInfo?: string;
}

export const IdentifiedWasteModal = ({
  wasteIcon,
  wasteTitle,
  wastePicture,
  wasteInfo,
}: IdentifiedWasteModalProps) => {
  wasteIcon = '../../.' + svgMap[1];
  wasteTitle = 'This is recyclable!';
  wastePicture = 'http://pm1.narvii.com/5951/2922186bdf76edeb36250994eb99f1c32f31aea9_00.jpg';
  wasteInfo = 'Needs to be cleaned before recycling. Otherwise it goes to trashbin.';

  const [open, setOpen] = useState(false);

  return (
    <div className="identified-waste-container">
      <div onClick={() => setOpen(true)} data-testid="open-modal">
        <button>CLICK HERE</button>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} data-testid="close-modal">
        <div className="close-button" onClick={() => setOpen(false)}>
          <button>{<FontAwesomeIcon icon={faTimes} size="2x" color="grey" />}</button>
        </div>
        <div className="waste-title">
          <img src={wasteIcon} alt="waste-icon" />
          <h1>{wasteTitle}</h1>
        </div>
        <div className="waste-picture-container">
          <img src={wastePicture} className="waste-picture" alt="selected-waste" />
        </div>
        <div className="waste-info"> {wasteInfo}</div>
      </Dialog>
    </div>
  );
};
export default IdentifiedWasteModal;
