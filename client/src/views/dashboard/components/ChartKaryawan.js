import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// material-ui
import { Grid, Typography, useTheme } from '@material-ui/core';
// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
// project imports
import MainCard from 'src/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
// chart data
import BarChartSkeleton from 'src/ui-component/cards/Skeleton/BarChartSkeleton';
import { useDispatch } from 'react-redux';
import { getDashboardData } from 'store/actions/dashboard';
import { Alert } from 'reactstrap';

// ===========================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||=========================== //

const ChartKaryawan = ({ isLoading, data, params, setParams }) => {
  const dispatch = useDispatch();
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

  const chartSettings = {
    height: 480,
    type: 'bar',
    options: {
      chart: {
        id: 'bar-chart',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        },
        events: {
          dataPointSelection: function (_event, _chartContext, config) {
            switch (config?.dataPointIndex) {
              case 0:
                setParams({ ...params, days: '30' });

                break;
              case 1:
                setParams({ ...params, days: '60' });
                break;
              case 2:
                setParams({ ...params, days: '90' });
                break;
              default:
                break;
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          distributed: true, // this line is mandatory
          horizontal: false,
          barHeight: '85%'
        }
      },
      xaxis: {
        type: 'category',
        categories: ['30 hari mendatang', '60 hari mendatang', '90 hari mendatang']
      },
      yaxis: {
        labels: {
          formatter: function (val, index) {
            return val.toFixed(0);
          }
        }
      },
      legend: {
        show: true,
        fontSize: '14px',
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: 20,
        labels: {
          useSeriesColors: false
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8
        }
      },
      fill: {
        type: 'solid'
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        show: true
      }
    }
  };

  React.useEffect(() => {
    const newChartData = {
      ...chartSettings.options,
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

  useEffect(() => {
    if (params?.days) {
      dispatch(getDashboardData(params));
    }
  }, [params?.days]);

  return (
    <>
      {isLoading && !data ? (
        <BarChartSkeleton />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid md={3} item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h3">Data Karyawan </Typography>
                    </Grid>
                    <Grid item flex flexDirection={'row'}>
                      <Typography variant="subtitle3">yang akan Habis Kontrak</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid md={3} item padding={1}>
                  <Alert color="primary">
                    {' '}
                    Total Karyawan Aktif:{' '}
                    <span className="text-primary fw-bold">{data?.total_karyawan_active}</span>
                  </Alert>
                </Grid>
                <Grid md={3} item padding={1}>
                  <Alert>
                    Total Karyawan Baru:{' '}
                    <span className="text-primary fw-bold">{data?.total_karyawan_baru}</span>{' '}
                  </Alert>
                </Grid>
                <Grid md={3} item padding={1}>
                  <Alert color="warning">
                    Total Karyawan Berhenti:{' '}
                    <span className="text-primary fw-bold">{data?.total_karyawan_berhenti}</span>{' '}
                  </Alert>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartSettings} series={series} />
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
