/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import csrfProtection from 'utils/csrfProtection';
import 'src/assets/scss/table.scss';
import { useSelector } from 'react-redux';
import {
  getStateMasterJabatan,
  getStateMasterTempatTugas,
  getStateMasterUnitBisnis
} from 'store/stateSelector';
import { renderDropdownLabel } from 'utils/renderDropdownLabel';
import { renderDate } from 'utils/renderDate';

const TableExcelKontrak = ({ data, tableRef, period, unitBisnis }) => {
  const { dropdownJabatan } = useSelector(getStateMasterJabatan);
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const { dropdownTempatTugas } = useSelector(getStateMasterTempatTugas);

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
          <td colSpan="10" style={styleTableTitle}>
            DATA KONTRAK
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
            Tanggal Generate : {renderDate(new Date())}
          </td>
        </tr>
        <tr></tr>
        <tr></tr>
        <thead>
          <tr style={{ ...styleTableBody, fontSize: '14px' }}>
            <th style={styleTableBorder}>NO</th>
            <th style={styleTableBorder}>NIP</th>
            <th style={styleTableBorder}>NAMA</th>
            <th style={styleTableBorder}>NO KONTRAK</th>
            <th style={styleTableBorder}>TEMPAT TUGAS</th>
            <th style={styleTableBorder}>UNIT BISNIS</th>
            <th style={styleTableBorder}>JABATAN</th>
            <th style={styleTableBorder}>PERIODE KONTRAK</th>
            <th style={styleTableBorder}>TGL MASUK KERJA</th>
            <th style={styleTableBorder}>TGL HABIS KONTRAK</th>
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
                  <td style={styleTableBorder}>{item?.kontrak_kode}</td>
                  <td style={styleTableBorder}>
                    {renderDropdownLabel({
                      list: dropdownTempatTugas,
                      selectedValue: item?.tempat_tugas_id
                    })}
                  </td>
                  <td style={styleTableBorder}>
                    {renderDropdownLabel({
                      list: dropdownUnitBisnis,
                      selectedValue: item?.unit_id
                    })}
                  </td>
                  <td style={styleTableBorder}>
                    {renderDropdownLabel({
                      list: dropdownJabatan,
                      selectedValue: item?.jabatan_id
                    })}
                  </td>
                  <td style={styleTableBorder}>{item?.period_kontrak}</td>
                  <td style={styleTableBorder}>{item?.tgl_masuk_kerja?.toLocaleString()}</td>
                  <td style={styleTableBorder}>{item?.tgl_habis_kontrak?.toLocaleString()}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableExcelKontrak;
