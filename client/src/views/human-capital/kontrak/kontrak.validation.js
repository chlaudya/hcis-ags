import * as Yup from 'yup';

export const kontrakValidationSchema = Yup.object().shape({
  gaji: Yup.string().required('wajib diisi!'),
  jabatan_id: Yup.string().required('wajib diisi!'),
  karyawan_name: Yup.string().required('wajib diisi!'),
  karyawan_nip: Yup.string().required('wajib diisi!'),
  kontrak_kode: Yup.string().required('wajib diisi!'),
  tanggal_lahir: Yup.string().required('wajib diisi!'),
  nonik: Yup.string().required('wajib diisi!'),
  tempat_tinggal: Yup.string().required('wajib diisi!'),
  tempat_tugas_id: Yup.string().required('wajib diisi!'),
  tgl_habis_kontrak: Yup.string().required('wajib diisi!'),
  tgl_masuk_kerja: Yup.string().required('wajib diisi!'),
  tipe_tunjangan: Yup.string().required('wajib diisi!'),
  unit_id: Yup.string().required('wajib diisi!'),
  request_no: Yup.string().required('wajib diisi!'),
  request_date: Yup.string().required('wajib diisi!'),
  uang_makan: Yup.string().required('wajib diisi!')
});
