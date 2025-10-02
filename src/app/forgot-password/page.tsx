"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const forgotSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: ForgotForm) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === data.email);

    if (user) {
      // ส่งไป Reset Password page พร้อม query parameter email
      router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
    } else {
      alert("ไม่พบอีเมลนี้ในระบบ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">ลืมรหัสผ่าน</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">อีเมล</label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกอีเมลของคุณ"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
          >
            ต่อไป
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          กลับไป <a href="/login" className="text-blue-600 hover:underline">เข้าสู่ระบบ</a>
        </p>
      </div>
    </div>
  );
}