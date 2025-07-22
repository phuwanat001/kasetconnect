import React from 'react';

function Category() {
  const categories = [
    { id: 1, name: 'รถแทรกเตอร์', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'รถเกี่ยวข้าว', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'เครื่องสูบน้ำ', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'โดรนพ่นยา', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-[var(--primary-green)] mb-6">หมวดหมู่เครื่องจักร</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="border rounded-xl shadow hover:shadow-lg p-4 text-center">
            <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover rounded-md mb-3" />
            <p className="text-lg font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
