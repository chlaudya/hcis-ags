import React from 'react';
import ReactSelect from 'react-select';
import { Label } from 'reactstrap';

const optionsReason = [
  { label: 'Resign', value: 'Resign' },
  { label: 'PHK', value: 'PHK' },
  { label: 'Habis Kontrak', value: 'Habis Kontrak' }
];

const FormReason = ({ onChange }) => {
  return (
    <div className="mb-4">
      <Label>Alasan Pemberhentian:</Label>
      <ReactSelect options={optionsReason} onChange={onChange} />
    </div>
  );
};

export default FormReason;
