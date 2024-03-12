/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import moment from 'moment';
import { renderDate } from 'utils/renderDate';
import csrfProtection from 'utils/csrfProtection';
import terbilang from 'terbilang';
import 'src/assets/scss/table.scss';

const TableExcelTagihanGaji = ({ dataTagihanGaji, tableRef, period, unitBisnis }) => {
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
          <td colSpan="10" style={styleTableTitle}>
            DAFTAR GAJI PEKERJA OUTSOURCING
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="10" style={styleTableTitle}>
            PT. ARTHA GUTAWA SEJAHTERA
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="10" style={styleTableTitle}>
            {unitBisnis ? unitBisnis : 'OVERSEAS DIVISION'}
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="10" style={styleTableTitle}>
            BULAN : {getFormattedPeriod()}
          </td>
        </tr>
        <tr></tr>
        <tr></tr>
        <thead>
          <tr style={{ ...styleTableBody, fontSize: '14px' }}>
            <th style={styleTableBorder}>No</th>
            <th style={styleTableBorder}>NIP</th>
            <th style={styleTableBorder}>NAMA PEGAWAI</th>
            <th style={styleTableBorder}>TUGAS / JABATAN</th>
            <th style={styleTableBorder}>TEMPAT TUGAS</th>
            <th style={styleTableBorder}>GAJI</th>
            <th style={styleTableBorder}>TUNJANGAN</th>
            <th style={styleTableBorder}>TUNJANGAN KOMUNIKASI</th>
            <th style={styleTableBorder}>TUNJANGAN KHUSUS</th>
            <th style={styleTableBorder}>TUNJANGAN VARIABLE</th>
            <th style={styleTableBorder}>UANG MAKAN</th>
            <th style={styleTableBorder}>GAJI DIBAYAR</th>
            <th style={styleTableBorder}>MANAJEMEN FEE</th>
            <th style={styleTableBorder}>TOTAL</th>
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
                  <td style={styleTableBorder}>{item?.gaji?.toLocaleString()}</td>
                  <td style={styleTableBorder}>{item?.tunjangan?.toLocaleString()}</td>
                  <td style={styleTableBorder}>{item?.tunjangan_komunikasi?.toLocaleString()}</td>
                  <td style={styleTableBorder}>{item?.tunjangan_khusus?.toLocaleString()}</td>
                  <td style={styleTableBorder}>{item?.tunjangan_variable?.toLocaleString()}</td>
                  <td style={styleTableBorder}>{item?.uang_makan?.toLocaleString()}</td>
                  <td style={styleTableBorder}>{item?.gaji_dibayar?.toLocaleString()}</td>
                  <td style={styleTableBorder}>{item?.manajemen_fee?.toLocaleString()}</td>
                  <td style={styleTableBorder}>{item?.total?.toLocaleString()}</td>
                </tr>
              );
            })}
          <tr style={{ ...styleTableBody, fontWeight: 'bold', fontSize: '14px' }}>
            <td style={styleTableBorder} colSpan="5">
              JUMLAH
            </td>
            <td style={styleTableBorder}>{dataTagihanGaji?.total_gaji?.toLocaleString()}</td>
            <td style={styleTableBorder}>{dataTagihanGaji?.total_tunjangan?.toLocaleString()}</td>
            <td style={styleTableBorder}>
              {dataTagihanGaji?.total_tunjangan_komunikasi?.toLocaleString()}
            </td>
            <td style={styleTableBorder}>
              {dataTagihanGaji?.total_tunjangan_khusus?.toLocaleString()}
            </td>
            <td style={styleTableBorder}>
              {dataTagihanGaji?.total_tunjangan_variabel?.toLocaleString()}
            </td>
            <td style={styleTableBorder}>{dataTagihanGaji?.total_uang_makan?.toLocaleString()}</td>
            <td style={styleTableBorder}>
              {dataTagihanGaji?.total_gaji_dibayar?.toLocaleString()}
            </td>
            <td style={styleTableBorder}>
              {dataTagihanGaji?.total_manajemen_fee?.toLocaleString()}
            </td>
            <td style={styleTableBorder}>
              {dataTagihanGaji?.total_tagihan_gaji?.toLocaleString()}
            </td>
          </tr>

          <tr></tr>
          <tr></tr>

          <tr style={styleTableBody}>
            <td colSpan="8" style={{ fontSize: '14px' }}>
              {`TERBILANG : == ${terbilang(
                parseInt(dataTagihanGaji?.total_tagihan_gaji)
              )} rupiah ==`}
            </td>
            <td></td>
          </tr>

          <tr></tr>
          <tr></tr>

          <tr style={styleTableBody}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colSpan="4" style={{ fontSize: '14px' }}>
              Jakarta, {renderDate(new Date())}
            </td>
            <td></td>
          </tr>

          <tr style={styleTableBody}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colSpan="4" style={{ fontSize: '14px' }}>
              PT. Artha Gutawa Sejahtera,
            </td>
          </tr>

          <tr></tr>
          <tr></tr>
          <tr></tr>

          <tr style={styleTableBody}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colSpan="4" style={{ fontWeight: 'bold', fontSize: '12' }}>
              Ir. Munib Lusianto, MM
            </td>
          </tr>

          <tr style={styleTableBody}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colSpan="4" style={{ fontWeight: 'bold', fontSize: '12' }}>
              Direktur
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableExcelTagihanGaji;
