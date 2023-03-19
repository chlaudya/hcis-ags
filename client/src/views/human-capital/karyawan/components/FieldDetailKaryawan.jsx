/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
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

const FieldDetail = ({
  id,
  dropdownJabatan,
  dropdownUnitBisnis,
  dropdownTempatTugas,
  dropdownBank
}) => {
  const dispatch = useDispatch();
  const { karyawanDetail: data } = useSelector(getStateKaryawan);

  useEffect(() => {
    dispatch(getKaryawanDetail(id));
  }, []);

  const printPdf = () => {
    printJS({
      printable: 'DetailKaryawan',
      type: 'html'
    });
  };

  const renderDefaultValue = (value) => {
    return value ? value : '-';
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
        <h5 className="text-bg-info text-center">{`AGS - ${data?.karyawan_nip}_${data?.karyawan_name}`}</h5>
        <table className="FieldDetailKaryawan" style={{ width: '550px' }}>
          <tr>
            <td>Karyawan NIP</td>
            <td>{renderDefaultValue(data?.karyawan_nip)}</td>
          </tr>
          <tr>
            <td>Karyawan Name</td>
            <td>{renderDefaultValue(data?.karyawan_name)}</td>
          </tr>
          <tr>
            <td>Jabatan</td>
            <td>
              {renderDropdownLabel({
                list: dropdownJabatan,
                selectedValue: renderDefaultValue(data?.jabatan_id)
              })}
            </td>
          </tr>
          <tr>
            <td>Tempat Tugas</td>
            <td>
              {renderDropdownLabel({
                list: dropdownTempatTugas,
                selectedValue: renderDefaultValue(data?.tempat_tugas_id)
              })}
            </td>
          </tr>
          <tr>
            <td>Unit Bisnis</td>
            <td>
              {renderDropdownLabel({
                list: dropdownUnitBisnis,
                selectedValue: renderDefaultValue(data?.unit_id)
              })}
            </td>
          </tr>
          <tr>
            <td>Tanggal Masuk Kerja</td>
            <td>{renderDefaultValue(data?.tgl_masuk_kerja)}</td>
          </tr>
          <tr>
            <td>Tanggal Habis Kontrak</td>
            <td>{renderDefaultValue(data?.tgl_habis_kontrak)}</td>
          </tr>
          <tr>
            <td>Gaji</td>
            <td>{data?.gaji ? inputThousandSeparator(data?.gaji) : '-'}</td>
          </tr>
          <tr>
            <td>Tipe Tunjangan</td>
            <td>{renderDefaultValue(data?.tipe_tunjangan)}</td>
          </tr>
          <tr>
            <td>Uang Telekomunikasi</td>
            <td>
              {data?.uang_telekomunikasi ? inputThousandSeparator(data?.uang_telekomunikasi) : '-'}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{renderDefaultValue(data?.email)}</td>
          </tr>
          <tr>
            <td>No Handphone</td>
            <td>{renderDefaultValue(data?.no_handphone)}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{renderDefaultValue(data?.gender)}</td>
          </tr>
          <tr>
            <td>Tanggal Lahir</td>
            <td>{renderDefaultValue(data?.tanggal_lahir)}</td>
          </tr>
          <tr>
            <td>Agama</td>
            <td>{renderDefaultValue(data?.agama)}</td>
          </tr>
          <tr>
            <td>Alamat Rumah</td>
            <td>{renderDefaultValue(data?.alamat_rumah)}</td>
          </tr>
          <tr>
            <td>Tempat Tinggal</td>
            <td>{renderDefaultValue(data?.tempat_tinggal)}</td>
          </tr>
          <tr>
            <td>Status Nikah</td>
            <td>{renderDefaultValue(data?.status_nikah)}</td>
          </tr>
          <tr>
            <td>Asal Sekolah</td>
            <td>{renderDefaultValue(data?.asal_sekolah)}</td>
          </tr>
          <tr>
            <td>Jurusan</td>
            <td>{renderDefaultValue(data?.jurusan)}</td>
          </tr>
          <tr>
            <td>Pendidikan Terakhir</td>
            <td>{renderDefaultValue(data?.pendidikan_terakhir)}</td>
          </tr>
          <tr>
            <td>Bank</td>
            <td>
              {renderDefaultValue(
                renderDropdownLabel({ list: dropdownBank, selectedValue: data?.bank_id })
              )}
            </td>
          </tr>
          <tr>
            <td>No. Rekening</td>
            <td>{renderDefaultValue(data?.no_rekening)}</td>
          </tr>

          <tr>
            <td>No. BPJS Kesehatan</td>
            <td>{renderDefaultValue(data?.no_bpjs_kesehatan)}</td>
          </tr>
          <tr>
            <td>No. BPJS Tenaga Kerja</td>
            <td>{renderDefaultValue(data?.no_bpjs_tenaga_kerja)}</td>
          </tr>
          <tr>
            <td>No. NIK</td>
            <td>{renderDefaultValue(data?.nonik)}</td>
          </tr>
          <tr>
            <td>No. KK</td>
            <td>{renderDefaultValue(data?.nokk)}</td>
          </tr>
          <tr>
            <td>No. NPWP</td>
            <td>{renderDefaultValue(data?.nonpwp)}</td>
          </tr>
        </table>
      </MainCard>
    </Row>
  );
};

export default FieldDetail;
