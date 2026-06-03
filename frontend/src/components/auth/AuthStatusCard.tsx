import { memo } from 'react';
import { BadgeCheck, DatabaseZap, ShieldCheck, UserRound, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { clearAuth } from '@/lib/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/reduxHooks';

const AuthStatusCard = memo(function AuthStatusCard() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, lastAction, loading } = useAppSelector(
    (state) => state.auth
  );

  const actionLabel =
    lastAction === 'signup'
      ? 'Stored after sign up'
      : lastAction === 'login'
        ? 'Stored after login'
        : 'Waiting for a backend response';

  return (
    <Card className="mt-6 border-slate-200 bg-slate-50/80">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <DatabaseZap className="size-4 text-slate-700" />
          Redux auth snapshot
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {isAuthenticated && user ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                  <BadgeCheck className="size-4 text-emerald-600" />
                  {user.full_name}
                </div>
                <p className="text-slate-500">ID: {user.id}</p>
                <p className="text-slate-500">Role: {user.role}</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700">
                Stored
              </span>
            </div>

            <Separator />

            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-500">
                  Email
                </dt>
                <dd className="mt-1 text-slate-900">{user.email}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-500">
                  Phone
                </dt>
                <dd className="mt-1 text-slate-900">{user.phone}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3">
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck className="size-4" />
                <span>{actionLabel}</span>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => dispatch(clearAuth())}
                disabled={loading}
              >
                <X className="size-4" />
                Clear session
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-5">
            <div className="flex items-center gap-2 text-slate-900">
              <UserRound className="size-4 text-slate-600" />
              No auth data stored yet
            </div>
            <p className="leading-6 text-slate-500">
              Submit the form and the returned backend data will be saved in the
              Redux auth slice without leaving this page.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

export { AuthStatusCard };

