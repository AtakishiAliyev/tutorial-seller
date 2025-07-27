import { Resource } from '@infra/dto/course/GetCourseDetailDto.ts'; // Убедись, что путь верный
import { FileText } from 'lucide-react';
import { FC, memo } from 'react';

type LessonResourcesProps = {
  resources: Resource[];
};

const ResourceItem: FC<Resource> = ({ name, resourceUrl }) => {
  return (
    <a
      href={resourceUrl}
      download // Этот атрибут заставляет браузер скачивать файл
      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
        <FileText className="w-5 h-5 text-blue-600" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-xs text-gray-500">Click to download</p>
      </div>
    </a>
  );
};

const MemoizedResourceItem = memo(ResourceItem);

const LessonResources: FC<LessonResourcesProps> = ({ resources }) => {
  if (!resources || resources.length === 0) {
    return null; // Не рендерим ничего, если ресурсов нет
  }

  return (
    <div className="border-t border-gray-200 pt-6">
      <h4 className="font-medium text-gray-900 mb-4 text-base sm:text-lg">Resources</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map(resource => (
          <MemoizedResourceItem key={resource.id} {...resource} />
        ))}
      </div>
    </div>
  );
};

const MemoizedLessonResources = memo(LessonResources);

export default MemoizedLessonResources;
