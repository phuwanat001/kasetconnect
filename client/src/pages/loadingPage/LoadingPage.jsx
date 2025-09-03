import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* วงกลม Loading */}
        <div className="w-16 h-16 border-5 border-blue-400 border-dashed rounded-full animate-spin"></div>

        {/* ข้อความ */}
        <p className="mt-6 text-gray-700 text-lg font-semibold animate-pulse">
          กำลังโหลดข้อมูล...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
