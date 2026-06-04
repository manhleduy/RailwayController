import { LogOut, BarChart3, User, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { clearAuth } from '@/lib/store/authSlice';
import type { StoredAuthUser } from '@/lib/store/authTypes';

export interface UserMenuProps {
  user: StoredAuthUser;
}

export function UserMenu({ user }: UserMenuProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initials = user.full_name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex size-10 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-sm font-semibold text-emerald-300 transition-all duration-200 hover:border-emerald-400/50 hover:bg-emerald-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label={`${user.full_name} menu`}
        >
          {initials}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 bg-slate-950/95 border-white/10">
        <div className="px-2 py-1.5">
          <p className="text-sm font-semibold text-white">{user.full_name}</p>
          <p className="text-xs text-slate-400">{user.email}</p>
        </div>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer text-white hover:bg-white/10 focus:bg-white/10"
            onClick={() => handleNavigate('/dashboard')}
          >
            <BarChart3 className="size-4 text-emerald-400" aria-hidden="true" />
            <span>Dashboard</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer text-white hover:bg-white/10 focus:bg-white/10"
            onClick={() => handleNavigate('/profile')}
          >
            <User className="size-4 text-sky-400" aria-hidden="true" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer text-white hover:bg-white/10 focus:bg-white/10"
            onClick={() => handleNavigate('/activity')}
          >
            <ClipboardList className="size-4 text-amber-400" aria-hidden="true" />
            <span>Recent activity</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer text-rose-300 hover:bg-rose-500/10 focus:bg-rose-500/10 data-[variant=destructive]:text-rose-300"
            onClick={handleLogout}
            variant="destructive"
          >
            <LogOut className="size-4" aria-hidden="true" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
