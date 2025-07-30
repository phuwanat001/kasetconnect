import React from 'react'

const Search = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-7">ค้นหาอุปกรณ์</h1>
      <input
        type="text"
        placeholder="พิมพ์คำค้นหา..."
        className="border p-2 rounded w-full max-w-md"
      />
      {/* สามารถเพิ่มผลลัพธ์การค้นหาได้ภายหลัง */}
    </div>
  )
}

export default Search

