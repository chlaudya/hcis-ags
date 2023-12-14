/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Spinner } from 'reactstrap';
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
import { getDropdownBank } from 'store/actions/master-bank';
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
        tempat_tinggal: data?.tempat_tinggal,
        tanggal_lahir: data?.tanggal_lahir
      });
    }
    if (id && !extendContract) {
      setInitialValues({
        ...data,
        gaji: inputThousandSeparator(data?.gaji || 0),
        uang_makan: inputThousandSeparator(data?.uang_makan || 0)
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
        tempat_tinggal: data?.tempat_tinggal,
        tanggal_lahir: data?.tanggal_lahir
      }));
    } else {
      setInitialValues((prevState) => ({
        ...prevState,
        karyawan_nip: '',
        karyawan_name: '',
        nonik: '',
        tempat_tinggal: '',
        tanggal_lahir: ''
      }));
    }
  }, [karyawanByNip]);

  const redirectToKontrak = () => {
    navigate('/human-capital/kontrak');
  };

  const handleChangeNip = (value) => {
    dispatch(getKaryawanByNip(value));
    setSearchNip(true);
  };

  const handleChangeGaji = (value, setFieldValue) => {
    setFieldValue('gaji', setThousandSeparatorNominal(value));
  };

  const handleChangeUangMakan = (value, setFieldValue) => {
    setFieldValue('uang_makan', setThousandSeparatorNominal(value));
  };

  const handleSubmit = (values) => {
    const formattedGaji = Number(removeThousandSeparator(values.gaji));
    const formattedUangMakan = Number(removeThousandSeparator(values.uang_makan));

    const reqBodyEdit = {
      ...values,
      kontrak_id: id,
      usr_update: user.preferred_username,
      gaji: formattedGaji,
      uang_makan: formattedUangMakan
    };

    if (id && !extendContract) {
      dispatch(updateKontrak({ reqBody: reqBodyEdit, redirect: redirectToKontrak }));
    } else {
      dispatch(
        addKontrak(
          {
            ...values,
            gaji: formattedGaji,
            uang_makan: formattedUangMakan
          },
          redirectToKontrak
        )
      );
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
            <MainCard title="Kontrak" iconAction={ArrowBackIcon} onClickIcon={redirectToKontrak}>
              <Row>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtNip"
                    name="karyawan_nip"
                    label="NIP"
                    tag="input"
                    onChangeInput={handleChangeNip}
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
                    onChangeInput={(event) => handleChangeGaji(event, setFieldValue)}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTipeTunjangan"
                    name="tipe_tunjangan"
                    label="Tunjangan"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtUangMakan"
                    name="uang_makan"
                    label="Uang Makan"
                    tag="input"
                    type="tel"
                    onChangeInput={(event) => handleChangeUangMakan(event, setFieldValue)}
                  />
                </Col>
                <Col>
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
                    id="TxtTempat"
                    name="tempat_tinggal"
                    label="Tempat"
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
