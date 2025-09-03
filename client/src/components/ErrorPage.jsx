import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">เกิดข้อผิดพลาด!</h1>
      <p className="text-lg mb-2">{error?.status || "Error"} - {error?.statusText || error?.message || "ไม่พบหน้าที่คุณต้องการ"}</p>
      <pre className="bg-white p-4 rounded shadow text-gray-700 max-w-xl overflow-x-auto">
        {error?.data || JSON.stringify(error, null, 2)}
      </pre>
      <button onClick={() => window.history.back()} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">ย้อนกลับ</button>
    </div>
  );
}
