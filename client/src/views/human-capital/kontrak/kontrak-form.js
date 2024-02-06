/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Label, Row, Spinner } from 'reactstrap';
import { Form, Formik } from 'formik';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { FormField } from 'src/ui-component/form-field';
import MainCard from 'src/ui-component/cards/MainCard';
import {
  getStateKaryawan,
  getStateKontrak,
  getStateMasterJabatan,
  getStateMasterTempatTugas,
  getStateMasterUnitBisnis,
  getStateUser
} from 'store/stateSelector';
import { kontrakValidationSchema } from './kontrak.validation';
import { INITIAL_VALUES_KONTRAK } from './kontrak.const';
import csrfProtection from 'utils/csrfProtection';
import { addKontrak, getKontrakDetail, updateKontrak } from 'store/actions/kontrak';
import { getKaryawanByNip } from 'store/actions/karyawan';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import { getDropdownTempatTugas } from 'store/actions/master-tempat-tugas';
import { getDropdownJabatan } from 'store/actions/master-jabatan';
import {
  inputThousandSeparator,
  removeThousandSeparator,
  setThousandSeparatorNominal
} from 'utils/thousandSeparator';
import { replaceNullWithEmptyString } from 'utils/replaceNullWithEmptyString';
import { fileToBase64 } from 'utils/convertFileToBase64';
import './kontrak-form.scss';
import { Trash } from 'react-feather';

const FormFieldKontrak = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { extendContract } = state ?? false;

  const { kontrakDetail, isSubmitting } = useSelector(getStateKontrak);
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const { dropdownTempatTugas } = useSelector(getStateMasterTempatTugas);
  const { dropdownJabatan } = useSelector(getStateMasterJabatan);
  const { karyawanByNip } = useSelector(getStateKaryawan);
  const { user } = useSelector(getStateUser);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_KONTRAK);
  const [searchNip, setSearchNip] = useState('');
  const inputFile = useRef(null);

  const handleSelectedDocContract = async (event, setFieldValue) => {
    const file = await fileToBase64(event.target.files[0]);
    setFieldValue('upload_doc_kontrak', file);
  };

  const handleDeleteDocContract = (setFieldValue) => {
    if (inputFile.current) {
      inputFile.current.value = '';
      inputFile.current.type = 'text';
      inputFile.current.type = 'file';
    }
    setFieldValue('upload_doc_kontrak', '');
  };

  const redirectToKontrak = () => {
    navigate('/human-capital/kontrak');
  };

  const handleChangeNip = (value) => {
    dispatch(getKaryawanByNip(value));
    setSearchNip(true);
  };

  const handleNominalField = ({ value, fieldName, setFieldValue }) => {
    setFieldValue(fieldName, setThousandSeparatorNominal(value));
  };

  const handleSubmit = (values) => {
    const formattedGaji = Number(removeThousandSeparator(values.gaji));
    const formattedUangMakan = Number(removeThousandSeparator(values.uang_makan));
    const formattedTunjangan = Number(removeThousandSeparator(values.tunjangan));
    const formattedTunjanganKomunikasi = Number(
      removeThousandSeparator(values.tunjangan_komunikasi)
    );
    const formattedTunjanganKhusus = Number(removeThousandSeparator(values.tunjangan_khusus));
    const formattedTunjanganVariable = Number(removeThousandSeparator(values.tunjangan_variable));

    const reqBodyEdit = {
      kontrak_id: id,
      karyawan_nip: values.karyawan_nip || '',
      kontrak_kode: values.kontrak_kode || '',
      request_no: values.request_no || '',
      tgl_masuk_kerja: values.tgl_masuk_kerja || '',
      tgl_habis_kontrak: values.tgl_habis_kontrak || '',
      tempat_tugas_id: values.tempat_tugas_id || '',
      unit_id: values.unit_id || '',
      jabatan_id: values.jabatan_id || '',
      request_date: values.request_date || '',
      gaji: formattedGaji,
      uang_makan: formattedUangMakan,
      tunjangan: formattedTunjangan,
      tunjangan_komunikasi: formattedTunjanganKomunikasi,
      tunjangan_khusus: formattedTunjanganKhusus,
      tunjangan_variable: formattedTunjanganVariable,
      is_active: true,
      is_upload: !!values.upload_doc_kontrak || '',
      upload_doc_kontrak: values.upload_doc_kontrak || '',
      usr_update: user.preferred_username
    };

    const reqBodyAdd = {
      karyawan_nip: values.karyawan_nip || '',
      kontrak_kode: values.kontrak_kode || '',
      request_no: values.request_no || '',
      tgl_masuk_kerja: values.tgl_masuk_kerja || '',
      tgl_habis_kontrak: values.tgl_habis_kontrak || '',
      tempat_tugas_id: values.tempat_tugas_id || '',
      unit_id: values.unit_id || '',
      jabatan_id: values.jabatan_id || '',
      request_date: values.request_date || '',
      gaji: formattedGaji,
      uang_makan: formattedUangMakan,
      tunjangan: formattedTunjangan,
      tunjangan_komunikasi: formattedTunjanganKomunikasi,
      tunjangan_khusus: formattedTunjanganKhusus,
      tunjangan_variable: formattedTunjanganVariable
    };

    if (id && !extendContract) {
      dispatch(updateKontrak({ reqBody: reqBodyEdit, redirect: redirectToKontrak }));
    } else {
      dispatch(addKontrak(reqBodyAdd, redirectToKontrak));
    }
  };

  const renderTextButton = () => {
    switch (true) {
      case extendContract:
        return <span>Perpanjang</span>;
      case !!id:
        return <span>Update</span>;
      default:
        return <span>Save</span>;
    }
  };

  const renderTitleKontrak = () => {
    switch (true) {
      case extendContract:
        return 'Perpanjang Kontrak';
      case !!id:
        return 'Update Kontrak';
      default:
        return 'Input Kontrak';
    }
  };

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getDropdownUnitBisnis());
    dispatch(getDropdownTempatTugas());
    dispatch(getDropdownJabatan());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getKontrakDetail(id));
    }
  }, [id]);

  useEffect(() => {
    const data = replaceNullWithEmptyString(kontrakDetail);
    if (extendContract) {
      setInitialValues({
        karyawan_nip: data?.karyawan_nip,
        nonik: data?.nonik,
        karyawan_name: data?.karyawan_name,
        tempat_lahir: data?.tempat_lahir,
        tanggal_lahir: data?.tanggal_lahir
      });
    }
    if (id && !extendContract) {
      setInitialValues({
        ...data,
        gaji: inputThousandSeparator(data?.gaji || 0),
        uang_makan: inputThousandSeparator(data?.uang_makan || 0),
        tunjangan: inputThousandSeparator(data?.tunjangan || 0),
        tunjangan_komunikasi: inputThousandSeparator(data?.tunjangan_komunikasi || 0),
        tunjangan_khusus: inputThousandSeparator(data?.tunjangan_khusus || 0),
        tunjangan_variable: inputThousandSeparator(data?.tunjangan_variable || 0)
      });
    }
  }, [kontrakDetail]);

  useEffect(() => {
    const data = replaceNullWithEmptyString(karyawanByNip);
    if (searchNip && karyawanByNip) {
      setInitialValues(() => ({
        karyawan_nip: data?.karyawan_nip,
        nonik: data?.nonik,
        karyawan_name: data?.karyawan_name,
        tempat_lahir: data?.tempat_lahir,
        tanggal_lahir: data?.tanggal_lahir
      }));
    } else {
      setInitialValues((prevState) => ({
        ...prevState,
        karyawan_nip: '',
        karyawan_name: '',
        nonik: '',
        tempat_lahir: '',
        tanggal_lahir: ''
      }));
    }
  }, [karyawanByNip]);

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={kontrakValidationSchema}
    >
      {({ values, isValid, setFieldValue }) => {
        return (
          <Form>
            <MainCard
              title={renderTitleKontrak()}
              iconAction={ArrowBackIcon}
              onClickIcon={redirectToKontrak}
            >
              <Row>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtNip"
                    name="karyawan_nip"
                    label="NIP"
                    tag="input"
                    onChangeInput={handleChangeNip}
                    disabled={id}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtKtp"
                    name="nonik"
                    label="KTP"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNama"
                    name="karyawan_name"
                    label="Nama"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTempatLahir"
                    name="tempat_lahir"
                    label="Tempat Lahir"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTanggalLahir"
                    name="tanggal_lahir"
                    label="Tanggal Lahir"
                    tag="input"
                    type="date"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTanggalMasuk"
                    name="tgl_masuk_kerja"
                    label="Tanggal Masuk Kerja"
                    tag="input"
                    type="date"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNpwp"
                    name="tgl_habis_kontrak"
                    label="Tanggal Habis Kontrak"
                    tag="input"
                    type="date"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtKontrakKode"
                    name="kontrak_kode"
                    label="No. Kontrak"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtRequestNo"
                    name="request_no"
                    label="Request No."
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTglRequest"
                    name="request_date"
                    label="Tanggal Request"
                    tag="input"
                    type="date"
                  />
                </Col>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtUnitBisnis"
                    name="unit_id"
                    label="Unit Bisnis"
                    tag="select"
                    options={dropdownUnitBisnis}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTempatTugas"
                    name="tempat_tugas_id"
                    label="Tempat Tugas"
                    tag="select"
                    options={dropdownTempatTugas}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtJabatan"
                    name="jabatan_id"
                    label="Jabatan"
                    tag="select"
                    options={dropdownJabatan}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtGaji"
                    name="gaji"
                    label="Gaji"
                    tag="input"
                    type="tel"
                    onChangeInput={(event) =>
                      handleNominalField({ value: event, setFieldValue, fieldName: 'gaji' })
                    }
                  />
                  <FormField
                    className="mb-2"
                    id="TxtUangMakan"
                    name="uang_makan"
                    label="Uang Makan"
                    tag="input"
                    type="tel"
                    onChangeInput={(event) =>
                      handleNominalField({ value: event, setFieldValue, fieldName: 'uang_makan' })
                    }
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTunjangan"
                    name="tunjangan"
                    label="Tunjangan"
                    tag="input"
                    type="tel"
                    onChangeInput={(event) =>
                      handleNominalField({ value: event, setFieldValue, fieldName: 'tunjangan' })
                    }
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTunjanganKomunikasi"
                    name="tunjangan_komunikasi"
                    label="Tunjangan Komunikasi"
                    tag="input"
                    type="tel"
                    onChangeInput={(event) =>
                      handleNominalField({
                        value: event,
                        setFieldValue,
                        fieldName: 'tunjangan_komunikasi'
                      })
                    }
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTunjanganKhusus"
                    name="tunjangan_khusus"
                    label="Tunjangan Khusus"
                    tag="input"
                    type="tel"
                    onChangeInput={(event) =>
                      handleNominalField({
                        value: event,
                        setFieldValue,
                        fieldName: 'tunjangan_khusus'
                      })
                    }
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTunjanganVariable"
                    name="tunjangan_variable"
                    label="Tunjangan Variable"
                    tag="input"
                    type="tel"
                    onChangeInput={(event) =>
                      handleNominalField({
                        value: event,
                        setFieldValue,
                        fieldName: 'tunjangan_variable'
                      })
                    }
                  />

                  {id && (
                    <>
                      <Row>
                        <Label htmlFor="DocKontrak">Upload Dokumen Kontrak</Label>
                      </Row>
                      <Row>
                        <input
                          ref={inputFile}
                          className="input"
                          type="file"
                          name="upload_doc_kontrak"
                          accept=".pdf"
                          onChange={(event) => {
                            handleSelectedDocContract(event, setFieldValue);
                          }}
                        />
                        <Col md="6">
                          <Button
                            outline
                            size="sm"
                            color="danger"
                            className="mt-1"
                            disabled={!values.upload_doc_kontrak}
                            onClick={() => handleDeleteDocContract(setFieldValue)}
                          >
                            <Trash size={15} /> Delete
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}
                </Col>
              </Row>

              <Button
                color="primary"
                className="m-2 pe-4 ps-4"
                type="submit"
                disabled={!isValid}
                onClick={() => handleSubmit(values)}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" />
                    <span> Loading</span>
                  </>
                ) : (
                  renderTextButton()
                )}
              </Button>
            </MainCard>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormFieldKontrak;
