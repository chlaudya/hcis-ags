/* eslint-disable no-mixed-spaces-and-tabs */
import {
  TableBodyCol,
  TableBodyComponent,
  TableBodyRow,
  TableContainer,
  TableHeaderComponent,
  TableHeaderItem
} from './TableStyles';

const TableFormik = ({
  columns,
  data,
  error,
  isEmpty,
  errorMessage,
  defaultEmptyText,
  withTotal,
  totalText,
  className
}) => {
  const renderTableBodyRow = () => {
    if (isEmpty)
      return (
        <>
          <TableHeaderComponent error={error}>
            {columns?.map((column) => (
              <TableHeaderItem
                key={column.id}
                width={column.width || 'auto'}
                textAlign={column.textAlign || 'left'}
                error={error}
              >
                {column.name}
              </TableHeaderItem>
            ))}
          </TableHeaderComponent>
          <TableBodyComponent>
            <TableBodyRow>
              <TableBodyCol width="100%" textAlign="center" error={error}>
                <div className="p-2">{error ? errorMessage : defaultEmptyText}</div>
              </TableBodyCol>
            </TableBodyRow>
          </TableBodyComponent>
        </>
      );

    const renderCellContent = ({ column, row, rowIndex }) => {
      if (typeof column?.cell === 'function') {
        return column.cell(row, rowIndex);
      } else {
        const cellValue = row[column.name];
        return cellValue;
      }
    };

    return (
      <>
        <TableHeaderComponent error={error}>
          {columns?.map((column) => (
            <TableHeaderItem
              key={column.id}
              width={column.width || 'auto'}
              textAlign={column.textAlign || 'left'}
              error={error}
            >
              {column.name}
            </TableHeaderItem>
          ))}
        </TableHeaderComponent>
        <TableBodyComponent>
          {data?.map((row, rowIndex) => (
            <TableBodyRow key={row.id}>
              {columns?.map((column) => (
                <TableBodyCol
                  key={column.id}
                  width={column.width || 'auto'}
                  textAlign={column.textAlign || 'left'}
                  error={error}
                  color="blue"
                >
                  {renderCellContent({
                    column,
                    row,
                    rowIndex
                  })}
                </TableBodyCol>
              ))}
            </TableBodyRow>
          ))}
        </TableBodyComponent>
      </>
    );
  };

  return (
    <div className={className}>
      <TableContainer error={error}>{renderTableBodyRow()}</TableContainer>
    </div>
  );
};

export default TableFormik;
