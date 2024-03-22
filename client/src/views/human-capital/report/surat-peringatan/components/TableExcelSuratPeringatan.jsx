/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import moment from 'moment';
import { renderDate } from 'utils/renderDate';
import csrfProtection from 'utils/csrfProtection';
import 'src/assets/scss/table.scss';

const TableExcelSuratPeringatan = ({ dataTagihanGaji, tableRef, period, unitBisnis }) => {
  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
  }, []);

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

  const getFormattedPeriod = () => {
    const date = moment(period || new Date()).format('LL');
    const formattedPeriod = date.split(' ');

    return `${formattedPeriod[1]} ${formattedPeriod[2]}`;
  };

  return (
    <div className="is-hidden">
      <table ref={tableRef}>
        <tr className="fw-bold">
          <td colSpan="7" style={styleTableTitle}>
            REPORT SURAT PERINGATAN KARYAWAN
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="7" style={styleTableTitle}>
            PT. ARTHA GUTAWA SEJAHTERA
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="7" style={styleTableTitle}>
            {unitBisnis ? unitBisnis : 'OVERSEAS DIVISION'}
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="7" style={styleTableTitle}>
            {period ? getFormattedPeriod() : 'Semua Bulan'}
          </td>
        </tr>
        <tr></tr>
        <tr></tr>
        <thead>
          <tr style={{ ...styleTableBody, fontSize: '14px' }}>
            <th style={styleTableBorder}>No</th>
            <th style={styleTableBorder}>NIP</th>
            <th style={styleTableBorder}>NAMA</th>
            <th style={styleTableBorder}>JABATAN</th>
            <th style={styleTableBorder}>UNIT</th>
            <th style={styleTableBorder}>SP Ke</th>
            <th style={styleTableBorder}>TANGGAL SP</th>
          </tr>
        </thead>
        <tbody>
          {dataTagihanGaji?.data?.length > 0 &&
            dataTagihanGaji?.data?.map((item, index) => {
              return (
                <tr key={item.no} style={styleTableBody}>
                  <td style={styleTableBorder}>{index + 1}</td>
                  <td style={styleTableBorder}>{item?.karyawan_nip}</td>
                  <td style={styleTableBorder}>{item?.karyawan_name}</td>
                  <td style={styleTableBorder}>{item?.jabatan_name}</td>
                  <td style={styleTableBorder}>{item?.nama_proyek}</td>
                  <td style={styleTableBorder}>{item?.surat_peringatan}</td>
                  <td style={styleTableBorder}>{renderDate(item?.tanggal_surat_peringatan)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableExcelSuratPeringatan;
