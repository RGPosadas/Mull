import { User } from 'apps/mull-ui/src/generated/graphql';
import { avatarUrl } from 'apps/mull-ui/src/utilities';
import React from 'react';
import { MullButton } from '../../mull-button/mull-button';
import { MullModal } from '../mull-modal/mull-modal';
import './friend-modal.scss';

export interface FriendModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  paperClasses?: string;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  user: Partial<User>;
  button1Text?: string;
  button1OnClick?: React.MouseEventHandler<HTMLButtonElement>;
  button2Text?: string;
  button2OnClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function FriendModal({
  open,
  setOpen,
  paperClasses,
  maxWidth,
  user,
  button1Text,
  button1OnClick,
  button2Text,
  button2OnClick,
}: FriendModalProps) {
  return (
    <MullModal open={open} setOpen={setOpen} paperClasses={paperClasses} maxWidth={maxWidth}>
      <img src={avatarUrl(user)} className="user-profile-picture"></img>
      <div className="friend-modal-username">{user?.name}</div>
      {button1Text && button1OnClick && (
        <MullButton onClick={button1OnClick} className="friend-modal-button" altStyle>
          {button1Text}
        </MullButton>
      )}
      {button2Text && button2OnClick && (
        <MullButton onClick={button2OnClick} className="friend-modal-button" altStyle>
          {button2Text}
        </MullButton>
      )}
    </MullModal>
  );
}

export default FriendModal;
