import { MenuOutlined } from "@ant-design/icons";

const Content = ({ onToggleSidebar }) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Content Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MenuOutlined className="text-gray-600" />
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Setup Environment
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Learn how to set up your development environment
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Previous
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Next Lesson
            </button>
          </div>
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="sm:hidden mt-4 flex space-x-3">
          <button className="flex-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg">
            Previous
          </button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Next Lesson
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Video/Content Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 sm:mb-8">
            <div className="aspect-video bg-gray-900 rounded-t-lg flex items-center justify-center">
              <div className="text-center text-white px-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-base sm:text-lg font-medium">
                  Video: Setting Up Your Environment
                </p>
                <p className="text-gray-300 text-sm">Duration: 15:30</p>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Lesson Overview
              </h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                In this lesson, you'll learn how to set up your development
                environment for modern web development. We'll cover installing
                the necessary tools, configuring your IDE, and setting up a
                basic project structure.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
                  What you'll learn:
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0"></span>
                    Installing Node.js and npm
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0"></span>
                    Setting up VS Code with extensions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0"></span>
                    Creating your first project
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0"></span>
                    Understanding project structure
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">
                  Resources
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="#"
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        Setup Guide PDF
                      </p>
                      <p className="text-xs text-gray-500">
                        Download detailed setup instructions
                      </p>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        Starter Code
                      </p>
                      <p className="text-xs text-gray-500">
                        Download the project template
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
