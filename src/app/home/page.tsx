"use client";

import Link from "next/link";
import { useState, useEffect } from "react";


export default function Home() {
  // เป็นการดึงข้อมูลผู้ใช้ปัจจุบันจาก localStorage
  const [userName, setUserName] = useState<string | null>(null);

  
   
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      setUserName(currentUser.name);
    }
  }, []);
 
 
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 ">
      {/* shadow บนสุด */}
      <div className="flex justify-between  shadow p-5 bg-gradient-to-r to-blue-600">

        <img src="https://www.mju.ac.th/th/images/mju_logo_main-resize.png" alt="MJU Logo"
          width="350"
          height="auto" />

        {/* <h1 className="text-3xl font-bold ">Hello, Next.js!</h1> */}

          <h2 className="text-right text-xl font-semibold text-white"> {/* เป็นการดึงข้อมูลผู้ใช้ปัจจุบันจาก localStorage */}
        {userName ? `สวัสดีคุณ ${userName}` : "ผู้ใช้งานทั่วไป"}
      </h2>
      </div>

      {/* shadow ตรงกลาง */}
      <div className="shadow-lg shadow-red p-3   rounded justify-center  text-center space-x-4 bg-gradient-to-r to-blue-600">

        <Link href="/home" className="text-grey-400 hover:text-gray-400 px-4">
          หน้าหลัก 
        </Link>
        <Link href="/home" className="text-grey-400 hover:text-gray-400 px-4">
          การจองห้อง
        </Link>
        <Link href="/home" className="text-grey-400 hover:text-gray-400 px-4">
          ตรวจสอบการจอง 
        </Link>
        <Link href="/search-room" className="text-grey-400 hover:text-gray-400 px-4">
          ค้นหาห้อง 🔍︎
        </Link>
        
        
        
      </div>
      <div className="p-10 flex justify-center">
        <Link href="/room/" className="hover:scale-105 transition-transform  ">
          <h1 className="text-2xl   bg-white shadow-lg p-5 w-80 rounded-lg text-right ">การจองห้อง
            <p className="text-gray-500 text-sm text-right">Booking a room</p>
          </h1>

        </Link>
        <Link href="/my-booking/" className="hover:scale-105 transition-transform  px-10">
          <h1 className="text-2xl  bg-white shadow-lg p-5 w-80 rounded-lg text-right">ข้อมูลการจองห้อง
            <p className="text-gray-500 text-sm text-right">Room booking information</p>
          </h1>
        </Link>
        <Link href="/room/" className="hover:scale-105 transition-transform  ">
          <h1 className="text-2xl  bg-white shadow-lg p-5 w-80 rounded-lg text-right">ข้อปฏิบัติการใช้ห้อง
            <p className="text-gray-500 text-sm text-right">Room usage rules</p>
          </h1>
        </Link>
      </div>
      <div className="p-2   flex justify-center">
        <Link href="/room/" className="hover:scale-105 transition-transform  px-10">
          <h1 className="text-2xl   bg-white shadow-lg p-5 w-80 rounded-lg text-right">
            ข้อปฏิบัติการใช้ห้อง<p className="text-gray-500 text-sm text-right">Room usage rules</p></h1>
        </Link>
      </div>
      <footer className="flex-1 bg-gray-50 text-center p-4 shadow-inner mt-50">
        <p className="text-gray-500">© 2024 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}
