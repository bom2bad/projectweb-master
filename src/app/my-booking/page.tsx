"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Booking = {
  date: string | null;
  time: string | null;
  room: string | null;
};

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      setUserName(currentUser.name);
    }
  }, []);

  const handleDelete = (index: number) => {
    const confirmed = confirm("ต้องการยกเลิกการจองนี้หรือไม่?");
    if (confirmed) {
      const newBookings = bookings.filter((_, i) => i !== index);
      setBookings(newBookings);
      localStorage.setItem("bookings", JSON.stringify(newBookings));
      alert("ยกเลิกการจองเรียบร้อย");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center justify-between shadow-md bg-gradient-to-r to-blue-600 p-5 text-white">
        <img
          src="https://www.mju.ac.th/th/images/mju_logo_main-resize.png"
          alt="MJU Logo"
          className="h-16 w-auto"
        />
        <h2 className="text-xl font-semibold">
          {userName ? `${userName}` : "ผู้ใช้งานทั่วไป"}
        </h2>
      </header>

      <div className="flex-1 p-10">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto relative">
          <Link
            href="/home"
            className="absolute top-6 right-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            กลับหน้าหลัก
          </Link>
          
          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            ข้อมูลการจองห้องของฉัน
          </h1>

          {bookings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600 text-lg">ยังไม่มีการจอง</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b, index) => (
                <div
                  key={index}
                  className="p-5 border rounded-lg shadow-sm bg-blue-50 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-blue-800 mb-2">
                        {b.room || "ไม่ระบุห้อง"}
                      </p>
                      <div className="space-y-1 text-gray-700">
                        <p>
                          <strong>วันที่:</strong> {b.date || "ไม่ระบุ"}
                        </p>
                        <p>
                          <strong>เวลา:</strong> {b.time || "ไม่ระบุ"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="bg-gray-50 text-center p-4 shadow-inner">
        <p className="text-gray-500">© 2024 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}