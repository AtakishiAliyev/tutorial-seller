import { TabPanel } from '@headlessui/react';
import Divider from '@presentation/shared/ui/Divider.tsx';
import Text from '@presentation/shared/ui/Typography.tsx';
import ChangePasswordTab from '@presentation/widgets/user/ChangePasswordTab.tsx';
import LogoutTab from '@presentation/widgets/user/LogoutTab.tsx';
import ProfileInfo from '@presentation/widgets/user/ProfileInfo.tsx';
import ProfileTabs from '@presentation/widgets/user/ProfileTabs.tsx';
import UserOwnedCoursesTab from '@presentation/widgets/user/UserOwnedCoursesTab.tsx';
import { memo } from 'react';

const Profile = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container">
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <Text weight="semibold" size="h1">
              Account Settings
            </Text>
            <Text size="subtitle" color="muted">
              Manage your profile, password, and view order history.
            </Text>
          </div>
          <ProfileTabs>
            <TabPanel className="flex flex-col p-8">
              <ProfileInfo />
              <Divider />
              <ChangePasswordTab />
              <Divider />
              <LogoutTab />
            </TabPanel>
            <TabPanel className="flex flex-col p-8">
              <UserOwnedCoursesTab />
            </TabPanel>
          </ProfileTabs>
        </div>
      </div>
    </main>
  );
};

const MemoizedProfile = memo(Profile);

export default MemoizedProfile;
