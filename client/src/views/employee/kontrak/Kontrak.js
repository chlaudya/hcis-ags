/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';

import { Download } from 'react-feather';
import MainCard from 'src/ui-component/cards/MainCard';
import { FormField } from 'src/ui-component/form-field';
import { getKontrakByNip } from 'store/actions/kontrak';
import { getDropdownJabatan } from 'store/actions/master-jabatan';
import { getDropdownTempatTugas } from 'store/actions/master-tempat-tugas';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import {
  getStateKontrak,
  getStateMasterJabatan,
  getStateMasterTempatTugas,
  getStateMasterUnitBisnis,
  getStateUser
} from 'store/stateSelector';
import csrfProtection from 'utils/csrfProtection';
import { inputThousandSeparator } from 'utils/thousandSeparator';
import { INITIAL_VALUES_KONTRAK } from 'views/human-capital/kontrak/kontrak.const';
import { CircularProgress } from '@material-ui/core';
import { replaceNullWithEmptyString } from 'utils/replaceNullWithEmptyString';

const FormFieldKontrak = () => {
  const dispatch = useDispatch();
  const { kontrakDetail, loadingDetail } = useSelector(getStateKontrak);
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const { dropdownTempatTugas } = useSelector(getStateMasterTempatTugas);
  const { dropdownJabatan } = useSelector(getStateMasterJabatan);
  const { user } = useSelector(getStateUser);

  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_KONTRAK);
  const username = user?.preferred_username;

  const openPdf = () => {
    window.open(
      `${process.env.REACT_APP_API_GENERATE}/api/generate/pkwt?kontrak_id=${initialValues?.kontrak_id}`
    );
  };

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getDropdownUnitBisnis());
    dispatch(getDropdownTempatTugas());
    dispatch(getDropdownJabatan());
  }, []);

  useEffect(() => {
    if (username) {
      dispatch(getKontrakByNip(username));
    }
  }, [username]);

  useEffect(() => {
    if (kontrakDetail?.data?.length > 0) {
      const data = replaceNullWithEmptyString(kontrakDetail.data[0]);
      setInitialValues({
        ...data,
        gaji: inputThousandSeparator(data?.gaji || 0),
        uang_makan: inputThousandSeparator(data?.uang_makan || 0)
      });
    }
  }, [kontrakDetail]);

  if (loadingDetail)
    return (
      <MainCard title="My Kontrak">
        <CircularProgress />;
      </MainCard>
    );

  return (
    <Formik validateOnMount={true} enableReinitialize={true} initialValues={initialValues}>
      {() => {
        return (
          <Form>
            <MainCard title="My Kontrak">
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
                    isDisabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTempatTugas"
                    name="tempat_tugas_id"
                    label="Tempat Tugas"
                    tag="select"
                    options={dropdownTempatTugas}
                    isDisabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtJabatan"
                    name="jabatan_id"
                    label="Jabatan"
                    tag="select"
                    options={dropdownJabatan}
                    isDisabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtGaji"
                    name="gaji"
                    label="Gaji"
                    tag="input"
                    type="tel"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTipeTunjangan"
                    name="tipe_tunjangan"
                    label="Tunjangan"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtUangMakan"
                    name="uang_makan"
                    label="Uang Makan"
                    tag="input"
                    type="tel"
                    disabled
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
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNpwp"
                    name="tgl_habis_kontrak"
                    label="Tanggal Habis Kontrak"
                    tag="input"
                    type="date"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtKontrakKode"
                    name="kontrak_kode"
                    label="No. Kontrak"
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtRequestNo"
                    name="request_no"
                    label="Request No."
                    tag="input"
                    disabled
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTglRequest"
                    name="request_date"
                    label="Tanggal Request"
                    tag="input"
                    type="date"
                    disabled
                  />
                </Col>
              </Row>

              <Button color="primary" aria-label="add an alarm" onClick={openPdf}>
                <Download /> Download
              </Button>
            </MainCard>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormFieldKontrak;
