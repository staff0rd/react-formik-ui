import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { connect, getIn } from 'formik'

import Label from '../Label'
import InfoMsg from '../InfoMsg'
import './styles.scss'

export const Radio = ({
  formik,
  className,
  disabled,
  hint,
  label,
  name,
  options,
  required,
  ...rest
}) => {
  const {
    touched, errors, values, handleChange, handleBlur,
  } = formik
  const error = getIn(errors, name)
  const touch = getIn(touched, name)
  const errorMsg = touch && error ? error : null

  return (
    <div className={cx('form-element radio-wrapper', className, { hasError: !!errorMsg, isDisabled: disabled })}>
      <Label
        name={name}
        disabled={disabled}
        text={label}
        required={required}
        className="radio-label"
      >
        {
          options.map(option => (
            <div key={option.label} className="radio-option">
              <input
                type="radio"
                checked={getIn(values, name) === option.value}
                id={`${name}-id-${option.value}`}
                value={option.value}
                onChange={handleChange}
                onBlur={handleBlur}
                name={name}
                disabled={disabled}
                {...rest}
              />
              <label
                htmlFor={`${name}-id-${option.value}`}
              >
                {option.label}
              </label>
            </div>
          ))
        }
      </Label>
      {
        !!errorMsg && (<InfoMsg errorMsg={errorMsg} />)
      }
      {
        hint && (<InfoMsg hintMsg={hint} />)
      }
    </div>
  )
}

Radio.propTypes = {
  formik: PropTypes.object.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hint: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  })).isRequired,
  required: PropTypes.bool,
}

Radio.defaultProps = {
  className: null,
  disabled: false,
  hint: null,
  label: null,
  required: false,
}

export default connect(Radio)
