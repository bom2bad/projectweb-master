"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const room = searchParams.get("room");
  
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      setUserName(currentUser.name);
    }
  }, []);

  const handleBlur = () => {
    if (time !== "") {
      const num = parseFloat(time);
      if (!isNaN(num)) {
        let formatted = num.toFixed(2);
        let [intPart, decPart] = formatted.split(".");
        if (intPart.length < 2) intPart = intPart.padStart(2, "0");
        setTime(`${intPart}.${decPart}`);
      }
    }
  };

  const handleConfirm = () => {
    if (!date || !time) {
      alert("กรุณาเลือกวันที่และเวลาก่อนยืนยันการจอง");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    
    if (!currentUser) {
      alert("กรุณาเข้าสู่ระบบก่อนทำการจอง");
      router.push("/login");
      return;
    }

    const newBooking = { 
      date, 
      time, 
      room,
      userEmail: currentUser.email,
      userName: currentUser.name,
      bookingDate: new Date().toISOString()
    };

    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    allBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(allBookings));

    alert("ยืนยันการจองเรียบร้อย ✅");
    router.push("/my-booking");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
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

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            รายละเอียดการจอง
          </h1>

          <div className="space-y-6 mb-8">
            {/* ห้องที่เลือก */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-lg">
                <strong>ห้องที่จอง:</strong> {room || "ไม่ระบุ"}
              </p>
            </div>

            {/* เลือกวันที่ */}
            <div className="flex flex-col">
              <label htmlFor="date" className="mb-2 font-medium text-gray-700">
                เลือกวันที่:
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* เลือกเวลา */}
            <div className="flex flex-col">
              <label htmlFor="time" className="mb-2 font-medium text-gray-700">
                เลือกเวลา:
              </label>
              <input
                type="number"
                step="0.01"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                onBlur={handleBlur}
                placeholder="เช่น 14.00"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              ย้อนกลับ
            </button>
            <button
              onClick={handleConfirm}
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              ยืนยันการจอง
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-gray-50 text-center p-4 shadow-inner">
        <p className="text-gray-500">© 2024 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}