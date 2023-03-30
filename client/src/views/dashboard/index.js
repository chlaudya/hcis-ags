/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
// material-ui
import { Grid } from '@material-ui/core';
import ChartKaryawan from './components/ChartKaryawan';
import TableKontrakKaryawan from './components/TableKontrakKaryawan';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getStateDashboard } from 'store/stateSelector';
import { getDashboardData } from 'store/actions/dashboard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData, loading } = useSelector(getStateDashboard);

  useEffect(() => {
    dispatch(getDashboardData());
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            {Object.keys(dashboardData).length !== 0 && (
              <ChartKaryawan isLoading={loading} data={dashboardData} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12} md={12}>
          <TableKontrakKaryawan data={dashboardData} loading={loading} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
