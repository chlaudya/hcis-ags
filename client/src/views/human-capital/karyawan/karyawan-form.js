/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Label, Row, Spinner } from 'reactstrap';
import { Form, Formik } from 'formik';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Plus } from 'react-feather';
import { v4 as uuidv4 } from 'uuid';
import SweetAlert from 'react-bootstrap-sweetalert';

import { FormField } from 'src/ui-component/form-field';
import MainCard from 'src/ui-component/cards/MainCard';
import { ModalContext } from 'src/ui-component/modal';

import { getStateKaryawan, getStateMasterBank, getStateUser } from 'store/stateSelector';
import { addKaryawan, getKaryawanDetail, updateKaryawan } from 'store/actions/karyawan';
import { karyawanValidationSchema } from './karyawan.validation';

import { getDropdownBank } from 'store/actions/master-bank';
import { fileToBase64 } from 'utils/convertFileToBase64';
import csrfProtection from 'utils/csrfProtection';
import { replaceNullWithEmptyString } from 'utils/replaceNullWithEmptyString';
import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';
import {
  BLOOD_TYPE,
  GENDER,
  MARITAL_STATUS,
  NUMBER_SP,
  RELIGION
} from 'constants/general.constant';
import {
  COLUMN_TABLE_EDUCATION_HISTORY,
  COLUMN_TABLE_EMPLOYMENT_HISTORY,
  INITIAL_VALUES_KARYAWAN
} from './karyawan.const';
import FormEducationHistory from './components/FormEducationHistory';
import FormEmploymentHistory from './components/FormEmploymentHistory';
import TableFormik from 'src/ui-component/tableFormik/TableFormik';
import moment from 'moment';

const FormFieldKaryawan = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showModal, hideModal } = useContext(ModalContext);

  const { karyawanDetail, isSubmitting } = useSelector(getStateKaryawan);
  // const { user } = useSelector(getStateUser);
  const { dropdownBank } = useSelector(getStateMasterBank);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_KARYAWAN);
  const [fileCV, setFileCV] = useState();
  const [showModalDeleteEducation, setShowModalDeleteEducation] = useState(false);
  const [showModalDeleteEmployment, setShowModalDeleteEmployment] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [employmentList, setEmploymentList] = useState([]);
  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getDropdownBank());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getKaryawanDetail(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && karyawanDetail) {
      const existingValue = { ...karyawanDetail, lampiran_cv: karyawanDetail.file_upload_id };
      setInitialValues(replaceNullWithEmptyString(existingValue));
      setEducationList(karyawanDetail.pendidikan_terakhir);
      setEmploymentList(karyawanDetail.riwayat_pekerjaan);
    }
  }, [karyawanDetail, id]);

  const redirectToKaryawan = () => {
    navigate('/human-capital/karyawan');
  };

  const handleFileSelected = async (event, setFieldValue) => {
    const file = await fileToBase64(event.target.files[0]);
    setFileCV(file);
    setFieldValue('lampiran_cv', file);
  };

  const handleSubmit = ({ values, isValid }) => {
    const reqBodyWithCv = {
      ...values,
      lampiran_cv: fileCV,
      karyawan_id: id,
      tanggal_surat_peringatan: moment(new Date()).format('YYYY-MM-DD')
    };

    const reqBodyNoCv = {
      ...values,
      karyawan_id: id,
      tanggal_surat_peringatan: moment(new Date()).format('YYYY-MM-DD')
    };

    if (isValid) {
      if (id) {
        if (fileCV) {
          dispatch(updateKaryawan({ reqBody: reqBodyWithCv, redirect: redirectToKaryawan }));
        } else {
          dispatch(updateKaryawan({ reqBody: reqBodyNoCv, redirect: redirectToKaryawan }));
        }
      } else {
        dispatch(addKaryawan({ ...values, lampiran_cv: fileCV }, redirectToKaryawan));
      }
    }
  };

  const onSubmitFormEducationHistory = ({ setFieldValue, values }) => {
    const detailEducationId = uuidv4();
    const updatedValue = [
      ...educationList,
      {
        ...values,
        detail_pendidikan_id: detailEducationId
      }
    ];

    setFieldValue('pendidikan_terakhir', updatedValue);
    setEducationList(updatedValue);

    hideModal();
  };

  const onSubmitFormEmploymentHistory = ({ setFieldValue, values }) => {
    const detailEmploymentId = uuidv4();
    const updatedValue = [
      ...employmentList,
      {
        ...values,
        detail_riwayat_pekerjaan_id: detailEmploymentId
      }
    ];

    setFieldValue('riwayat_pekerjaan', updatedValue);
    setEmploymentList(updatedValue);

    hideModal();
  };

  const onDeleteEducationHistory = (setFieldValue) => {
    const filteredEducationList = educationList?.filter(
      (item) => item.detail_pendidikan_id !== deleteId
    );
    setEducationList(filteredEducationList);
    setFieldValue('pendidikan_terakhir', filteredEducationList);
    setShowModalDeleteEducation(false);
  };

  const onDeleteEmploymentHistory = (setFieldValue) => {
    const filteredEmploymentList = employmentList?.filter(
      (item) => item.detail_riwayat_pekerjaan_id !== deleteId
    );
    setEmploymentList(filteredEmploymentList);
    setFieldValue('riwayat_pekerjaan', filteredEmploymentList);
    setShowModalDeleteEmployment(false);
  };

  const openModalConfirmationDeleteEducationList = (id) => {
    setDeleteId(id);
    setShowModalDeleteEducation(true);
  };

  const openModalConfirmationDeleteEmploymentList = (id) => {
    setDeleteId(id);
    setShowModalDeleteEmployment(true);
  };

  const openModalAddEducationHistory = (setFieldValue) =>
    showModal(MODAL_TYPES.MODAL_DETAIL, {
      modalTitle: 'Add Riwayat Pendidikan',
      size: 'sm',
      children: (
        <FormEducationHistory
          onSubmit={(values) => onSubmitFormEducationHistory({ setFieldValue, values })}
        />
      )
    });

  const openModalAddEmploymentHistory = (setFieldValue) =>
    showModal(MODAL_TYPES.MODAL_DETAIL, {
      modalTitle: 'Add Riwayat Pekerjaan',
      size: 'sm',
      children: (
        <FormEmploymentHistory
          onSubmit={(values) => onSubmitFormEmploymentHistory({ setFieldValue, values })}
        />
      )
    });

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={karyawanValidationSchema}
    >
      {({ values, isValid, errors, touched, setFieldValue }) => {
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
                    disabled={id && !!values.karyawan_nip}
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
                    name="tempat_lahir"
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
                    id="TxtGolonganDarah"
                    name="golongan_darah"
                    label="Golongan Darah"
                    tag="select"
                    options={BLOOD_TYPE}
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
                    id="TxtNamaAyah"
                    name="nama_ayah_kandung"
                    label="Nama Ayah Kandung"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNamaIbu"
                    name="nama_ibu_kandung"
                    label="Nama Ibu Kandung"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtKeluargaDihubungi"
                    name="keluarga_yang_dihubungi"
                    label="Keluarga Yang Bisa Dihubungi"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNamaKeluargaDihubungi"
                    name="nama_keluarga_yang_dihubungi"
                    label="Nama Keluarga Yang Bisa Dihubungi"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNoHpKeluarga"
                    name="no_hp_keluarga"
                    label="No. Handphone Keluarga"
                    tag="input"
                    type="tel"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtAlamat"
                    name="alamat_rumah"
                    label="Alamat Rumah"
                    tag="input"
                    type="textarea"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtAlamatDomisili"
                    name="alamat_domisili"
                    label="Alamat Domisili"
                    tag="input"
                    type="textarea"
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
                    type="tel"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNik"
                    name="nonik"
                    label="No. KTP"
                    tag="input"
                    disabled={id && !!values.nonik}
                  />
                  <FormField className="mb-2" id="TxtNoKK" name="nokk" label="No. KK" tag="input" />
                  <FormField
                    className="mb-2"
                    id="TxtNpwp"
                    name="nonpwp"
                    label="No. NPWP"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtBpjsTenaga"
                    name="no_bpjs_tenaga_kerja"
                    label="No. Ketenagakerjaan"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtBpjsKes"
                    name="no_bpjs_kesehatan"
                    label="No. Kesehatan"
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
                    id="TxtRekgAtasNama"
                    name="rekening_atas_nama"
                    label="Rekening Atas Nama"
                    tag="input"
                  />

                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Label>Riwayat Pekerjaan</Label>
                    <Button
                      outline
                      color="primary"
                      size="sm"
                      type="button"
                      onClick={() => openModalAddEmploymentHistory(setFieldValue)}
                      style={{
                        padding: '5px 10px',
                        minHeight: 27,
                        minWidth: 61
                      }}
                    >
                      <Plus size={13} /> Add
                    </Button>
                  </div>

                  <TableFormik
                    columns={COLUMN_TABLE_EMPLOYMENT_HISTORY({
                      withDeleteAction: true,
                      onDelete: openModalConfirmationDeleteEmploymentList
                    })}
                    data={employmentList ?? []}
                    name="riwayat_pekerjaan"
                    error={errors.riwayat_pekerjaan && touched.riwayat_pekerjaan}
                    isEmpty={employmentList?.length === 0}
                    defaultEmptyText="Empty List"
                    errorMessage="wajib diisi!"
                  />

                  <Label
                    htmlFor="FileCv"
                    className={
                      errors.lampiran_cv && touched.lampiran_cv ? `text-danger mt-2` : 'mt-2'
                    }
                  >
                    Lampiran CV
                  </Label>
                  <Input
                    className="mb-2"
                    style={{
                      borderColor: errors.lampiran_cv && touched.lampiran_cv ? '#ec0000' : '#ddd'
                    }}
                    name="lampiran_cv"
                    id="FileCv"
                    type="file"
                    accept=".pdf"
                    onChange={(event) => handleFileSelected(event, setFieldValue)}
                  />
                  {errors.lampiran_cv && touched.lampiran_cv ? (
                    <div className="text-bold-600 text-danger">{errors.lampiran_cv}</div>
                  ) : null}

                  <div className="d-flex justify-content-between align-items-center mb-1 mt-2">
                    <Label>Riwayat Pendidikan</Label>
                    <Button
                      outline
                      color="primary"
                      size="sm"
                      type="button"
                      onClick={() => openModalAddEducationHistory(setFieldValue)}
                      style={{
                        padding: '5px 10px',
                        minHeight: 27,
                        minWidth: 61
                      }}
                    >
                      <Plus size={13} /> Add
                    </Button>
                  </div>

                  <TableFormik
                    columns={COLUMN_TABLE_EDUCATION_HISTORY({
                      withDeleteAction: true,
                      onDelete: openModalConfirmationDeleteEducationList
                    })}
                    data={educationList ?? []}
                    name="pendidikan_terakhir"
                    error={errors.pendidikan_terakhir && touched.pendidikan_terakhir}
                    isEmpty={educationList?.length === 0}
                    defaultEmptyText="Empty List"
                    errorMessage="wajib diisi!"
                  />

                  {id && (
                    <FormField
                      className="mt-2"
                      id="DrpSP"
                      name="surat_peringatan"
                      label="Jumlah SP"
                      tag="select"
                      options={NUMBER_SP}
                    />
                  )}
                </Col>
              </Row>

              <Button
                color="primary"
                className="m-2 pe-4 ps-4"
                type="submit"
                onClick={() => handleSubmit({ values, isValid })}
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

              <Button color="primary" outline onClick={redirectToKaryawan}>
                Cancel
              </Button>
            </MainCard>
            <SweetAlert
              show={showModalDeleteEducation}
              showCancel
              type="warning"
              title={
                <>
                  Are you sure?
                  <h6 className="mt-1">You will not be able to recover this data!</h6>
                </>
              }
              btnSize="sm"
              confirmBtnText="Yes, delete it!"
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="outline-danger"
              closeOnClickOutside={false}
              onConfirm={() => onDeleteEducationHistory(setFieldValue)}
              onCancel={() => setShowModalDeleteEducation(false)}
            />

            <SweetAlert
              show={showModalDeleteEmployment}
              showCancel
              type="warning"
              title={
                <>
                  Are you sure?
                  <h6 className="mt-1">You will not be able to recover this data!</h6>
                </>
              }
              btnSize="sm"
              confirmBtnText="Yes, delete it!"
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="outline-danger"
              closeOnClickOutside={false}
              onConfirm={() => onDeleteEmploymentHistory(setFieldValue)}
              onCancel={() => setShowModalDeleteEmployment(false)}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormFieldKaryawan;
