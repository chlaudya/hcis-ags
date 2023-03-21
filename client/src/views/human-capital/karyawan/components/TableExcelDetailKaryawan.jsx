/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import moment from 'moment';
import 'src/assets/scss/table.scss';
import { renderDate } from 'utils/renderDate';
import { inputThousandSeparator } from 'utils/thousandSeparator';

const TableExcelTagihanGaji = ({ data, tableRef, period, dataTotalTagihan }) => {
  const styleTableTitle = {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center'
  };

  const styleTableBody = {
    textAlign: 'center'
  };

  const styleTableBorder = {
    border: '1px solid'
  };

  return (
    <div className="is-hidden">
      <table ref={tableRef}>
        <thead>
          <tr style={{ ...styleTableBody, fontSize: '14px' }}>
            <th style={styleTableBorder}>No</th>
            <th style={styleTableBorder}>NIP</th>
            <th style={styleTableBorder}>Nama Karyawan</th>
            <th style={styleTableBorder}>Tempat Tugas</th>
            <th style={styleTableBorder}>Unit Bisnis</th>
            <th style={styleTableBorder}>Jabatan</th>
            <th style={styleTableBorder}>Aktif</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <tr key={item.no} style={styleTableBody}>
                <td style={styleTableBorder}>{item.no}</td>
                <td style={styleTableBorder}>{item.karyawan_nip}</td>
                <td style={styleTableBorder}>{item.karyawan_name}</td>
                <td style={styleTableBorder}>{item.nama_proyek}</td>
                <td style={styleTableBorder}>{item.unit_bisnis}</td>
                <td style={styleTableBorder}>{item.jabatan_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableExcelTagihanGaji;
