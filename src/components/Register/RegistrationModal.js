import './RegistrationModal.css';

const RegistrationModal = ({ result }) => {
  return (
    <div className="registration-modal-wrapper">
      <h1 className="registration-modal-header">
        {result
          ? 'Registration Successful! Please check your email to find instructions to activate your account.'
          : 'Something Went Wrong! Please try again.'}
      </h1>
      {result ? (
        <div class="success-animation">
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
      ) : (
        <div class="icon error">
          <span class="x-mark">
            <span class="errorLine left"></span>
            <span class="errorLine right"></span>
          </span>
        </div>
      )}
    </div>
  );
};

export default RegistrationModal;
