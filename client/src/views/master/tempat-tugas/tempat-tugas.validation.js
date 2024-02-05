import * as Yup from 'yup';

export const tempatTugasValidationSchema = Yup.object().shape({
  jabatan_id: Yup.string().required('Jabatan wajib diisi'),
  lokasi_tempat_tugas: Yup.string().required('Lokasi tugas wajib diisi'),
  nama_proyek: Yup.string().required('Nama proyek wajib diisi'),
  unit_id: Yup.string().required('Unit wajib diisi')
});
