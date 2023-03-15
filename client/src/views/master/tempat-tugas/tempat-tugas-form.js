/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Spinner } from 'reactstrap';
import { Form, Formik } from 'formik';

import { FormField } from 'src/ui-component/form-field';
import MainCard from 'src/ui-component/cards/MainCard';
import {
  getStateMasterJabatan,
  getStateMasterTempatTugas,
  getStateMasterUnitBisnis
} from 'store/stateSelector';
import { tempatTugasValidationSchema } from './tempat-tugas.validation';
import { INITIAL_VALUES_TEMPAT_TUGAS } from './tempat-tugas.const';
import { inputThousandSeparator, setThousandSeparatorNominal } from 'utils/thousandSeparator';

const FormFieldTempatTugas = ({ id, onSubmit, dropdownJabatan, dropdownUnitBisnis }) => {
  const { masterTempatTugasList, isSubmitting } = useSelector(getStateMasterTempatTugas);

  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_TEMPAT_TUGAS);

  const getMasterTempatTugasById = (id) => {
    const masterTempatTugas = masterTempatTugasList?.data.find(
      (data) => data.tempat_tugas_id === id
    );
    const initialData = {
      tempat_tugas_id: masterTempatTugas?.tempat_tugas_id,
      jabatan_id: masterTempatTugas?.jabatan_id,
      lokasi_tempat_tugas: masterTempatTugas?.lokasi_tempat_tugas,
      nama_proyek: masterTempatTugas?.nama_proyek,
      nominal_tunjangan: inputThousandSeparator(masterTempatTugas?.nominal_tunjangan),
      tunjangan_tetap: inputThousandSeparator(masterTempatTugas?.tunjangan_tetap),
      unit_id: masterTempatTugas?.unit_id,
      is_active: masterTempatTugas?.is_active
    };
    setInitialValues(initialData);
  };

  const handleChangeNominalTunjangan = (value, setFieldValue) => {
    setFieldValue('nominal_tunjangan', setThousandSeparatorNominal(value));
  };

  const handleChangeTunjanganTetap = (value, setFieldValue) => {
    setFieldValue('tunjangan_tetap', setThousandSeparatorNominal(value));
  };

  useEffect(() => {
    if (id) {
      getMasterTempatTugasById(id);
    }
  }, [id]);

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={tempatTugasValidationSchema}
    >
      {({ values, isValid, setFieldValue }) => {
        return (
          <Form>
            <MainCard>
              <Row>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtJabatanId"
                    name="jabatan_id"
                    label="Jabatan Id"
                    tag="select"
                    options={dropdownJabatan}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtUnitId"
                    name="unit_id"
                    label="Unit Id"
                    tag="select"
                    options={dropdownUnitBisnis}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtLokasiTempatTugas"
                    name="lokasi_tempat_tugas"
                    label="Lokasi Tempat Tugas"
                    tag="input"
                  />
                </Col>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtNamaProyek"
                    name="nama_proyek"
                    label="Nama Proyek"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNominalTunjangan"
                    name="nominal_tunjangan"
                    label="Nominal Tunjangan"
                    tag="input"
                    type="tel"
                    onChangeInput={(event) => handleChangeNominalTunjangan(event, setFieldValue)}
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTunjanganTetap"
                    name="tunjangan_tetap"
                    label="Tunjangan Tetap"
                    tag="input"
                    type="tel"
                    onChangeInput={(event) => handleChangeTunjanganTetap(event, setFieldValue)}
                  />
                </Col>
              </Row>

              <Button
                color="primary"
                className="pe-4 ps-4"
                type="submit"
                disabled={!isValid}
                onClick={() => onSubmit({ values, id })}
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

export default FormFieldTempatTugas;
