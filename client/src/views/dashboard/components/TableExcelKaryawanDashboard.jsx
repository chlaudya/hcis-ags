/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import csrfProtection from 'utils/csrfProtection';
import 'src/assets/scss/table.scss';

const TableExcelKaryawanDashboard = ({ data, tableRef, period }) => {
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

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
  }, []);

  return (
    <div className="is-hidden">
      <table ref={tableRef}>
        <tr className="fw-bold">
          <td colSpan="5" style={styleTableTitle}>
            DATA KARYAWAN AKAN HABIS KONTRAK
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="5" style={styleTableTitle}>
            PT. ARTHA GUTAWA SEJAHTERA
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="5" style={styleTableTitle}>
            PERIODE : {period ? `${period} Hari Mendatang` : 'Semua Periode'}
          </td>
        </tr>
        <tr></tr>
        <tr></tr>
        <thead>
          <tr style={{ ...styleTableBody, fontSize: '14px' }}>
            <th style={styleTableBorder}>NO</th>
            <th style={styleTableBorder}>NIP</th>
            <th style={styleTableBorder}>NO KONTRAK</th>
            <th style={styleTableBorder}>TGL HABIS KONTRAK</th>
            <th style={styleTableBorder}>NAMA</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data?.map((item, index) => {
              return (
                <tr key={item.no} style={styleTableBody}>
                  <td style={styleTableBorder}>{index + 1}</td>
                  <td style={styleTableBorder}>{item?.karyawan_nip}</td>
                  <td style={styleTableBorder}>{item?.karyawan_name}</td>
                  <td style={styleTableBorder}>{item?.jabatan_name}</td>
                  <td style={styleTableBorder}>{item?.nama_proyek}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableExcelKaryawanDashboard;
