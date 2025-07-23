import { useState } from "react";
import {
  CloseOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Module from "./Module";

const Sidebar = ({ onClose }) => {
  // State for accordion - only one module can be open at a time
  const [openModule, setOpenModule] = useState(0); // First module open by default

  // Module data with lessons, numbers, and durations
  const modules = [
    {
      title: "Section 29: Dynamic Programming",
      lessons: [
        {
          number: 242,
          title: "Intro to Dynamic Programming",
          status: "completed",
          duration: 5,
        },
        {
          number: 243,
          title: "Overlapping Subproblems",
          status: "completed",
          duration: 6,
        },
        {
          number: 244,
          title: "Optimal Substructure",
          status: "current",
          duration: 6,
        },
        {
          number: 245,
          title: "Writing A Recursive Solution",
          status: "locked",
          duration: 7,
        },
        {
          number: 246,
          title: "Time Complexity of Our Solution",
          status: "locked",
          duration: 4,
        },
        {
          number: 247,
          title: "The Problem With Our Solution",
          status: "locked",
          duration: 4,
        },
        {
          number: 248,
          title: "Enter Memoization!",
          status: "locked",
          duration: 9,
        },
        {
          number: 249,
          title: "Time Complexity of Memoized Solution",
          status: "locked",
          duration: 3,
        },
        {
          number: 250,
          title: "Tabulation: A Bottom Up Approach",
          status: "locked",
          duration: 7,
        },
      ],
    },
    {
      title: "Section 30: Advanced Algorithms",
      lessons: [
        {
          number: 251,
          title: "Graph Algorithms",
          status: "locked",
          duration: 8,
        },
        {
          number: 252,
          title: "Tree Traversal",
          status: "locked",
          duration: 10,
        },
        {
          number: 253,
          title: "Sorting Algorithms",
          status: "locked",
          duration: 12,
        },
      ],
    },
    {
      title: "Section 31: Final Projects",
      lessons: [
        {
          number: 254,
          title: "Final Project Setup",
          status: "locked",
          duration: 15,
        },
        {
          number: 255,
          title: "Project Implementation",
          status: "locked",
          duration: 20,
        },
      ],
    },
  ];

  const handleModuleToggle = (moduleIndex) => {
    setOpenModule(openModule === moduleIndex ? -1 : moduleIndex);
  };

  // Calculate overall progress
  const allLessons = modules.flatMap((module) => module.lessons);
  const completedLessons = allLessons.filter(
    (lesson) => lesson.status === "completed"
  ).length;
  const totalLessons = allLessons.length;
  const totalDuration = allLessons.reduce(
    (total, lesson) => total + lesson.duration,
    0
  );
  const completedDuration = allLessons
    .filter((lesson) => lesson.status === "completed")
    .reduce((total, lesson) => total + lesson.duration, 0);
  const progressPercentage = Math.round(
    (completedLessons / totalLessons) * 100
  );

  return (
    <div className="w-80 sm:w-96 lg:w-96 bg-white shadow-sm border-r border-gray-200 h-screen overflow-y-auto scrollbar-hide flex flex-col">
      <div className="flex-1 p-4 sm:p-6">
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between mb-6 lg:block">
          <h2 className="text-lg font-semibold text-gray-900">
            Course Content
          </h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <CloseOutlined className="text-gray-500" />
          </button>
        </div>

        {/* Course Modules */}
        <div className="space-y-4">
          {modules.map((module, index) => (
            <Module
              key={index}
              title={module.title}
              lessons={module.lessons}
              isOpen={openModule === index}
              onToggle={() => handleModuleToggle(index)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Progress Section */}
      <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
        {/* Overall Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TrophyOutlined className="text-blue-600" />
              <span className="text-sm font-medium text-gray-900">
                Course Progress
              </span>
            </div>
            <span className="text-sm font-bold text-blue-600">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        {/* Time Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ClockCircleOutlined className="text-gray-500 text-sm" />
              <span className="text-xs text-gray-600">Time Completed</span>
            </div>
            <span className="text-xs font-medium text-gray-900">
              {completedDuration}min / {totalDuration}min
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Estimated remaining</span>
            <span className="text-xs font-medium text-gray-900">
              {totalDuration - completedDuration}min
            </span>
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs text-blue-600 font-bold">🎯</span>
            </div>
            <div>
              <p className="text-xs font-medium text-blue-900">
                Next Milestone
              </p>
              <p className="text-xs text-blue-700">
                Complete Section 29 to unlock advanced topics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
