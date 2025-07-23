const Card = ({ course }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Course Image */}
      <div className="aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Course Info */}
      <div className="p-4 space-y-4">
        {/* Title and Metadata */}
        <div>
          <h4 className="font-semibold text-gray-900 text-lg mb-1">
            {course.title}
          </h4>
          <p className="text-sm text-gray-600">
            {course.type} • By {course.instructor}
          </p>
        </div>

        {/* Next Lesson */}
        <div>
          <p className="text-sm text-gray-700 mb-3">
            <span className="font-medium">Next lesson:</span>{" "}
            {course.nextLesson}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Progress</span>
            <span className="text-xs font-semibold text-gray-900">
              {course.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        {/* View Content Button */}
        <button className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
          View content
        </button>
      </div>
    </div>
  );
};

export default Card;
