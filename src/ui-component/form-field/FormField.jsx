import React from 'react';
import classNames from 'classnames';
import ReactSelect from 'react-select';
import { useField, useFormikContext } from 'formik';
import { FormGroup, Input, Label } from 'reactstrap';
import FormControl from './FormControl';

const FormField = ({
    tag = 'input',
    label,
    helper,
    className,
    children,
    name,
    value,
    options,
    onChangeInput,
    onChangeSelect,
    ...restProps
}) => {
    const [field, meta] = useField(name);
    const { setFieldValue, values, handleBlur } = useFormikContext();

    const isFieldError = meta.error;
    const isFieldTouched = meta.touched;
    const isFieldDirty = isFieldError && isFieldTouched;

    const handleChangeSelect = (event) => {
        setFieldValue(name, event.value);
        if (onChangeSelect) {
            onChangeSelect(event.value);
        }
    };

    const handleChangeInput = (event) => {
        setFieldValue(name, event.target.value);
        if (onChangeInput) {
            onChangeInput(event.target.value);
        }
    };

    const getDefaultValueTag = () => {
        if (tag === 'input') {
            return values[name];
        } else if (tag === 'select') {
            return options?.filter((option) => option.value === values[name]);
        }
        // Add more control elements here appropriately.
    };

    const getOnChangeTag = () => {
        if (tag === 'select') {
            return handleChangeSelect;
        } else if (tag === 'input') {
            return handleChangeInput;
        }
        // Add more control elements here appropriately.
    };

    const getFieldControlTag = () => {
        if (tag === 'input') {
            return Input;
        } else if (tag === 'select') {
            return ReactSelect;
        }
        // Add more control elements here appropriately.
    };

    const renderFieldHelper = ({ ...props }) => {
        const hasHelperText = !!helper;
        if (isFieldDirty) {
            return <div className="font-small-1 pl-0 text-danger">{isFieldError}</div>;
        } else if (!isFieldDirty && hasHelperText) {
            return helper({ props });
        }
    };

    const cssClasses = {
        label: classNames('text-bold-600', {
            'text-danger': isFieldDirty
        })
    };

    return (
        <FormGroup className={className}>
            <Label htmlFor={restProps.id || restProps.inputId} className={cssClasses.label}>
                {label}
            </Label>
            <FormControl
                tag={getFieldControlTag()}
                {...field}
                {...restProps}
                value={getDefaultValueTag()}
                isFieldDirty={isFieldDirty}
                onChange={getOnChangeTag()}
                onBlur={handleBlur(name)}
                options={options}
            >
                {children}
            </FormControl>
            {renderFieldHelper({ restProps })}
        </FormGroup>
    );
};

export default FormField;
