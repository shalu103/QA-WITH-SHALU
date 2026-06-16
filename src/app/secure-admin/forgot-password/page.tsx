"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleResetPassword(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();
    const redirectUrl = `${window.location.origin}/secure-admin/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Unable to send reset instructions.");
    } else {
      setMessage(
        "Password reset email sent. Please check your inbox and follow the instructions."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Reset your password</h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your admin email and we will send you a password reset link.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-2xl bg-teal-50 border border-teal-100 px-4 py-3 text-sm text-teal-700">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-teal-400 focus:outline-none"
              placeholder="admin@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-teal-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send reset email"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <Link href="/secure-admin/login" className="text-teal-600 hover:text-teal-800">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
