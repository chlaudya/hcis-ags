import { Trash2 } from 'react-feather';

export const INITIAL_VALUES_KARYAWAN = {
  karyawan_nip: '',
  karyawan_name: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  agama: '',
  gender: '',
  status_nikah: '',
  alamat_rumah: '',
  bank_id: '',
  no_rekening: '',
  email: '',
  no_handphone: '',
  nonik: '',
  nokk: '',
  nonpwp: '',
  pendidikan_terakhir: [],
  no_bpjs_tenaga_kerja: '',
  no_bpjs_kesehatan: '',
  lampiran_cv: '',
  golongan_darah: '',
  nama_ayah_kandung: '',
  nama_ibu_kandung: '',
  keluarga_yang_dihubungi: '',
  nama_keluarga_yang_dihubungi: '',
  alamat_domisili: '',
  no_hp_keluarga: '',
  rekening_atas_nama: '',
  riwayat_pekerjaan: []
};

export const COLUMN_TABLE_EMPLOYMENT_HISTORY = ({ withDeleteAction, onDelete }) => {
  return [
    {
      id: 1,
      name: 'No',
      width: '5%',
      cell: (_row, index) => index + 1
    },
    {
      id: 2,
      name: 'Nama Perusahaan',
      width: '25%',
      cell: (row) => row.nama_perusahaan
    },
    {
      id: 3,
      name: 'Tahun Mulai',
      width: '20%',
      cell: (row) => row.tahun_mulai
    },
    {
      id: 4,
      name: 'Tahun Berakhir',
      width: '20%',
      cell: (row) => row.tahun_berakhir
    },
    {
      id: 5,
      name: 'Keterangan',
      width: '20%',
      cell: (row) => row.keterangan
    },
    {
      id: 6,
      name: '',
      width: withDeleteAction ? '10%' : '0',
      cell: (row) => {
        if (withDeleteAction) {
          return (
            <span>
              <Trash2
                onClick={() => onDelete(row?.detail_riwayat_pekerjaan_id)}
                size={15}
                className="danger cursor-pointer"
                color="red"
              />
            </span>
          );
        }
      }
    }
  ];
};

export const COLUMN_TABLE_EDUCATION_HISTORY = ({ withDeleteAction, onDelete }) => {
  return [
    {
      id: 1,
      name: 'No',
      width: '5%',
      cell: (_row, index) => index + 1
    },
    {
      id: 2,
      name: 'Pendidikan',
      width: '15%',
      cell: (row) => row?.pendidikan?.toUpperCase()
    },
    {
      id: 3,
      name: 'Nama Sekolah',
      width: '20%',
      cell: (row) => row.nama_sekolah
    },
    {
      id: 4,
      name: 'Jurusan',
      width: '20%',
      cell: (row) => row.jurusan
    },
    {
      id: 5,
      name: 'Asal Sekolah',
      width: '20%',
      cell: (row) => row.asal_sekolah
    },
    {
      id: 5,
      name: 'Tahun Mulai',
      width: '10%',
      cell: (row) => row.tahun_mulai
    },
    {
      id: 5,
      name: 'Tahun Berakhir',
      width: '10%',
      cell: (row) => row.tahun_berakhir
    },
    {
      id: 6,
      name: '',
      width: withDeleteAction ? '10%' : '0',
      cell: (row) => {
        if (withDeleteAction) {
          return (
            <span>
              <Trash2
                onClick={() => onDelete(row?.detail_pendidikan_id)}
                size={15}
                className="danger cursor-pointer"
                color="red"
              />
            </span>
          );
        }
      }
    }
  ];
};
