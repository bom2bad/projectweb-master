"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BookingPage from "../booking/page";

export default function Root() {
    const router = useRouter();
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [saved, setSaved] = useState<{ date: string; time: string } | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const data = localStorage.getItem("savedTime");
        if (data) setSaved(JSON.parse(data));
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

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const data = { date, time };
        setSaved(data);
        localStorage.setItem("savedTime", JSON.stringify(data));
        alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
    };

    // 👇 เพิ่มให้รองรับชื่อห้อง
    const handleBookRoom = (roomName: string) => {
        if (!date || !time) {
            alert("กรุณาเลือกวันที่และเวลา ก่อนจองห้อง");
            return;
        }
        router.push(`/booking?room=${roomName}&date=${date}&time=${time}`);
    };

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (currentUser) {
            setUserName(currentUser.name);
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="flex items-center justify-between shadow-md bg-gradient-to-r to-blue-600 p-5 text-white">
                <img
                    src="https://www.mju.ac.th/th/images/mju_logo_main-resize.png"
                    alt="MJU Logo"
                    className="h-16 w-auto"
                />
                <h2 className="text-right text-xl font-semibold text-white px-4">
                    {userName ? ` ${userName}` : "ผู้ใช้งานทั่วไป"}
                </h2>
            </header>

            <div className="flex flex-1">
                

                {/* ห้องประชุม A */}
                <main className="flex-1 p-10 bg-gray-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 relative">
                        <h2 className="text-xl font-semibold mb-4">ห้องประชุม A</h2>
                        <div className="border rounded-lg overflow-hidden mb-6 relative">
                            <img
                                src="https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png"
                                alt="Room A"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <button
                            onClick={() => router.push("/booking?room=ห้องประชุม A")}
                            className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 transition-all mb-6"
                        >
                            จองห้อง A
                        </button>
                    </div>
                </main>

                {/* ห้องประชุม B */}
                <main className="flex-1 p-10 bg-gray-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 relative">
                        <h2 className="text-xl font-semibold mb-4">ห้องประชุม B</h2>
                        <div className="border rounded-lg overflow-hidden mb-6 relative">
                            <img
                                src="https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png"
                                alt="Room B"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <button
                            onClick={() => router.push("/booking?room=ห้องประชุม B")}
                            className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 transition-all mb-6"
                        >
                            จองห้อง B
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
