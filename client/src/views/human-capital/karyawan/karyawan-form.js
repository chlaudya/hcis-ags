/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Label, Row, Spinner } from 'reactstrap';
import { Form, Formik } from 'formik';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { FormField } from 'src/ui-component/form-field';
import MainCard from 'src/ui-component/cards/MainCard';
import { getStateKaryawan, getStateMasterBank, getStateUser } from 'store/stateSelector';
import { addKaryawan, getKaryawanDetail, updateKaryawan } from 'store/actions/karyawan';
import { karyawanValidationSchema } from './karyawan.validation';
import { EDUCATION, GENDER, IS_ACTIVE, MARITAL_STATUS, RELIGION } from 'constants/general.constant';
import { INITIAL_VALUES_KARYAWAN } from './karyawan.const';
import { getDropdownBank } from 'store/actions/master-bank';
import { fileToBase64 } from 'utils/convertFileToBase64';
import csrfProtection from 'utils/csrfProtection';

const FormFieldKaryawan = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { karyawanDetail, isSubmitting } = useSelector(getStateKaryawan);
  const { user } = useSelector(getStateUser);
  const { dropdownBank } = useSelector(getStateMasterBank);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_KARYAWAN);
  const [fileCV, setFileCV] = useState();

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getDropdownBank());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getKaryawanDetail(id));
      setInitialValues(karyawanDetail);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setInitialValues(karyawanDetail);
    }
  }, [karyawanDetail]);

  const redirectToKaryawan = () => {
    navigate('/human-capital/karyawan');
  };

  const handleFileSelected = async (event) => {
    const file = await fileToBase64(event.target.files[0]);
    setFileCV(file);
  };

  const handleSubmit = (values) => {
    const reqBodyWithCv = {
      ...values,
      lampiran_cv: fileCV,
      karyawan_id: id,
      usr_update: user.preferred_username
    };

    const reqBodyNoCv = {
      ...values,
      karyawan_id: id,
      usr_update: user.preferred_username
    };

    if (id) {
      if (fileCV) {
        dispatch(updateKaryawan({ reqBody: reqBodyWithCv, redirect: redirectToKaryawan }));
      } else {
        dispatch(updateKaryawan({ reqBody: reqBodyNoCv, redirect: redirectToKaryawan }));
      }
    } else {
      dispatch(addKaryawan({ ...values, lampiran_cv: fileCV }, redirectToKaryawan));
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
              title={id ? 'Edit Data Karyawan' : 'Input Data Karyawan'}
              iconAction={ArrowBackIcon}
              onClickIcon={redirectToKaryawan}
            >
              <Row>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtNip"
                    name="karyawan_nip"
                    label="NIP"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNama"
                    name="karyawan_name"
                    label="Nama"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTempat"
                    name="tempat_tinggal"
                    label="Tempat Lahir"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTanggalLahir"
                    name="tanggal_lahir"
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
                    label="Jenis Kelamin"
                    tag="select"
                    options={GENDER}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtStatus"
                    name="status_nikah"
                    label="Status"
                    tag="select"
                    options={MARITAL_STATUS}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtAlamat"
                    name="alamat_rumah"
                    label="Alamat Rumah"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtBank"
                    name="bank_id"
                    label="Bank"
                    tag="select"
                    options={dropdownBank}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtRekg"
                    name="no_rekening"
                    label="No. Rekening"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtAktif"
                    name="is_active"
                    label="Aktif"
                    tag="select"
                    isDisabled={!id}
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
                    name="no_handphone"
                    label="No.Handphone"
                    tag="input"
                    // type="number"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNik"
                    name="nonik"
                    label="No. KTP"
                    tag="input"
                    // type="number"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNoKK"
                    name="nokk"
                    label="No. KK"
                    tag="input"
                    // type="number"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNpwp"
                    name="nonpwp"
                    label="No. NPWP"
                    tag="input"
                    // type="number"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtPendidikan"
                    name="pendidikan_terakhir"
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
                    name="asal_sekolah"
                    label="Asal Sekolah"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtBpjsTenaga"
                    name="no_bpjs_tenaga_kerja"
                    label="No. Ketenagakerjaan"
                    tag="input"
                    // type="number"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtBpjsKes"
                    name="no_bpjs_kesehatan"
                    label="No. Kesehatan"
                    tag="input"
                    // type="number"
                  />
                  <Label htmlFor="FileCv">Lampiran CV</Label>
                  <Input
                    className="mb-2"
                    name="lampiran_cv"
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
