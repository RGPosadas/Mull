import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { WasteType } from '../../services/maps';
import './identified-waste-page.scss';

export interface IdentifiedWasteModalProps {
  wasteIcon?: WasteType;
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
  wasteIcon = WasteType.RECYCLABLE;
  wasteTitle = 'This is recyclable!';
  wastePicture = 'http://pm1.narvii.com/5951/2922186bdf76edeb36250994eb99f1c32f31aea9_00.jpg';
  wasteInfo = 'Needs to be cleaned before recycling. Otherwise it goes to trashbin.';
  return (
    <div className="identified-waste-container">
      <div className="close-button">
        <button>{<FontAwesomeIcon icon={faTimes} size="2x" color="grey" />}</button>
      </div>
      <div className="waste-title">
        <h1>
          {wasteIcon} {wasteTitle}
        </h1>
      </div>
      <div className="waste-picture-container">
        <img src={wastePicture} className="waste-picture" />
      </div>
      <div className="waste-info"> {wasteInfo}</div>
    </div>
  );
};
export default IdentifiedWasteModal;
