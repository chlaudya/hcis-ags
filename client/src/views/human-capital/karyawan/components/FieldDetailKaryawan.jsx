/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Row } from 'reactstrap';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { getKaryawanDetail } from 'store/actions/karyawan';
import './FieldDetailKaryawan.scss';
import { getStateKaryawan } from 'store/stateSelector';
import { renderDropdownLabel } from 'utils/renderDropdownLabel';
import { Print } from '@material-ui/icons';
import printJS from 'print-js';
import { inputThousandSeparator } from 'utils/thousandSeparator';

const FieldDetail = ({ id, dropdownJabatan, dropdownUnitBisnis, dropdownTempatTugas }) => {
  const dispatch = useDispatch();
  const { karyawanDetail: data } = useSelector(getStateKaryawan);
  const [printData, setPrintData] = useState();

  useEffect(() => {
    dispatch(getKaryawanDetail(id));
  }, []);

  useEffect(() => {
    getPrintData();
  }, [data]);

  const printPdf = () => {
    printJS({
      printable: 'DetailKaryawan',
      type: 'html',
      header:
        '<img style="width:100px; position:absolute" src="https://lh5.googleusercontent.com/p/AF1QipMOa6vMFl7q-HIuHUxJ777KbL1PVr4kTt8lHHZX=w600-h321-p-k-no">My custom header</img>'
    });

    // printJS({
    //   printable: data,
    //   properties: [
    //     { field: 'no', displayName: 'No.' },
    //     { field: 'karyawan_nip', displayName: 'NIP' },
    //     { field: 'karyawan_name', displayName: 'Nama Karyawan' },
    //     { field: 'tempat_tugas', displayName: 'Tempat Tugas' },
    //     { field: 'unit_bisnis', displayName: 'Unit Bisnis' },
    //     { field: 'jabatan', displayName: 'Jabatan' },
    //     { field: 'is_active', displayName: 'Aktif' }
    //   ],
    //   type: 'json'
    // });
  };

  const renderDefaultValue = (value) => {
    return value ? value : '-';
  };

  const renderTempatTugas = () => {
    return renderDropdownLabel({
      list: dropdownTempatTugas,
      selectedValue: renderDefaultValue(data?.tempat_tugas_id)
    });
  };

  const renderUnitBisnis = () => {
    return renderDropdownLabel({
      list: dropdownUnitBisnis,
      selectedValue: renderDefaultValue(data?.unit_id)
    });
  };

  const renderJabatan = () => {
    return renderDropdownLabel({
      list: dropdownJabatan,
      selectedValue: renderDefaultValue(data?.jabatan_id)
    });
  };

  const getPrintData = () => {
    const printData = {
      no: 1,
      karyawan_nip: data.karyawan_nip,
      karyawan_name: data.karyawan_name,
      tempat_tugas: renderTempatTugas(),
      unit_bisnis: renderUnitBisnis(),
      jabatan: renderJabatan(),
      is_active: data.is_active ? 'Aktif' : 'Tidak Aktif'
    };

    return JSON.stringify(printData);
  };

  return (
    <Row className="text-center justify-content-center align-items-center">
      <Button
        outline
        color="primary"
        aria-label="add an alarm"
        onClick={printPdf}
        style={{ width: '100px' }}
      >
        <Print /> Print
      </Button>
      <MainCard
        id="DetailKaryawan"
        contentStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h5 className="text-bg-info text-center">{`Detail - ${data?.karyawan_nip}_${data?.karyawan_name}`}</h5>
        <table className="FieldDetailKaryawan" style={{ width: '550px' }}>
          <thead>
            <tr>
              <th>No</th>
              <th>NIP</th>
              <th>Nama Karyawan</th>
              <th>Tempat Tugas</th>
              <th>Unit Bisnis</th>
              <th>Jabatan</th>
              <th>Aktif</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{renderDefaultValue(data?.karyawan_nip)}</td>
              <td>{renderDefaultValue(data?.karyawan_name)}</td>
              <td>{renderTempatTugas()}</td>
              <td>{renderUnitBisnis()}</td>
              <td>{renderJabatan()}</td>
              <td>{data?.is_active ? 'Aktif' : 'Tidak Aktif'}</td>
            </tr>
          </tbody>
          {/* <tr>
            <td>Karyawan NIP</td>
            <td>{renderDefaultValue(data?.karyawan_nip)}</td>
          </tr>
          <tr>
            <td>Karyawan Name</td>
            <td>{renderDefaultValue(data?.karyawan_name)}</td>
          </tr>
          <tr>
            <td>Tempat Tugas</td>
            <td>{renderTempatTugas()}</td>
          </tr>
          <tr>
            <td>Unit Bisnis</td>
            <td>{renderUnitBisnis()}</td>
          </tr>
          <tr>
            <td>Jabatan</td>
            <td>{renderJabatan()}</td>
          </tr>
          <tr>
            <td>Aktif</td>
            <td>{data?.is_active ? 'Aktif' : 'Tidak Aktif'}</td>
          </tr> */}
        </table>
      </MainCard>
    </Row>
  );
};

export default FieldDetail;
