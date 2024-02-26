/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
// material-ui
import { Grid } from '@material-ui/core';
import ChartKaryawan from './components/ChartKaryawan';
import TableKontrakKaryawan from './components/TableKontrakKaryawan';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';
import { getStateDashboard } from 'store/stateSelector';

const Dashboard = () => {
  const { dashboardData, loading } = useSelector(getStateDashboard);
  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            {Object.keys(dashboardData).length !== 0 && (
              <ChartKaryawan
                isLoading={loading}
                data={dashboardData}
                params={params}
                setParams={setParams}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12} md={12}>
          <TableKontrakKaryawan
            data={dashboardData}
            loading={loading}
            params={params}
            setParams={setParams}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
