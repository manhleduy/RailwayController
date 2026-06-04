import { useEffect, useMemo, useState, type ComponentType } from 'react';

import { fetchCustomerDashboard, type CustomerDashboardSnapshot } from '@/lib/api/orders';
import { useAppSelector } from '@/lib/store/reduxHooks';
import type { AuthRole } from '@/lib/store/authTypes';

export interface DashboardInjectedProps {
  dashboard: CustomerDashboardSnapshot | null;
  loading: boolean;
  error: string | null;
  errorStatus?: number | null;
  reload: () => void;
  role: AuthRole | null;
  customerId: string | null;
  year: number;
}

export function withDashboard<P extends object>(
  WrappedComponent: ComponentType<P & DashboardInjectedProps>
) {
  return function DashboardHOC(props: P) {
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [dashboard, setDashboard] = useState<CustomerDashboardSnapshot | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);
    const [refreshIndex, setRefreshIndex] = useState(0);

    const customerId = user?.id ?? null;
    const role = user?.role ?? null;
    const year = useMemo(() => new Date().getFullYear(), []);

    useEffect(() => {
      if (!isAuthenticated || !customerId) {
        setDashboard(null);
        setError(null);
        setLoading(false);
        return;
      }

      if (role !== 'CUSTOMER') {
        setDashboard(null);
        setError(null);
        setLoading(false);
        return;
      }

      let active = true;
      const activeCustomerId = customerId;

      async function loadDashboard() {
        setLoading(true);
        setError(null);

        try {
          const snapshot = await fetchCustomerDashboard(activeCustomerId, year);

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
          // capture status when available
          // requestGraphQL now throws ApiError with optional `status`
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
    }, [customerId, isAuthenticated, refreshIndex, role, year]);

    return (
      <WrappedComponent
        {...props}
        dashboard={dashboard}
        loading={loading}
        error={error}
        errorStatus={errorStatus}
        reload={() => setRefreshIndex((current) => current + 1)}
        role={role}
        customerId={customerId}
        year={year}
      />
    );
  };
}
