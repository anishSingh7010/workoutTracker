import './Button.css';

const Button = ({
  buttonText,
  isDisabled,
  classes = [],
  onClick = () => {},
}) => {
  return (
    <button
      className={'btn ' + classes.join(' ')}
      disabled={isDisabled ? 'disabled' : ''}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
