"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    // Check if we have a valid reset token in the URL without using
    // Next's `useSearchParams` (causes SSR build errors). Use
    // `window.location` in the client instead.
    if (typeof window === "undefined") return;
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    const type = params.get("type");

    if (code && type === "recovery") {
      setIsValidToken(true);
    } else if (!code) {
      setError("No reset token provided. Please use the link from your email.");
    }
  }, []);

  async function handleResetPassword(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setError(error.message || "Failed to reset password. Please try again.");
    } else {
      setMessage("Password reset successfully! You can now return to login.");
    }
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Reset Password</h1>
            {error && (
              <div className="mt-4 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <Link
              href="/secure-admin/forgot-password"
              className="mt-6 inline-block text-teal-600 hover:text-teal-700 font-medium"
            >
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Create New Password</h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your new password below.
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-xl transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/secure-admin/login"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
