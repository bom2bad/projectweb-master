"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const room = searchParams.get("room");

  const handleConfirm = () => {
    const newBooking = { date, time, room };

    // ดึงข้อมูลเก่ามาก่อน
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");

    // เก็บข้อมูลใหม่เพิ่มเข้าไป
    saved.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(saved));

    alert("ยืนยันการจองเรียบร้อย ✅");

    // ไปที่หน้า my-bookings
    router.push("/my-booking");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[500px]">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          รายละเอียดการจอง
        </h1>

        <div className="space-y-4 text-gray-800">
          <p>
            <strong>ห้องที่จอง:</strong> {room || "ไม่ระบุ"}
          </p>
          <p>
            <strong>วันที่:</strong> {date || "ไม่ระบุ"}
          </p>
          <p>
            <strong>เวลา:</strong> {time || "ไม่ระบุ"}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            ยืนยันการจอง
          </button>
        </div>
      </div>
    </div>
  );
}
