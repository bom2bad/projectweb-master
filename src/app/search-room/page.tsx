"use client";
import { useState } from "react";
import Link from "next/link";

type Room = {
  name: string;
  image: string;
};

export default function SearchRoomPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const rooms: Room[] = [
    {
      name: "ห้องประชุม A",
      image: "https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png"
    },
    {
      name: "ห้องประชุม B",
      image: "https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png"
    }
  ];

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between shadow-md bg-gradient-to-r to-blue-600 p-5 text-white">
        <img
          src="https://www.mju.ac.th/th/images/mju_logo_main-resize.png"
          alt="MJU Logo"
          className="h-16 w-auto"
        />
        <h2 className="text-xl font-semibold ">ค้นหาห้องพัก</h2>
      </header>

      <div className="p-10">
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            ค้นหาห้องประชุม
          </h1>

          <div className="mb-6">
            <input
              type="text"
              placeholder="ค้นหาห้อง..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filteredRooms.length === 0 ? (
            <p className="text-gray-600 text-center">ไม่พบห้องที่ค้นหา</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRooms.map((room, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {room.name}
                    </h3>
                    <Link href="/room">
                      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        ดูรายละเอียด
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/home"
              className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}