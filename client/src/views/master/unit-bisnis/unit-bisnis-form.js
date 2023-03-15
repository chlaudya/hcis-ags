/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Row, Spinner } from 'reactstrap';
import { Form, Formik } from 'formik';

import { FormField } from 'src/ui-component/form-field';
import MainCard from 'src/ui-component/cards/MainCard';
import { getStateMasterUnitBisnis } from 'store/stateSelector';
import { unitValidationSchema } from './unit-bisnis.validation';
import { INITIAL_VALUES_UNIT_BISNIS } from './unit-bisnis.const';

const FormFieldUnitBisnis = ({ id, onSubmit }) => {
  const { masterUnitBisnisList, isSubmitting } = useSelector(getStateMasterUnitBisnis);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_UNIT_BISNIS);

  const getMasterUnitBisnisById = (id) => {
    const masterUnitBisnis = masterUnitBisnisList?.data.find((data) => data.unit_id === id);
    const initialData = {
      unit_id: masterUnitBisnis?.unit_id,
      unit_name: masterUnitBisnis?.unit_name,
      unit_description: masterUnitBisnis?.unit_description,
      is_active: masterUnitBisnis?.is_active
    };
    setInitialValues(initialData);
  };

  useEffect(() => {
    if (id) {
      getMasterUnitBisnisById(id);
    }
  }, [id]);

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={unitValidationSchema}
    >
      {({ values, isValid }) => {
        return (
          <Form>
            <MainCard>
              <Row>
                <FormField
                  className="mb-2"
                  id="TxtUnitName"
                  name="unit_name"
                  label="Unit Name"
                  tag="input"
                />
                <FormField
                  className="mb-2"
                  id="TxtUnitDesc"
                  name="unit_description"
                  label="Unit Description"
                  tag="input"
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

export default FormFieldUnitBisnis;
