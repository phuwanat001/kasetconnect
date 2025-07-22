import React from 'react';

function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-[var(--primary-green)] mb-6">ติดต่อเรา</h1>

      <div className="space-y-4 text-lg text-gray-700">
        <p>หากคุณมีคำถาม ข้อเสนอแนะ หรือปัญหาเกี่ยวกับการใช้งาน กรุณาติดต่อเราผ่านช่องทางด้านล่าง</p>

        <div>
          <p><strong>อีเมล:</strong> kasetconnect@example.com</p>
          <p><strong>โทรศัพท์:</strong> 02-123-4567</p>
          <p><strong>ที่อยู่:</strong> 123 หมู่ 4 ต.เกษตร อ.เมือง จ.กรุงเทพ 10000</p>
        </div>

        <p>เรายินดีให้บริการคุณในเวลาทำการ: จันทร์ - ศุกร์ เวลา 9.00 - 17.00 น.</p>
      </div>
    </div>
  );
}

export default Contact;
