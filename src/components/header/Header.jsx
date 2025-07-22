import { TrophyOutlined } from "@ant-design/icons";

const Header = () => {
  // Sample progress percentage - you can make this dynamic later
  const progressPercentage = 50;

  // Determine border color and icon color based on progress
  const getProgressStyles = (progress) => {
    if (progress >= 80) {
      return {
        borderColor: "border-green-400",
        iconColor: "text-green-400",
        bgColor: "bg-green-50",
      };
    } else if (progress >= 50) {
      return {
        borderColor: "border-yellow-400",
        iconColor: "text-yellow-400",
        bgColor: "bg-yellow-50",
      };
    } else {
      return {
        borderColor: "border-red-400",
        iconColor: "text-red-400",
        bgColor: "bg-red-50",
      };
    }
  };

  const progressStyles = getProgressStyles(progressPercentage);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-red-600 tracking-tight">
                YouTube
              </h1>
            </div>
          </div>

          {/* Progress Section */}
          <div className="flex items-center">
            <div className="flex items-center bg-gray-900 text-white rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-800 transition-colors duration-200">
              {/* Trophy Icon with Dynamic Border */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 border-2 ${progressStyles.borderColor} ${progressStyles.bgColor} transition-all duration-300`}
              >
                <TrophyOutlined
                  className={`text-sm ${progressStyles.iconColor}`}
                />
              </div>

              {/* Progress Text with Percentage */}
              <div className="flex flex-col">
                <span className="text-xs font-medium">Your progress</span>
                <span className="text-xs text-gray-400">
                  {progressPercentage}% complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
