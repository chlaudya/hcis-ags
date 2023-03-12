/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Label, Row, Spinner } from 'reactstrap';
import { Form, Formik } from 'formik';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { FormField } from 'src/ui-component/form-field';
import MainCard from 'src/ui-component/cards/MainCard';
import { getStateKaryawan } from 'store/stateSelector';
import { getKaryawanDetail, updateKaryawan } from 'store/actions/karyawan';
import { karyawanValidationSchema } from './karyawan.validation';
import { EDUCATION, GENDER, IS_ACTIVE, MARITAL_STATUS, RELIGION } from 'constants/general.constant';
import { INITIAL_VALUES_KARYAWAN } from './karyawan.const';

const FormFieldKaryawan = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { karyawanDetail, isSubmitting } = useSelector(getStateKaryawan);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_KARYAWAN);
  const [fileCV, setFileCV] = useState();

  useEffect(() => {
    if (state) {
      dispatch(getKaryawanDetail({ ...state }));
    }
  }, [state]);

  useEffect(() => {
    setInitialValues(karyawanDetail);
  }, [karyawanDetail]);

  const redirectToKaryawan = () => {
    navigate('/human-capital/karyawan');
  };

  const handleFileSelected = (event) => {
    console.log('files:', event.target.files[0]);
    setFileCV(event.target.files[0]);
  };

  const handleSubmit = (values) => {
    if (state) {
      dispatch(
        updateKaryawan(
          { ...values, filePath: fileCV, karyawanId: state.karyawanId },
          redirectToKaryawan
        )
      );
    } else {
      dispatch(updateKaryawan({ ...values, filePath: fileCV }, redirectToKaryawan));
    }
  };

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={karyawanValidationSchema}
    >
      {({ values, isValid }) => {
        return (
          <Form>
            <MainCard
              title={state ? 'Edit Data Karyawan' : 'Input Data Karyawan'}
              iconAction={ArrowBackIcon}
              onClickIcon={redirectToKaryawan}
            >
              <Row>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtNip"
                    name="karyawanNip"
                    label="NIP"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNama"
                    name="karyawanName"
                    label="Nama"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTempat"
                    name="tempatTinggal"
                    label="Tempat Lahir"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTanggalLahir"
                    name="tanggalLahir"
                    label="Tanggal Lahir"
                    tag="input"
                    type="date"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtAgama"
                    name="agama"
                    label="Agama"
                    tag="select"
                    options={RELIGION}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtJenisKelamin"
                    name="gender"
                    label="Jenis Kelamnin"
                    tag="select"
                    options={GENDER}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtStatus"
                    name="statusNikah"
                    label="Status"
                    tag="select"
                    options={MARITAL_STATUS}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtAlamat"
                    name="alamatRumah"
                    label="Alamat Rumah"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtBank"
                    name="bankName"
                    label="Bank"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtRekg"
                    name="noRekening"
                    label="No. Rekening"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtAktif"
                    name="isActive"
                    label="Aktif"
                    tag="select"
                    options={IS_ACTIVE}
                  />
                </Col>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtEmail"
                    name="email"
                    label="Email"
                    tag="input"
                    type="email"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtHp"
                    name="noHandphone"
                    label="No.Handphone"
                    tag="input"
                    // type="number"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNik"
                    name="noNIK"
                    label="No. KTP"
                    tag="input"
                    // type="number"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNoKK"
                    name="noKK"
                    label="No. KK"
                    tag="input"
                    // type="number"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNpwp"
                    name="noNPWP"
                    label="No. NPWP"
                    tag="input"
                    // type="number"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtPendidikan"
                    name="pendidikanTerakhir"
                    label="Pendidikan"
                    tag="select"
                    options={EDUCATION}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtJurusan"
                    name="jurusan"
                    label="Jurusan"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtAsalSekolah"
                    name="asalSekolah"
                    label="Asal Sekolah"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtBpjsTenaga"
                    name="noBPJSTenagaKerja"
                    label="No. Ketenagakerjaan"
                    tag="input"
                    // type="number"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtBpjsKes"
                    name="noBPJSKesehatan"
                    label="No. Kesehatan"
                    tag="input"
                    // type="number"
                  />
                  <Label htmlFor="FileCv">Lampiran CV</Label>
                  <Input
                    className="mb-2"
                    name="filePath"
                    id="FileCv"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelected}
                  />
                </Col>
              </Row>

              <Button
                color="primary"
                className="m-2 pe-4 ps-4"
                type="submit"
                disabled={isValid}
                onClick={() => handleSubmit(values)}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" />
                    <span> Loading</span>
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </MainCard>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormFieldKaryawan;
