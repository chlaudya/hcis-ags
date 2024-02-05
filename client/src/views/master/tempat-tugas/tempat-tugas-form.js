/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Row, Spinner } from 'reactstrap';
import { Form, Formik } from 'formik';

import { FormField } from 'src/ui-component/form-field';
import MainCard from 'src/ui-component/cards/MainCard';
import { getStateMasterTempatTugas } from 'store/stateSelector';
import { tempatTugasValidationSchema } from './tempat-tugas.validation';
import { INITIAL_VALUES_TEMPAT_TUGAS } from './tempat-tugas.const';

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
      unit_id: masterTempatTugas?.unit_id,
      is_active: masterTempatTugas?.is_active
    };
    setInitialValues(initialData);
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
      {({ values, isValid }) => {
        return (
          <Form>
            <MainCard>
              <Row>
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
                <FormField
                  className="mb-2"
                  id="TxtNamaProyek"
                  name="nama_proyek"
                  label="Nama Proyek"
                  tag="input"
                />
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
