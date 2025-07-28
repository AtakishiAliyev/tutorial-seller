import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';
import { cn } from '@presentation/shared/utils/cn.ts';
import { FC, memo, ReactNode } from 'react';

type ProfileTabsProps = {
  children?: ReactNode;
  tabGroupClassName?: string;
  tabListClassName?: string;
  tabClassName?: string;
};

const ProfileTabs: FC<ProfileTabsProps> = ({
  children,
  tabClassName,
  tabListClassName,
  tabGroupClassName,
}) => {
  return (
    <TabGroup
      className={cn(
        'bg-white shadow-md rounded-xl max-w-[900px] w-full mx-auto',
        tabGroupClassName,
      )}
    >
      <TabList className={cn('flex p-1', tabListClassName)}>
        <Tab
          className={({ selected }) => {
            return cn({
              'w-full py-4 text-lg focus:border-t-0 border-l-0 border-r-0 outline-none font-medium transition-colors': true,
              'text-red-500 border-b-2 border-red-500': selected,
              'text-gray-500 hover:text-gray-700': !selected,
              [tabClassName || '']: !!tabClassName,
            });
          }}
        >
          Profile
        </Tab>
        <Tab
          className={({ selected }) => {
            return cn({
              'w-full py-4 text-lg focus:border-t-0 border-l-0 border-r-0 outline-none font-medium transition-colors': true,
              'text-red-500 border-b-2 border-red-500': selected,
              'text-gray-500 hover:text-gray-700': !selected,
              [tabClassName || '']: !!tabClassName,
            });
          }}
        >
          My Courses
        </Tab>
      </TabList>
      <TabPanels>{children}</TabPanels>
    </TabGroup>
  );
};

const MemoizedProfileTabs = memo(ProfileTabs);

export default MemoizedProfileTabs;
