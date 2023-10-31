import './Input.css';
import React from 'react';

const Input = React.forwardRef((props, ref) => {
  // spread props.input object to make key value pairs
  return (
    <div className="input">
      <input
        id={props.identifier}
        placeholder={props.placeholder}
        ref={ref}
        {...props.input}
        value={props.value}
        onChange={props.onChangeHandler}
        onBlur={props.onBlurHandler}
        className={props.hasError ? 'field-error' : ''}
      />
      {props.hasError && (
        <span className="form-error-message text-red-500	font-bold">
          {props.errorMessage}
        </span>
      )}
    </div>
  );
});

export default Input;
