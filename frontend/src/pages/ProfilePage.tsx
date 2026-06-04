import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Edit2, Save, X, TrainFront, Mail, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useAppSelector } from '@/lib/store/reduxHooks';
import { authSuccess } from '@/lib/store/authSlice';

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <p className="text-lg text-slate-300">Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.full_name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('All fields are required.');
      return;
    }

    setIsSaving(true);
    try {
      // Backend integration: Update user profile
      // For now, we update Redux state; backend endpoint would be similar to /api/customers/{id}
      dispatch(
        authSuccess({
          user: { ...user, ...formData },
          lastAction: 'login',
        })
      );
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_32px_90px_-50px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:p-10">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Profile information
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                {user.full_name}
              </h2>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition-all duration-200 hover:border-emerald-400/50 hover:bg-emerald-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Edit2 className="size-4" aria-hidden="true" />
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 transition-all duration-200 focus:border-emerald-400/60 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                />
              ) : (
                <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                  {formData.full_name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
                <Mail className="size-4" aria-hidden="true" />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 transition-all duration-200 focus:border-emerald-400/60 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                />
              ) : (
                <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                  {formData.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
                <Phone className="size-4" aria-hidden="true" />
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 transition-all duration-200 focus:border-emerald-400/60 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                />
              ) : (
                <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                  {formData.phone}
                </p>
              )}
            </div>

            {/* User ID (Read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
                User ID
              </label>
              <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                {user.id}
              </p>
            </div>

            {/* User Role (Read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
                Account Type
              </label>
              <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                {user.role === 'CUSTOMER' ? 'Customer' : 'Staff'}
              </p>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 pt-6">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save className="size-4" aria-hidden="true" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X className="size-4" aria-hidden="true" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
