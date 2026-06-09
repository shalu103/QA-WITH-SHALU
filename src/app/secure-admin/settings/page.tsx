import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/secure-admin/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center gap-4">
        <Link href="/secure-admin/dashboard" className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1">
          <ArrowLeft size={13} /> Dashboard
        </Link>
        <h1 className="text-sm font-semibold text-gray-900">Settings</h1>
      </header>

      <div className="max-w-xl mx-auto px-6 py-10 space-y-5">
        {/* Account */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Account</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-sm font-bold text-teal-700">SS</div>
            <div>
              <p className="text-sm font-medium text-gray-900">Shalu Sharma</p>
              <p className="text-xs text-gray-400">{user.email}</p>
              <p className="text-xs text-teal-600 font-medium mt-0.5">Admin</p>
            </div>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button className="text-sm text-red-500 hover:text-red-700 font-medium">Sign Out</button>
          </form>
        </div>

        {/* Analytics placeholders */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Analytics</h2>
          <p className="text-xs text-gray-400 mb-4">Add your analytics IDs here when you are ready.</p>
          {[
            { label: "Google Analytics ID", placeholder: "G-XXXXXXXXXX" },
            { label: "Microsoft Clarity ID", placeholder: "xxxxxxxxxx" },
          ].map(({ label, placeholder }) => (
            <div key={label} className="mb-3">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
              <input
                type="text"
                placeholder={placeholder}
                disabled
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-400"
              />
            </div>
          ))}
          <p className="text-xs text-gray-400">
            To enable analytics, add the IDs to your Vercel environment variables and uncomment the analytics script in <code className="bg-gray-100 px-1 rounded">layout.tsx</code>.
          </p>
        </div>

        {/* Site info */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Site Info</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="text-gray-400">Site URL</span>
              <span className="font-medium">{process.env.NEXT_PUBLIC_SITE_URL ?? "Not set"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Framework</span>
              <span className="font-medium">Next.js 15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Database</span>
              <span className="font-medium">Supabase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
