/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Row, Spinner } from 'reactstrap';
import { Form, Formik } from 'formik';

import { FormField } from 'src/ui-component/form-field';
import MainCard from 'src/ui-component/cards/MainCard';
import { getStateMasterPajak } from 'store/stateSelector';
import { pajakValidationSchema } from './pajak.validation';
import { INITIAL_VALUES_PAJAK } from './pajak.const';

const FormFieldPajak = ({ id, onSubmit }) => {
  const { masterPajakList, isSubmitting } = useSelector(getStateMasterPajak);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_PAJAK);

  const getMasterPajakById = (id) => {
    const masterPajak = masterPajakList?.data.find((data) => data.pajak_id === id);
    const initialData = {
      pajak_id: masterPajak?.pajak_id,
      pajak_persen: masterPajak?.pajak_persen,
      pajak_status: masterPajak?.pajak_status,
      pajak_type: masterPajak?.pajak_type,
      is_active: masterPajak?.is_active
    };
    setInitialValues(initialData);
  };

  useEffect(() => {
    if (id) {
      getMasterPajakById(id);
    }
  }, [id]);

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={pajakValidationSchema}
    >
      {({ values, isValid }) => {
        return (
          <Form>
            <MainCard>
              <Row>
                <FormField
                  className="mb-2"
                  id="TxtTipePajak"
                  name="pajak_type"
                  label="Tipe Pajak"
                  tag="input"
                />
                <FormField
                  className="mb-2"
                  id="TxtStatus"
                  name="pajak_status"
                  label="Status"
                  tag="input"
                />
                <FormField
                  className="mb-2"
                  id="TxtPersentase"
                  name="pajak_persen"
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

export default FormFieldPajak;
