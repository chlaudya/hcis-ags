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
import { tempatTugasValidationSchema } from './tempat-tugas.validation';
import { IS_ACTIVE } from 'constants/general.constant';
import { INITIAL_VALUES_TEMPAT_TUGAS } from './tempat-tugas.const';
import { getMasterJabatanDetail, updateMasterJabatan } from 'store/actions/master-jabatan';

const FormFieldTempatTugas = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { masterJabatanDetail, isSubmitting } = useSelector(getStateMasterJabatan);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_TEMPAT_TUGAS);

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
      validationSchema={tempatTugasValidationSchema}
    >
      {({ values, isValid }) => {
        return (
          <Form>
            <MainCard
              title={state ? 'Edit Unit Bisnis' : 'Input Unit Bisnis'}
              iconAction={ArrowBackIcon}
              onClickIcon={redirectToMasterUnitBisnis}
            >
              <Row>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtTempatTugasId"
                    name="tempatTugasId"
                    label="Tempat Tugas ID"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtUnitId"
                    name="unitId"
                    label="Unit ID"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtJabatanId"
                    name="jabatanId"
                    label="Jabatan ID"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNamaProyek"
                    name="namaProyek"
                    label="Nama Proyek"
                    tag="input"
                  />
                </Col>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtLokasiTempatTugas"
                    name="lokasiTempatTugas"
                    label="Lokasi Tempat Tugas"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtNominalTunjangan"
                    name="nominalTunjangan"
                    label="Nominal Tunjangan"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtTunjanganTetap"
                    name="tunjanganTetap"
                    label="Tunjangan Tetap"
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

export default FormFieldTempatTugas;
