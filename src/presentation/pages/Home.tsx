import CourseList from '@presentation/widgets/course/CourseList.tsx';
import PublicCoursesAdapter from '@presentation/widgets/course/PublicCoursesAdapter.tsx';

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Browse products</h1>
          {/* Search and Sort */}
          <div className="flex flex-col justify-between sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search Bar */}
            <div className="flex-1 max-w-md relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/*<SearchOutlined className="h-4 w-4 text-gray-400" />*/}
              </div>
              <input
                type="text"
                placeholder="Search product names"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 sm:min-w-0 sm:w-auto">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</span>
              {/*<Select*/}
              {/*  className="min-w-[150px]"*/}
              {/*  size="large"*/}
              {/*  value="in-progress"*/}
              {/*  options={[*/}
              {/*    { value: 'in-progress', label: 'In progress' },*/}
              {/*    { value: 'completed', label: 'Completed' },*/}
              {/*    { value: 'alphabetical', label: 'Alphabetical' },*/}
              {/*  ]}*/}
              {/*/>*/}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <PublicCoursesAdapter>
          <CourseList />
        </PublicCoursesAdapter>
      </div>
    </main>
  );
};

export default Home;
