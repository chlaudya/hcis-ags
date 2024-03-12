/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import csrfProtection from 'utils/csrfProtection';
import 'src/assets/scss/table.scss';
import { renderDropdownLabel } from 'utils/renderDropdownLabel';
import { MARITAL_STATUS } from 'constants/general.constant';
import { renderDate } from 'utils/renderDate';

const TableExcelKaryawan = ({ data, tableRef, period, unitBisnis }) => {
  const styleTableTitle = {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center'
  };

  const styleTableBody = {
    textAlign: 'center',
    verticalAlign: 'top'
  };

  const styleTableBorder = {
    border: '1px solid'
  };

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
  }, []);

  return (
    <div className="is-hidden">
      <table ref={tableRef} style={{ borderCollapse: 'collapse' }}>
        <tr className="fw-bold">
          <td colSpan="15" style={styleTableTitle}>
            DATA KARYAWAN
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="15" style={styleTableTitle}>
            PT. ARTHA GUTAWA SEJAHTERA
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="15" style={styleTableTitle}>
            {unitBisnis ? unitBisnis : 'OVERSEAS DIVISION'}
          </td>
        </tr>
        <tr className="fw-bold">
          <td colSpan="15" style={styleTableTitle}>
            Tanggal Generate : {renderDate(new Date())}
          </td>
        </tr>
        <tr></tr>
        <tr></tr>
        <thead>
          <tr style={{ ...styleTableBody, fontSize: '14px', verticalAlign: 'top' }}>
            <th style={styleTableBorder}>NO</th>
            <th style={styleTableBorder}>NIP</th>
            <th style={styleTableBorder}>NAMA</th>
            <th style={styleTableBorder}>TEMPAT LAHIR</th>
            <th style={styleTableBorder}>TANGGAL LAHIR</th>
            <th style={styleTableBorder}>AGAMA</th>
            <th style={styleTableBorder}>JENIS KELAMIN</th>
            <th style={styleTableBorder}>GOLONGAN DARAH</th>
            <th style={styleTableBorder}>STATUS</th>
            <th style={styleTableBorder}>NAMA AYAH KANDUNG</th>
            <th style={styleTableBorder}>NAMA IBU KANDUNG</th>
            <th style={styleTableBorder}>KELUARGA YANG BISA DIHUBUNGI</th>
            <th style={styleTableBorder}>NAMA KEL. YANG BISA DIHUBUNGI</th>
            <th style={styleTableBorder}>NO HANDPHONE KELUARGA</th>
            <th style={styleTableBorder}>ALAMAT RUMAH</th>
            <th style={styleTableBorder}>ALAMAT DOMISILI</th>

            <th style={styleTableBorder}>EMAIL</th>
            <th style={styleTableBorder}>NO. HANDPHONE</th>
            <th style={styleTableBorder}>NO. KTP</th>
            <th style={styleTableBorder}>NO. KK</th>
            <th style={styleTableBorder}>NO. NPWP</th>
            <th style={styleTableBorder}>NO. BPJS KETENAGAKERJAAN</th>
            <th style={styleTableBorder}>NO. BPJS KESEHATAN</th>
            <th style={styleTableBorder}>BANK</th>
            <th style={styleTableBorder}>NO REKENING</th>
            <th style={styleTableBorder}>REKENING ATAS NAMA</th>
            <th style={styleTableBorder}>RIWAYAT PEKERJAAN</th>
            <th style={styleTableBorder}>RIWAYAT PENDIDIKAN</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data?.map((item, index) => {
              return (
                <tr key={item.no} style={styleTableBody}>
                  <td style={styleTableBorder}>{index + 1}</td>
                  <td style={styleTableBorder}>
                    {item?.karyawan_nip ? "'" + item.karyawan_nip : ''}
                  </td>
                  <td style={styleTableBorder}>{item?.karyawan_name}</td>
                  <td style={styleTableBorder}>{item?.tempat_lahir}</td>
                  <td style={styleTableBorder}>{item?.tanggal_lahir}</td>
                  <td style={styleTableBorder}>{item?.agama}</td>
                  <td style={styleTableBorder}>
                    {item?.gender === '1' ? 'laki-laki' : 'perempuan'}
                  </td>
                  <td style={styleTableBorder}>{item?.golongan_darah}</td>
                  <td style={styleTableBorder}>
                    {renderDropdownLabel({
                      list: MARITAL_STATUS,
                      selectedValue: item?.status_nikah
                    })}
                  </td>
                  <td style={styleTableBorder}>{item?.nama_ayah_kandung}</td>
                  <td style={styleTableBorder}>{item?.nama_ibu_kandung}</td>
                  <td style={styleTableBorder}>{item?.keluarga_yang_dihubungi}</td>
                  <td style={styleTableBorder}>{item?.nama_keluarga_yang_dihubungi}</td>
                  <td style={styleTableBorder}>{item?.no_hp_keluarga}</td>
                  <td style={styleTableBorder}>{item?.alamat_rumah}</td>
                  <td style={styleTableBorder}>{item?.alamat_domisili}</td>

                  <td style={styleTableBorder}>{item?.email}</td>
                  <td style={styleTableBorder}>{item?.no_handphone}</td>
                  <td style={styleTableBorder}>{item?.nonik ? "'" + item.nonik : ''}</td>
                  <td style={styleTableBorder}>{item?.nokk ? "'" + item.nokk : ''}</td>
                  <td style={styleTableBorder}>{item?.nonpwp ? "'" + item.nonpwp : ''}</td>
                  <td style={styleTableBorder}>
                    {item?.no_bpjs_tenaga_kerja ? "'" + item.no_bpjs_tenaga_kerja : ''}
                  </td>
                  <td style={styleTableBorder}>
                    {item?.no_bpjs_kesehatan ? "'" + item.no_bpjs_kesehatan : ''}
                  </td>
                  <td style={styleTableBorder}>{item?.bank_name}</td>
                  <td style={styleTableBorder}>
                    {item?.no_rekening ? "'" + item.no_rekening : ''}
                  </td>
                  <td style={styleTableBorder}>{item?.rekening_atas_nama}</td>
                  <td style={styleTableBorder}>
                    <ul>
                      {item?.riwayat_pekerjaan?.map((job, index) => (
                        <li key={index}>
                          <strong>Nama Perusahaan:</strong> {job.nama_perusahaan}
                          <br />
                          <strong>Tahun Mulai:</strong> {job.tahun_mulai}
                          <br />
                          <strong>Tahun Berakhir:</strong> {job.tahun_berakhir}
                          <br />
                          <strong>Keterangan:</strong> {job.keterangan}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={styleTableBorder}>
                    <ul>
                      {item?.pendidikan_terakhir?.map((education, index) => (
                        <li key={index}>
                          <strong>Pendidikan:</strong> {education.pendidikan}
                          <br />
                          <strong>Nama Sekolah:</strong> {education.nama_sekolah}
                          <br />
                          <strong>Jurusan:</strong> {education.jurusan}
                          <br />
                          <strong>Asal Sekolah:</strong> {education.asal_sekolah}
                          <br />
                          <strong>Tahun Mulai:</strong> {education.tahun_mulai}
                          <br />
                          <strong>Tahun Berakhir:</strong> {education.tahun_berakhir}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableExcelKaryawan;
