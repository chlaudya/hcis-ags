import * as Yup from 'yup';

export const karyawanValidationSchema = Yup.object().shape({
  karyawan_nip: Yup.string().required('wajib diisi!'),
  karyawan_name: Yup.string().required('wajib diisi!'),
  tempat_lahir: Yup.string().required('wajib diisi!'),
  tanggal_lahir: Yup.string().required('wajib diisi!'),
  agama: Yup.string().required('wajib diisi!'),
  gender: Yup.string().required('wajib diisi!'),
  status_nikah: Yup.string().required('wajib diisi!'),
  alamat_rumah: Yup.string().required('wajib diisi!'),
  bank_id: Yup.string().required('wajib diisi!'),
  no_rekening: Yup.string().required('wajib diisi!'),
  email: Yup.string().required('wajib diisi!'),
  no_handphone: Yup.string().required('wajib diisi!'),
  nonik: Yup.string().required('wajib diisi!'),
  nokk: Yup.string().required('wajib diisi!'),
  nonpwp: Yup.string().required('wajib diisi!'),
  no_bpjs_tenaga_kerja: Yup.string().required('wajib diisi!'),
  no_bpjs_kesehatan: Yup.string().required('wajib diisi!'),
  lampiran_cv: Yup.string().required('wajib diisi!'),
  golongan_darah: Yup.string().required('wajib diisi!'),
  nama_ayah_kandung: Yup.string().required('wajib diisi!'),
  nama_ibu_kandung: Yup.string().required('wajib diisi!'),
  keluarga_yang_dihubungi: Yup.string().required('wajib diisi!'),
  nama_keluarga_yang_dihubungi: Yup.string().required('wajib diisi!'),
  alamat_domisili: Yup.string().required('wajib diisi!'),
  no_hp_keluarga: Yup.string().required('wajib diisi!'),
  rekening_atas_nama: Yup.string().required('wajib diisi!'),
  pendidikan_terakhir: Yup.array().min(1, 'wajib diisi!').required('wajib diisi!')
});

export const educationHistoryValidationSchema = Yup.object().shape({
  pendidikan: Yup.string().required('wajib diisi!'),
  nama_sekolah: Yup.string().required('wajib diisi!'),
  jurusan: Yup.string().required('wajib diisi!'),
  asal_sekolah: Yup.string().required('wajib diisi!'),
  tahun_mulai: Yup.string().required('wajib diisi!'),
  tahun_berakhir: Yup.string().required('wajib diisi!')
});

export const employmentHistoryValidationSchema = Yup.object().shape({
  nama_perusahaan: Yup.string().required('wajib diisi!'),
  tahun_mulai: Yup.string().required('wajib diisi!'),
  tahun_berakhir: Yup.string().required('wajib diisi!'),
  keterangan: Yup.string().required('wajib diisi!')
});
