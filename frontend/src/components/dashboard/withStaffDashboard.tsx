import { useEffect, useMemo, useState, type ComponentType } from 'react';

import { fetchStaffDashboard, type StaffDashboardSnapshot } from '@/lib/api/staff';
import { useAppSelector } from '@/lib/store/reduxHooks';
import type { AuthRole } from '@/lib/store/authTypes';

export interface StaffDashboardInjectedProps {
  dashboard: StaffDashboardSnapshot | null;
  loading: boolean;
  error: string | null;
  errorStatus?: number | null;
  reload: () => void;
  role: AuthRole | null;
  staffId: string | null;
  year: number;
}

export function withStaffDashboard<P extends object>(
  WrappedComponent: ComponentType<P & StaffDashboardInjectedProps>
) {
  return function StaffDashboardHOC(props: P) {
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [dashboard, setDashboard] = useState<StaffDashboardSnapshot | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);
    const [refreshIndex, setRefreshIndex] = useState(0);

    const staffId = user?.id ?? null;
    const role = user?.role ?? null;
    const year = useMemo(() => new Date().getFullYear(), []);

    useEffect(() => {
      if (!isAuthenticated || !staffId) {
        setDashboard(null);
        setError(null);
        setLoading(false);
        return;
      }

      if (role !== 'STAFF') {
        setDashboard(null);
        setError(null);
        setLoading(false);
        return;
      }

      let active = true;
      const activeStaffId = staffId;

      async function loadDashboard() {
        setLoading(true);
        setError(null);

        try {
          const snapshot = await fetchStaffDashboard(activeStaffId, year);

          if (!active) {
            return;
          }

          setDashboard(snapshot);
        } catch (requestError) {
          if (!active) {
            return;
          }

          setDashboard(null);
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Failed to load dashboard data.'
          );
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setErrorStatus((requestError as any)?.status ?? null);
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      }

      void loadDashboard();

      return () => {
        active = false;
      };
    }, [staffId, isAuthenticated, refreshIndex, role, year]);

    return (
      <WrappedComponent
        {...props}
        dashboard={dashboard}
        loading={loading}
        error={error}
        errorStatus={errorStatus}
        reload={() => setRefreshIndex((current) => current + 1)}
        role={role}
        staffId={staffId}
        year={year}
      />
    );
  };
}
