/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import moment from 'moment';
import { renderDate } from 'utils/renderDate';
import csrfProtection from 'utils/csrfProtection';
import terbilang from 'terbilang';
import 'src/assets/scss/table.scss';

const TableExcelRekapGaji = ({ dataTagihanGaji, tableRef, period, unitBisnis }) => {
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
          <td colSpan="5" style={styleTableTitle}>
            REKAPITULASI GAJI PEKERJA OUTSOURCING
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="5" style={styleTableTitle}>
            PT. ARTHA GUTAWA SEJAHTERA
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="5" style={styleTableTitle}>
            {unitBisnis ? unitBisnis : 'OVERSEAS DIVISION'}
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="5" style={styleTableTitle}>
            {period ? getFormattedPeriod() : 'Semua Bulan'}
          </td>
        </tr>
        <tr></tr>
        <tr></tr>
        <thead>
          <tr style={{ ...styleTableBody, fontSize: '14px' }}>
            <th style={styleTableBorder}>NO</th>
            <th style={styleTableBorder}>URAIAN</th>
            <th style={styleTableBorder}>JUMLAH PEKERJA</th>
            <th style={styleTableBorder}>JUMLAH</th>
          </tr>
        </thead>
        <tbody>
          <tr style={styleTableBody}>
            <td style={styleTableBorder}>1</td>
            <td style={styleTableBorder}>Biaya Gaji Pekerja Outsourcing</td>
            <td style={styleTableBorder}>{dataTagihanGaji?.total_record}</td>
            <td
              style={styleTableBorder}
            >{`Rp. ${dataTagihanGaji?.total_gaji_dibayar?.toLocaleString()}`}</td>
          </tr>
          <tr style={styleTableBody}>
            <td style={styleTableBorder}></td>
            <td style={styleTableBorder}>{unitBisnis ? unitBisnis : 'OVERSEAS DIVISION'}</td>
            <td style={styleTableBorder}></td>
            <td style={styleTableBorder}></td>
          </tr>
          <tr style={styleTableBody}>
            <td style={styleTableBorder}>2</td>
            <td style={styleTableBorder}>Manajemen Fee 10%</td>
            <td style={styleTableBorder}></td>
            <td
              style={styleTableBorder}
            >{`Rp. ${dataTagihanGaji?.total_manajemen_fee?.toLocaleString()}`}</td>
          </tr>
          <tr style={styleTableBody}>
            <td style={styleTableBorder}>3</td>
            <td style={styleTableBorder}>PPn 11% (Atas Manajemen Fee)</td>
            <td style={styleTableBorder}></td>
            <td
              style={styleTableBorder}
            >{`Rp. ${dataTagihanGaji?.total_pph11?.toLocaleString()}`}</td>
          </tr>
          <tr style={{ ...styleTableBody, fontWeight: 'bold', fontSize: '14px' }}>
            <td style={styleTableBorder} colSpan="3">
              JUMLAH
            </td>
            <td style={styleTableBorder}>
              {dataTagihanGaji?.total_tagihan_gaji?.toLocaleString()}
            </td>
          </tr>

          <tr></tr>
          <tr></tr>

          <tr style={styleTableBody}>
            <td colSpan="5" style={{ fontSize: '14px' }}>
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
            <td colSpan="4" style={{ fontWeight: 'bold', fontSize: '12' }}>
              Direktur
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableExcelRekapGaji;
