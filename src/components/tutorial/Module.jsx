import { PlayCircleOutlined } from "@ant-design/icons";

const Module = ({ title, lessons, isOpen, onToggle }) => {
  // Calculate completed lessons and total duration
  const completedLessons = lessons.filter(
    (lesson) => lesson.status === "completed"
  ).length;
  const totalLessons = lessons.length;
  const totalDuration = lessons.reduce(
    (total, lesson) => total + (lesson.duration || 0),
    0
  );

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      {/* Module Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 text-base">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {completedLessons} / {totalLessons} | {totalDuration}min
          </p>
        </div>
        <div className="ml-4">
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Module Content */}
      {isOpen && (
        <div className="border-t border-gray-200">
          <div className="p-4 space-y-3">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              >
                {/* Checkbox */}
                <div className="mt-1">
                  <input
                    type="checkbox"
                    checked={lesson.status === "completed"}
                    readOnly
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      lesson.status === "completed"
                        ? "text-gray-900"
                        : lesson.status === "current"
                        ? "text-blue-700"
                        : "text-gray-500"
                    }`}
                  >
                    {lesson.number}. {lesson.title}
                  </p>
                  <div className="flex items-center mt-1 space-x-1">
                    {/* Video Icon */}
                    <PlayCircleOutlined className="text-gray-400 text-sm" />
                    <span className="text-xs text-gray-500">
                      {lesson.duration}min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Module;
