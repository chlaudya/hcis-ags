/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import moment from 'moment';
import 'src/assets/scss/table.scss';
import { renderDate } from 'utils/renderDate';
import { inputThousandSeparator } from 'utils/thousandSeparator';

const TableDetailKaryawan = ({
  data,
  tableRef,
  renderJabatan,
  renderTempatTugas,
  renderUnitBisnis,
  renderBank
}) => {
  const styleTableBody = {
    textAlign: 'left'
  };

  const styleTableBorder = {
    border: '1px solid'
  };

  console.log(data);

  return (
    <div className="is-hidden" id="TableDetailKaryawan">
      <h3
        style={{ textAlign: 'center' }}
      >{`Data : ${data?.karyawan_nip}_${data?.karyawan_name}`}</h3>
      <table ref={tableRef}>
        <tbody>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>NIP</th>
            <td style={styleTableBorder}>{data?.karyawan_nip}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Nama Karyawan</th>
            <td style={styleTableBorder}>{data?.karyawan_name}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Tempat Tugas</th>
            <td style={styleTableBorder}>{renderTempatTugas()}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Unit Bisnis</th>
            <td style={styleTableBorder}>{renderUnitBisnis()}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Jabatan</th>
            <td style={styleTableBorder}>{renderJabatan()}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Email</th>
            <td style={styleTableBorder}>{data?.email}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>No. Handphone</th>
            <td style={styleTableBorder}>{data?.no_handphone}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Tanggal Lahir</th>
            <td style={styleTableBorder}>{renderDate(data?.tanggal_lahir)}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Jenis Kelamin</th>
            <td style={styleTableBorder}>{data?.gender}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Golongan Darah</th>
            <td style={styleTableBorder}>{data?.golongan_darah}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Agama</th>
            <td style={styleTableBorder}>{data?.agama}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Status Nikah</th>
            <td style={styleTableBorder}>{data?.status_nikah}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>No. KK</th>
            <td style={styleTableBorder}>{data?.nokk}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>No. NIK</th>
            <td style={styleTableBorder}>{data?.nonik}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>No. NPWP</th>
            <td style={styleTableBorder}>{data?.nonpwp}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>No. BPJS Kesehatan</th>
            <td style={styleTableBorder}>{data?.no_bpjs_kesehatan}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>No. BPJS Ketenagakerjaan</th>
            <td style={styleTableBorder}>{data?.no_bpjs_tenaga_kerja}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>No. Rekening</th>
            <td style={styleTableBorder}>{data?.no_rekening}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Bank</th>
            <td style={styleTableBorder}>{renderBank()}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Rekening Atas Nama</th>
            <td style={styleTableBorder}>{data?.rekening_atas_nama}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Tempat Tinggal</th>
            <td style={styleTableBorder}>{data?.tempat_tinggal}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Alamat Rumah</th>
            <td style={styleTableBorder}>{data?.alamat_rumah}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Alamat Domisili</th>
            <td style={styleTableBorder}>{data?.alamat_domisili}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Riwayat Pekerjaan</th>
            <td style={styleTableBorder}>{data?.riwayat_pekerjaan}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Pendidikan Terakhir</th>
            <td style={styleTableBorder}>{data?.pendidikan_terakhir}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Asal Sekolah</th>
            <td style={styleTableBorder}>{data?.asal_sekolah}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Jurusan</th>
            <td style={styleTableBorder}>{data?.jurusan}</td>
          </tr>

          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Nama Ayah Kandung</th>
            <td style={styleTableBorder}>{data?.nama_ayah_kandung}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Nama Ibu Kandung</th>
            <td style={styleTableBorder}>{data?.nama_ibu_kandung}</td>
          </tr>

          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Keluarga yang dapat dihubungi</th>
            <td style={styleTableBorder}>{data?.keluarga_yang_dihubungi}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>Nama Keluarga yang dapat dihubungi</th>
            <td style={styleTableBorder}>{data?.nama_keluarga_yang_dihubungi}</td>
          </tr>
          <tr style={styleTableBody}>
            <th style={styleTableBorder}>No. Handphone Keluarga</th>
            <td style={styleTableBorder}>{data?.no_hp_keluarga}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableDetailKaryawan;
