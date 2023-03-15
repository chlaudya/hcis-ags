/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Row, Spinner } from 'reactstrap';
import { Form, Formik } from 'formik';

import { FormField } from 'src/ui-component/form-field';
import MainCard from 'src/ui-component/cards/MainCard';
import { getStateMasterIuran } from 'store/stateSelector';
import { iuranValidationSchema } from './iuran.validation';
import { INITIAL_VALUES_IURAN } from './iuran.const';
import { inputThousandSeparator, setThousandSeparatorNominal } from 'utils/thousandSeparator';

const FormFieldIuran = ({ id, onSubmit }) => {
  const { masterIuranList, isSubmitting } = useSelector(getStateMasterIuran);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_IURAN);

  const getMasterIuranById = (id) => {
    const masterIuran = masterIuranList?.data.find((data) => data.iuran_id === id);
    const initialData = {
      iuran_id: masterIuran?.iuran_id,
      iuran_beban: inputThousandSeparator(masterIuran?.iuran_beban),
      iuran_persen: masterIuran?.iuran_persen,
      iuran_type: masterIuran?.iuran_type,
      is_active: masterIuran?.is_active
    };
    setInitialValues(initialData);
  };

  const handleChangeIuranBeban = (value, setFieldValue) => {
    setFieldValue('iuran_beban', setThousandSeparatorNominal(value));
  };

  useEffect(() => {
    if (id) {
      getMasterIuranById(id);
    }
  }, [id]);

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={iuranValidationSchema}
    >
      {({ values, isValid, setFieldValue }) => {
        return (
          <Form>
            <MainCard>
              <Row>
                <FormField
                  className="mb-2"
                  id="TxtIuranTipe"
                  name="iuran_type"
                  label="Tipe Iuran"
                  tag="input"
                />
                <FormField
                  className="mb-2"
                  id="TxtBeban"
                  name="iuran_beban"
                  label="Beban"
                  tag="input"
                  type="tel"
                  onChangeInput={(event) => handleChangeIuranBeban(event, setFieldValue)}
                />
                <FormField
                  className="mb-2"
                  id="TxtPersentase"
                  name="iuran_persen"
                  label="Persentase"
                  tag="input"
                  type="number"
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

export default FormFieldIuran;
