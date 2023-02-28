import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { FormField } from 'ui-component/form-field';
import { INITIAL_VALUES_KARYAWAN } from './karyawan.const';
import MainCard from 'ui-component/cards/MainCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router';
import { getStateKaryawan } from 'store/stateSelector';
import { getKaryawanDetail } from 'store/actions/karyawan';

const FormFieldKaryawan = ({ id, onSubmit }) => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { karyawanDetail } = useSelector(getStateKaryawan);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_KARYAWAN);

  useEffect(() => {
    if (state) {
      dispatch(getKaryawanDetail({ ...state }));
      setInitialValues(karyawanDetail);
    }
  }, [state, karyawanDetail]);

  const onClickIcon = () => {
    navigate('/human-capital/karyawan');
  };

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={initialValues}
      // validationSchema={classificationListValidationSchema}
      onSubmit={(values) => onSubmit(values, id)}
    >
      {() => {
        return (
          <MainCard title={state ? 'Edit Data Karyawan' : 'Input Data Karyawan'} iconAction={ArrowBackIcon} onClickIcon={onClickIcon}>
            <Form>
              <Row>
                <Col>
                  <FormField className="mb-2" idInput="TxtNip" name="karyawanNip" label="NIP" tag="input" />
                  <FormField className="mb-2" idInput="TxtNama" name="karyawanName" label="Nama" tag="input" />
                  <FormField className="mb-2" idInput="TxtTempat" name="tempatTinggal" label="Tempat" tag="input" />
                  <FormField className="mb-2" idInput="TxtTanggalLahir" name="tanggalLahir" label="Tanggal Lahir" tag="input" />
                  <FormField className="mb-2" idInput="TxtAgama" name="agama" label="Agama" tag="input" />
                  <FormField className="mb-2" idInput="TxtJenisKelamin" name="gender" label="Jenis Kelamnin" tag="input" />
                  <FormField className="mb-2" idInput="TxtStatus" name="statusNikah" label="Status" tag="input" />
                  <FormField className="mb-2" idInput="TxtStatus" name="alamatRumah" label="Alamat Rumah" tag="input" />
                  <FormField className="mb-2" idInput="TxtStatus" name="bankName" label="Bank" tag="input" />
                  <FormField className="mb-2" idInput="TxtStatus" name="noRekening" label="No. Rekening" tag="input" />
                  <FormField className="mb-2" idInput="TxtStatus" name="isActive" label="Aktif" tag="input" />
                </Col>
                <Col>
                  <FormField className="mb-2" idInput="TxtNip" name="email" label="Email" tag="input" />
                  <FormField className="mb-2" idInput="TxtNama" name="noHandphone" label="No.Handphone" tag="input" />
                  <FormField className="mb-2" idInput="TxtTempat" name="noNIK" label="No. KTP" tag="input" />
                  <FormField className="mb-2" idInput="TxtTanggalLahir" name="noKK" label="No. KK" tag="input" />
                  <FormField className="mb-2" idInput="TxtAgama" name="noNPWP" label="No. NPWP" tag="input" />
                  <FormField className="mb-2" idInput="TxtAgama" name="pendidikanTerakhir" label="Pendidikan" tag="input" />
                  <FormField className="mb-2" idInput="TxtAgama" name="jurusan" label="Jurusan" tag="input" />
                  <FormField className="mb-2" idInput="TxtAgama" name="asalSekolah" label="Asal Sekolah" tag="input" />
                  <FormField className="mb-2" idInput="TxtAgama" name="noBPJSTenagaKerja" label="No. Ketenagakerjaan" tag="input" />
                  <FormField className="mb-2" idInput="TxtAgama" name="noBPJSKesehatan" label="No. Kesehatan" tag="input" />
                  <FormField className="mb-2" idInput="TxtAgama" name="filePath" label="Lampiran CV" tag="input" />
                </Col>
              </Row>

              <Button
                color="primary"
                className="m-2 pe-4 ps-4"
                type="submit"
                // disabled={isSubmitting}
              >
                {/* {isSubmitting ? (
                <>
                  <Spinner size='sm' />
                  <span> Loading</span>
                </>
              ) : ( */}
                Save
                {/* )} */}
              </Button>
              {/* <Button outline color="primary" className="m-2" onClick={hideModal}>
                Cancel
              </Button> */}
            </Form>
          </MainCard>
        );
      }}
    </Formik>
  );
};

export default FormFieldKaryawan;
