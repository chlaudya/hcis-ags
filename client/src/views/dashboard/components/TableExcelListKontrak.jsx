/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import { getStateMasterUnitBisnis } from 'store/stateSelector';
import { renderDate } from 'utils/renderDate';
import 'src/assets/scss/table.scss';
import { renderDropdownLabel } from 'utils/renderDropdownLabel';

const TableExcelListKontrak = ({ tableRef, listKontrak }) => {
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);

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
        <tr className="fw-bold">
          <td colSpan="8" style={styleTableTitle}>
            DAFTAR KONTRAK {listKontrak?.length > 0 && listKontrak[0]?.karyawan_name}
          </td>
        </tr>
        <tr></tr>
        <tr></tr>
        <thead>
          <tr style={{ ...styleTableBody, fontSize: '14px' }}>
            <th style={styleTableBorder}>No</th>
            <th style={styleTableBorder}>NIP</th>
            <th style={styleTableBorder}>No. Kontrak</th>
            <th style={styleTableBorder}>Nama</th>
            <th style={styleTableBorder}>Unit Bisnis</th>
            <th style={styleTableBorder}>Tgl. Habis Kontrak</th>
            <th style={styleTableBorder}>Periode Kontrak</th>
            <th style={styleTableBorder}>Status</th>
          </tr>
        </thead>
        <tbody>
          {listKontrak?.length > 0 &&
            listKontrak?.map((item, index) => {
              return (
                <tr key={item.no} style={styleTableBody}>
                  <td style={styleTableBorder}>{index + 1}</td>
                  <td style={styleTableBorder}>{item.karyawan_nip}</td>
                  <td style={styleTableBorder}>{item.kontrak_kode}</td>
                  <td style={styleTableBorder}>{item.karyawan_name}</td>
                  <td style={styleTableBorder}>
                    {renderDropdownLabel({ list: dropdownUnitBisnis, selectedValue: item.unit_id })}
                  </td>
                  <td style={styleTableBorder}>{renderDate(item.tgl_habis_kontrak)}</td>
                  <td style={styleTableBorder}>{item.period_kontrak}</td>
                  <td style={styleTableBorder}>{item.is_active ? 'Aktif' : 'Tidak Aktif'}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableExcelListKontrak;
