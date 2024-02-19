import './SelectInput.css';

const SelectInput = (props) => {
  return (
    <div className="select-input">
      <select
        value={props.default}
        onChange={(e) => props.onChangeHandler(e.target.value)}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {props.hasError && (
        <span className="form-error-message">{props.errorMessage}</span>
      )}
    </div>
  );
};

export default SelectInput;
