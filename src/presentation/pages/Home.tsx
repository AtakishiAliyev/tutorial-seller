import SearchInput from '@presentation/shared/ui/SearchInput.tsx';
import SortDropdown from '@presentation/shared/ui/SortDropdown.tsx';
import CourseFilter from '@presentation/widgets/course/CourseFilter.tsx';
import CourseList from '@presentation/widgets/course/CourseList.tsx';
import PublicCoursesAdapter from '@presentation/widgets/course/PublicCoursesAdapter.tsx';

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Course Grid */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">All Courses</h2>
            <div className="flex justify-between gap-2 w-full">
              <CourseFilter
                className="w-full"
                searchSlot={
                  <SearchInput
                    placeholder="Search course..."
                    className="w-full max-w-[400px]"
                    debounceTimeout={1000}
                    queryKey="search"
                  />
                }
                sortSlot={<SortDropdown className="w-fit" queryKey="sort" />}
              />
            </div>
          </div>
          <PublicCoursesAdapter>
            <CourseList />
          </PublicCoursesAdapter>
        </div>
      </div>
    </main>
  );
};

export default Home;
