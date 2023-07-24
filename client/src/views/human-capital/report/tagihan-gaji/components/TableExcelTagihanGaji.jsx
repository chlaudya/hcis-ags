/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllReportTagihanGaji } from 'store/actions/report';
import { getStateReport } from 'store/stateSelector';
import { renderDate } from 'utils/renderDate';
import { inputThousandSeparator, roundedThousandSeparator } from 'utils/thousandSeparator';
import csrfProtection from 'utils/csrfProtection';
import 'src/assets/scss/table.scss';

const TableExcelTagihanGaji = ({
  dataFiltered,
  isFiltered,
  tableRef,
  period,
  dataTotalTagihan
}) => {
  const dispatch = useDispatch();
  const { reportAllTagihanGaji } = useSelector(getStateReport);
  const [listTagihan, setListTagihan] = useState();

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
  }, []);

  useEffect(() => {
    dispatch(
      getAllReportTagihanGaji({
        page: 1,
        size: dataTotalTagihan?.total_record
      })
    );
    if (!isFiltered) {
      setListTagihan(reportAllTagihanGaji?.data);
    }
  }, [dataTotalTagihan?.total_record, isFiltered]);

  useEffect(() => {
    if (!isFiltered) {
      setListTagihan(reportAllTagihanGaji?.data);
    }
  }, [reportAllTagihanGaji, isFiltered]);

  useEffect(() => {
    setListTagihan(dataFiltered);
  }, [isFiltered, dataFiltered]);

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
            OVERSEAS DIVISION
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
            <th style={styleTableBorder}>GAJI DIBAYAR</th>
            <th style={styleTableBorder}>MANAJEMEN FEE</th>
            <th style={styleTableBorder}>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {listTagihan?.length > 0 &&
            listTagihan?.map((item, index) => {
              return (
                <tr key={item.no} style={styleTableBody}>
                  <td style={styleTableBorder}>{index + 1}</td>
                  <td style={styleTableBorder}>{item.karyawan_nip}</td>
                  <td style={styleTableBorder}>{item.karyawan_name}</td>
                  <td style={styleTableBorder}>{item.jabatan_name}</td>
                  <td style={styleTableBorder}>{item.nama_proyek}</td>
                  <td style={styleTableBorder}>{roundedThousandSeparator(item.gaji)}</td>
                  <td style={styleTableBorder}>{roundedThousandSeparator(item.tunjangan)}</td>
                  <td style={styleTableBorder}>{roundedThousandSeparator(item.gaji_dibayar)}</td>
                  <td style={styleTableBorder}>{roundedThousandSeparator(item.manajemen_fee)}</td>
                  <td style={styleTableBorder}>{roundedThousandSeparator(item.total)}</td>
                </tr>
              );
            })}
          <tr style={{ ...styleTableBody, fontWeight: 'bold', fontSize: '14px' }}>
            <td style={styleTableBorder} colSpan="5">
              JUMLAH
            </td>
            <td style={styleTableBorder}>
              {inputThousandSeparator(Math.round(dataTotalTagihan?.total_gaji))}
            </td>
            <td style={styleTableBorder}>
              {inputThousandSeparator(Math.round(dataTotalTagihan?.total_tunjangan))}
            </td>
            <td style={styleTableBorder}>
              {inputThousandSeparator(Math.round(dataTotalTagihan?.total_gaji_dibayar))}
            </td>
            <td style={styleTableBorder}>
              {inputThousandSeparator(Math.round(dataTotalTagihan?.total_manajemen_fee))}
            </td>
            <td style={styleTableBorder}>
              {inputThousandSeparator(Math.round(dataTotalTagihan?.total_tagihan_gaji))}
            </td>
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
