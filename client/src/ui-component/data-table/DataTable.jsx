import React from 'react';
import DataTable from 'react-data-table-component';
import EmptyDataTable from './EmptyDataTable';
import CircularProgress from '@mui/material/CircularProgress';

// import BfiLoader from '../BfiLoader';
import './data-table.scss';

const DataTableComponent = (props) => {
  const {
    noHeader,
    progressPending,
    columns,
    data,
    handleSort,
    paginationTotalRows,
    onChangeRowsPerPage,
    onChangePage,
    subHeader,
    subHeaderComponent,
    ...restProps
  } = props;

  const customStyles = {
    rows: {
      style: {
        '&:hover': {
          backgroundColor: '#e8eff4 !important',
          cursor: 'pointer'
        }
      }
    },
    headCells: {
      style: {
        textAlign: 'center'
      }
    }
  };

  return (
    <DataTable
      {...restProps}
      customStyles={customStyles}
      className="data-table"
      noHeader={noHeader}
      progressPending={progressPending}
      progressComponent={<CircularProgress />}
      columns={columns}
      data={data}
      theme="solarized"
      onSort={handleSort}
      sortServer
      pagination
      paginationServer
      paginationTotalRows={paginationTotalRows}
      onChangeRowsPerPage={onChangeRowsPerPage}
      onChangePage={onChangePage}
      subHeader={subHeader}
      subHeaderComponent={subHeaderComponent}
      noDataComponent={<EmptyDataTable />}
    />
  );
};

export default DataTableComponent;
