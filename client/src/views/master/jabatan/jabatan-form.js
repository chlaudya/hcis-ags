/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Row, Spinner } from 'reactstrap';
import { Form, Formik } from 'formik';

import { FormField } from 'src/ui-component/form-field';
import MainCard from 'src/ui-component/cards/MainCard';
import { getStateMasterJabatan } from 'store/stateSelector';
import { jabatanValidationSchema } from './jabatan.validation';
import { INITIAL_VALUES_JABATAN } from './jabatan.const';
import { inputThousandSeparator, setThousandSeparatorNominal } from 'utils/thousandSeparator';

const FormFieldMasterJabatan = ({ id, onSubmit }) => {
  const { masterJabatanList, isSubmitting } = useSelector(getStateMasterJabatan);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_JABATAN);

  const getMasterJabatanById = (id) => {
    const masterJabatan = masterJabatanList?.data.find((data) => data.jabatan_id === id);
    const initialData = {
      jabatan_id: masterJabatan?.jabatan_id,
      jabatan_name: masterJabatan?.jabatan_name,
      jabatan_desc: masterJabatan?.jabatan_desc,
      tunjangan: inputThousandSeparator(masterJabatan?.tunjangan),
      is_active: masterJabatan?.is_active
    };
    setInitialValues(initialData);
  };

  const handleChangeTunjangan = (value, setFieldValue) => {
    setFieldValue('tunjangan', setThousandSeparatorNominal(value));
  };

  useEffect(() => {
    if (id) {
      getMasterJabatanById(id);
    }
  }, [id]);

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={jabatanValidationSchema}
    >
      {({ values, isValid, setFieldValue }) => {
        return (
          <Form>
            <MainCard>
              <Row>
                <FormField
                  className="mb-2"
                  id="TxtJabatanName"
                  name="jabatan_name"
                  label="Jabatan Name"
                  tag="input"
                />
                <FormField
                  className="mb-2"
                  id="TxtJabatanDesc"
                  name="jabatan_desc"
                  label="Jabatan Description"
                  tag="input"
                />
                <FormField
                  className="mb-2"
                  id="DrpTunjangan"
                  name="tunjangan"
                  label="Tunjangan"
                  tag="input"
                  type="tel"
                  onChangeInput={(event) => handleChangeTunjangan(event, setFieldValue)}
                />
              </Row>

              <Button
                color="primary"
                className="m-2 pe-4 ps-4"
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

export default FormFieldMasterJabatan;
