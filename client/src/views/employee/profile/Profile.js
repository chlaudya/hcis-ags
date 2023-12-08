/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { Form, Formik } from 'formik';
import { Print } from '@material-ui/icons';
import printJS from 'print-js';

import { FormField } from 'src/ui-component/form-field';
import MainCard from 'src/ui-component/cards/MainCard';
import TableDetailKaryawan from 'views/human-capital/karyawan/components/TableDetailKaryawan';

import {
  getStateKaryawan,
  getStateMasterBank,
  getStateMasterJabatan,
  getStateMasterTempatTugas,
  getStateMasterUnitBisnis,
  getStateUser
} from 'store/stateSelector';
import { getKaryawanByNip } from 'store/actions/karyawan';
import { getDropdownBank } from 'store/actions/master-bank';
import { getDropdownJabatan } from 'store/actions/master-jabatan';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import { getDropdownTempatTugas } from 'store/actions/master-tempat-tugas';

import csrfProtection from 'utils/csrfProtection';
import { renderDropdownLabel } from 'utils/renderDropdownLabel';
import {
  BLOOD_TYPE,
  EDUCATION,
  GENDER,
  IS_ACTIVE,
  MARITAL_STATUS,
  RELIGION
} from 'constants/general.constant';
import { INITIAL_VALUES_KARYAWAN } from 'views/human-capital/karyawan/karyawan.const';
import { CircularProgress } from '@material-ui/core';
import { replaceNullWithEmptyString } from 'utils/replaceNullWithEmptyString';

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector(getStateUser);
  const { karyawanByNip, loadingByNip } = useSelector(getStateKaryawan);
  const { dropdownBank } = useSelector(getStateMasterBank);
  const { dropdownJabatan } = useSelector(getStateMasterJabatan);
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const { dropdownTempatTugas } = useSelector(getStateMasterTempatTugas);

  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_KARYAWAN);
  const username = user?.preferred_username;

  const renderDefaultValue = (value) => {
    return value ? value : '-';
  };

  const renderTempatTugas = () => {
    return renderDropdownLabel({
      list: dropdownTempatTugas,
      selectedValue: renderDefaultValue(karyawanByNip?.tempat_tugas_id)
    });
  };

  const renderUnitBisnis = () => {
    return renderDropdownLabel({
      list: dropdownUnitBisnis,
      selectedValue: renderDefaultValue(karyawanByNip?.unit_id)
    });
  };

  const renderJabatan = () => {
    return renderDropdownLabel({
      list: dropdownJabatan,
      selectedValue: renderDefaultValue(karyawanByNip?.jabatan_id)
    });
  };

  const renderBank = () => {
    return renderDropdownLabel({
      list: dropdownBank,
      selectedValue: renderDefaultValue(karyawanByNip?.bank_id)
    });
  };

  const getPrintData = () => {
    const printData = {
      no: 1,
      karyawan_nip: karyawanByNip?.karyawan_nip,
      karyawan_name: karyawanByNip?.karyawan_name,
      tempat_tugas: renderTempatTugas(),
      unit_bisnis: renderUnitBisnis(),
      jabatan: renderJabatan(),
      is_active: karyawanByNip?.is_active ? 'Aktif' : 'Tidak Aktif'
    };

    return JSON.stringify(printData);
  };

  const printPdf = () => {
    printJS({
      printable: 'TableDetailKaryawan', //refer to TableDetailKaryawan
      type: 'html',
      scanStyles: false,
      targetStyles: "['*']",
      style:
        'table{margin-top:50px; width:100%;} th{ border: 1px solid #d9d9d9 !important;} td{ border: 1px solid #d9d9d9 !important;}',
      header:
        '<img style="width:80px; position:absolute; top:0; left:0; margin-right:120px;" src="https://lh5.googleusercontent.com/p/AF1QipMOa6vMFl7q-HIuHUxJ777KbL1PVr4kTt8lHHZX=w600-h321-p-k-no"></img>'
    });
  };

  useEffect(() => {
    if (karyawanByNip) getPrintData();
  }, [karyawanByNip]);

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getDropdownBank());
    dispatch(getDropdownJabatan());
    dispatch(getDropdownUnitBisnis());
    dispatch(getDropdownTempatTugas());
  }, []);

  useEffect(() => {
    if (username) {
      dispatch(getKaryawanByNip(username));
      setInitialValues(replaceNullWithEmptyString(karyawanByNip));
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      setInitialValues(replaceNullWithEmptyString(karyawanByNip));
    }
  }, [karyawanByNip]);

  if (loadingByNip)
    return (
      <MainCard title="My Profile">
        <CircularProgress />;
      </MainCard>
    );

  return (
    <Formik validateOnMount={true} enableReinitialize={true} initialValues={initialValues}>
      {() => {
        return (
          <Form>
            <MainCard title="My Profile">
              <Row>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtNip"
                    name="karyawan_nip"
                    label="NIP"
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
                    id="TxtTempat"
                    name="tempat_tinggal"
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
                    id="TxtAgama"
                    name="agama"
                    label="Agama"
                    tag="select"
                    options={RELIGION}
                    isDisabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtJenisKelamin"
                    name="gender"
                    label="Jenis Kelamin"
                    tag="select"
                    options={GENDER}
                    isDisabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtGolonganDarah"
                    name="golongan_darah"
                    label="Golongan Darah"
                    tag="select"
                    options={BLOOD_TYPE}
                    isDisabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtStatus"
                    name="status_nikah"
                    label="Status"
                    tag="select"
                    options={MARITAL_STATUS}
                    isDisabled
                  />

                  <FormField
                    className="mb-2"
                    id="TxtNamaAyah"
                    name="nama_ayah_kandung"
                    label="Nama Ayah Kandung"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNamaIbu"
                    name="nama_ibu_kandung"
                    label="Nama Ibu Kandung"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtKeluargaDihubungi"
                    name="keluarga_yang_dihubungi"
                    label="Keluarga Yang Bisa Dihubungi"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNamaKeluargaDihubungi"
                    name="nama_keluarga_yang_dihubungi"
                    label="Nama Keluarga Yang Bisa Dihubungi"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNoHpKeluarga"
                    name="no_hp_keluarga"
                    label="No. Handphone Keluarga"
                    tag="input"
                    type="tel"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtAlamat"
                    name="alamat_rumah"
                    label="Alamat Rumah"
                    tag="input"
                    type="textarea"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtAlamatDomisili"
                    name="alamat_domisili"
                    label="Alamat Domisili"
                    tag="input"
                    type="textarea"
                    disabled
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
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtHp"
                    name="no_handphone"
                    label="No.Handphone"
                    tag="input"
                    type="tel"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNik"
                    name="nonik"
                    label="No. KTP"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNoKK"
                    name="nokk"
                    label="No. KK"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNpwp"
                    name="nonpwp"
                    label="No. NPWP"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtBpjsTenaga"
                    name="no_bpjs_tenaga_kerja"
                    label="No. Ketenagakerjaan"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtBpjsKes"
                    name="no_bpjs_kesehatan"
                    label="No. Kesehatan"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtBank"
                    name="bank_id"
                    label="Bank"
                    tag="select"
                    options={dropdownBank}
                    isDisabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtRekg"
                    name="no_rekening"
                    label="No. Rekening"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtRekgAtasNama"
                    name="rekening_atas_nama"
                    label="Rekening Atas Nama"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtRiwayatPekerjaan"
                    name="riwayat_pekerjaan"
                    label="Riwayat Pekerjaan"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2 mt-3"
                    id="TxtPendidikan"
                    name="pendidikan_terakhir"
                    label="Pendidikan"
                    tag="select"
                    options={EDUCATION}
                    isDisabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtJurusan"
                    name="jurusan"
                    label="Jurusan"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtAsalSekolah"
                    name="asal_sekolah"
                    label="Asal Sekolah"
                    tag="input"
                    disabled
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
              </Row>
              <Button
                outline
                color="primary"
                aria-label="add an alarm"
                onClick={printPdf}
                style={{ width: '100px' }}
              >
                <Print /> Print
              </Button>

              {/* This table used for Print data karyawan */}
              <TableDetailKaryawan
                data={karyawanByNip}
                renderJabatan={renderJabatan}
                renderTempatTugas={renderJabatan}
                renderUnitBisnis={renderUnitBisnis}
                renderBank={renderBank}
              />
            </MainCard>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Profile;
