/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Row, Spinner } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { FormField } from 'src/ui-component/form-field';
import MainCard from 'src/ui-component/cards/MainCard';
import { getStateMasterBank } from 'store/stateSelector';
import { bankValidationSchema } from './bank.validation';
import { INITIAL_VALUES_BANK } from './bank.const';

const FormFieldBank = ({ id, onSubmit }) => {
  const { masterBankList, isSubmitting } = useSelector(getStateMasterBank);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_BANK);

  const getMasterBankById = (id) => {
    const masterBank = masterBankList?.data.find((data) => data.bank_id === id);
    const initialData = {
      bank_id: masterBank?.bank_id,
      bank_name: masterBank?.bank_name,
      bank_desc: masterBank?.bank_desc,
      is_active: masterBank?.is_active
    };
    setInitialValues(initialData);
  };

  useEffect(() => {
    if (id) {
      getMasterBankById(id);
    }
  }, [id]);

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={bankValidationSchema}
    >
      {({ values, isValid }) => {
        return (
          <Form>
            <MainCard>
              <Row>
                <FormField
                  className="mb-2"
                  id="TxtBankName"
                  name="bank_name"
                  label="Bank Name"
                  tag="input"
                />
                <FormField
                  className="mb-2"
                  id="TxtBankDesc"
                  name="bank_desc"
                  label="Bank Description"
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

export default FormFieldBank;
