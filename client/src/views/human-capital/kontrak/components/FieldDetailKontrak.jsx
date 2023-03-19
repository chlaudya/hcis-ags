/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Row } from 'reactstrap';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import './FieldDetailKontrak.scss';
import { getStateKontrak } from 'store/stateSelector';
import { renderDropdownLabel } from 'utils/renderDropdownLabel';

import { Print } from '@material-ui/icons';
import { renderDate } from 'utils/renderDate';
import { inputThousandSeparator } from 'utils/thousandSeparator';
import { getKontrakDetail } from 'store/actions/kontrak';
import printJS from 'print-js';

const FieldDetail = ({ id, dropdownJabatan, dropdownUnitBisnis, dropdownTempatTugas }) => {
  const dispatch = useDispatch();
  const { kontrakDetail: data } = useSelector(getStateKontrak);

  useEffect(() => {
    dispatch(getKontrakDetail(id));
  }, []);

  const printPdf = () => {
    printJS({
      printable: 'DetailKontrak',
      type: 'html'
    });
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
        id="DetailKontrak"
        contentStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h5 className="text-bg-info text-center">{`Kontrak ${data?.karyawan_nip}_${data?.karyawan_name}`}</h5>
        <table className="FieldDetailKontrak" style={{ width: '550px' }}>
          <tr>
            <td>Karyawan NIP</td>
            <td>{data?.karyawan_nip ? data?.karyawan_nip : '-'}</td>
          </tr>
          <tr>
            <td>Karyawan Name</td>
            <td>{data?.karyawan_name ? data?.karyawan_name : '-'}</td>
          </tr>
          <tr>
            <td>No. NIK</td>
            <td>{data?.nonik ? data?.nonik : '-'}</td>
          </tr>
          <tr>
            <td>Jabatan</td>
            <td>
              {data?.jabatan_id
                ? renderDropdownLabel({ list: dropdownJabatan, selectedValue: data?.jabatan_id })
                : '-'}
            </td>
          </tr>
          <tr>
            <td>Tempat Tugas</td>
            <td>
              {data?.tempat_tugas_id
                ? renderDropdownLabel({
                    list: dropdownTempatTugas,
                    selectedValue: data?.tempat_tugas_id
                  })
                : '-'}
            </td>
          </tr>
          <tr>
            <td>Unit Bisnis</td>
            <td>
              {data?.unit_id
                ? renderDropdownLabel({ list: dropdownUnitBisnis, selectedValue: data?.unit_id })
                : '-'}
            </td>
          </tr>
          <tr>
            <td>Period Kontrak</td>
            <td>{data?.period_kontrak ? data?.period_kontrak : '-'}</td>
          </tr>
          <tr>
            <td>Tanggal Masuk Kerja</td>
            <td>{data?.tgl_masuk_kerja ? renderDate(data?.tgl_masuk_kerja) : '-'}</td>
          </tr>
          <tr>
            <td>Tanggal Habis Kontrak</td>
            <td>{data?.tgl_habis_kontrak ? renderDate(data?.tgl_habis_kontrak) : '-'}</td>
          </tr>
          <tr>
            <td>Gaji</td>
            <td>{data?.gaji ? inputThousandSeparator(data?.gaji) : '-'}</td>
          </tr>
          <tr>
            <td>Tipe Tunjangan</td>
            <td>{data?.tipe_tunjangan ? data?.tipe_tunjangan : '-'}</td>
          </tr>
          <tr>
            <td>Uang Telekomunikasi</td>
            <td>
              {data?.uang_telekomunikasi ? inputThousandSeparator(data?.uang_telekomunikasi) : '-'}
            </td>
          </tr>
          <tr>
            <td>Kontrak Kode</td>
            <td>{data?.kontrak_kode ? data?.kontrak_kode : '-'}</td>
          </tr>
        </table>
      </MainCard>
    </Row>
  );
};

export default FieldDetail;
