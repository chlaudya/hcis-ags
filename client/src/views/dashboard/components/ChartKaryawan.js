import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { Grid, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';
// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
// project imports
import MainCard from 'src/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
// chart data
import chartData from './chartSettings';
import BarChartSkeleton from 'src/ui-component/cards/Skeleton/BarChartSkeleton';

const status = [
  {
    value: 'today',
    label: 'Hari Ini'
  },
  {
    value: 'month',
    label: 'Bulan Ini'
  },
  {
    value: 'year',
    label: 'Tahun Ini'
  }
];

// ===========================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||=========================== //

const ChartKaryawan = ({ isLoading, data }) => {
  const theme = useTheme();

  const series = [
    {
      name: 'Jumlah Karyawan Akan Habis Kontrak',
      data: [data?.total30_days, data?.total60_days, data?.total90_days]
    }
  ];

  const { primary } = theme.palette.text;
  const grey200 = theme.palette.grey[200];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;
  const grey500 = theme.palette.grey[500];

  React.useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [
        // this array contains different color code for each data
        '#33b2df',
        '#90ee7e',
        '#d4526e',
        '#13d8aa',
        '#A5978B',
        '#2b908f',
        '#f9a3a4',
        '#f48024',
        '#69d2e7',
        '#546E7A'
      ],
      xaxis: {
        labels: {
          style: {
            colors: [
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary
            ]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [
    primary200,
    primaryDark,
    secondaryMain,
    secondaryLight,
    primary,
    grey200,
    isLoading,
    grey500
  ]);

  return (
    <>
      {isLoading && !data ? (
        <BarChartSkeleton />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h3">Data Karyawan </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle3">yang akan Habis Kontrak</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} series={series} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

ChartKaryawan.propTypes = {
  isLoading: PropTypes.bool
};

export default ChartKaryawan;
