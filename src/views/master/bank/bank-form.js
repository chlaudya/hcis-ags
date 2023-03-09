/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Spinner } from 'reactstrap';
import { Form, Formik } from 'formik';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { FormField } from 'ui-component/form-field';
import MainCard from 'ui-component/cards/MainCard';
import { getStateMasterJabatan } from 'store/stateSelector';
import { bankValidationSchema } from './bank.validation';
import { IS_ACTIVE } from 'constants/general.constant';
import { INITIAL_VALUES_BANK } from './bank.const';
import { getMasterJabatanDetail, updateMasterJabatan } from 'store/actions/master-jabatan';

const FormFieldPajak = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { masterJabatanDetail, isSubmitting } = useSelector(getStateMasterJabatan);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_BANK);

  useEffect(() => {
    if (state) {
      dispatch(getMasterJabatanDetail({ ...state }));
    }
  }, [state]);

  useEffect(() => {
    setInitialValues(masterJabatanDetail);
  }, [masterJabatanDetail]);

  const redirectToMasterUnitBisnis = () => {
    navigate('/human-capital/master-unit-bisnis');
  };

  const handleSubmit = (values) => {
    if (state) {
      dispatch(
        updateMasterJabatan({ ...values, karyawanId: state.karyawanId }, redirectToMasterUnitBisnis)
      );
    } else {
      dispatch(updateMasterJabatan({ ...values }, redirectToMasterUnitBisnis));
    }
  };

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
            <MainCard
              title={state ? 'Edit Pajak' : 'Input Pajak'}
              iconAction={ArrowBackIcon}
              onClickIcon={redirectToMasterUnitBisnis}
            >
              <Row>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtTipePajak"
                    name="tipePajak"
                    label="Tipe Pajak"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtStatus"
                    name="status"
                    label="Status"
                    tag="input"
                  />
                </Col>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtPersentase"
                    name="persentase"
                    label="Persentase"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="DrpIsActive"
                    name="isActive"
                    label="Is Active"
                    tag="select"
                    options={IS_ACTIVE}
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