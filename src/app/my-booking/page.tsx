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

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          การจองของฉัน
        </h1>

        {bookings.length === 0 ? (
          <p className="text-gray-600 text-center">ยังไม่มีการจอง</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg shadow-sm bg-blue-50"
              >
                <p>
                  <strong>ห้อง:</strong> {b.room}
                </p>
                <p>
                  <strong>วันที่:</strong> {b.date}
                </p>
                <p>
                  <strong>เวลา:</strong> {b.time}
                </p>
              </li>
            ))}
          </ul>
        )}
        <div>
            <Link href="/home/"
      className="hover:scale-103 transition-transform inline-block">
      <div className="bg-white shadow-lg p-5 w-30 rounded-lg text-center font-semibold">
        กดเพื่อเข้าสู่หน้าหลัก
      </div>
    </Link>
        </div>
      </div>
    </div>
  );
}
