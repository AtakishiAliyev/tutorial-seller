import { SearchOutlined } from "@ant-design/icons";
import { Select } from "antd";
import Card from "../components/dashboard/Card";

const Dashboard = () => {
  // Sample course data - you can make this dynamic later
  const courses = [
    {
      id: 1,
      title: "SIFIRDAN ZIRVEYE YOUTUBE OTOMASYONU",
      instructor: "Akademi Destek 2",
      type: "Course",
      nextLesson: "Algoritma Güncellemesi ve En Çok...",
      progress: 94,
      thumbnail:
        "https://static-media.hotmart.com/B5i1rbX1m-JXZrQxbOzA5C5HrDo=/848x478/https://uploads.teachablecdn.com/attachments/vSeS9ThvTBycyRQCszKf_SIFIRDAN+ZI%CC%87RVEYE+YT+KAPAG%CC%86II.jpg",
      status: "in-progress",
    },
    {
      id: 2,
      title: "SIFIRDAN ZIRVEYE YOUTUBE OTOMASYONU",
      instructor: "Code Academy",
      type: "Course",
      nextLesson: "React Router ve Navigation...",
      progress: 67,
      thumbnail:
        "https://static-media.hotmart.com/B5i1rbX1m-JXZrQxbOzA5C5HrDo=/848x478/https://uploads.teachablecdn.com/attachments/vSeS9ThvTBycyRQCszKf_SIFIRDAN+ZI%CC%87RVEYE+YT+KAPAG%CC%86II.jpg",
      status: "in-progress",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Browse products
          </h1>

          {/* Search and Sort */}
          <div className="flex flex-col justify-between sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search Bar */}
            <div className="flex-1 max-w-md relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchOutlined className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search product names"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 sm:min-w-0 sm:w-auto">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Sort by:
              </span>
              <Select
                className="min-w-[150px]"
                size="large"
                value="in-progress"
                options={[
                  { value: "in-progress", label: "In progress" },
                  { value: "completed", label: "Completed" },
                  { value: "alphabetical", label: "Alphabetical" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} course={course} />
          ))}
        </div>

        {/* No Results */}
        {courses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchOutlined className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
