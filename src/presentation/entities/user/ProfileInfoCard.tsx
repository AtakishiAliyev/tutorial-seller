import { Input } from '@presentation/shared/ui/Input.tsx';
import { FC, memo } from 'react';

type UserInfoCardProps = {
  label?: string;
  value?: string;
};

const ProfileInfoCard: FC<UserInfoCardProps> = ({ value, label }) => {
  return (
    <Input.Group>
      <Input.Label>{label || 'Information'}</Input.Label>
      <Input
        className="disabled:opacity-65"
        type="text"
        disabled={true}
        readOnly
        defaultValue={value || ''}
      />
    </Input.Group>
  );
};

const MemoizedUserInfoCard = memo(ProfileInfoCard);

export default MemoizedUserInfoCard;
