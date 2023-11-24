import RegisterForm from '../components/Register/RegisterForm';
import RegisterHeader from '../components/Register/RegisterHeader';
import './Register.css';

const Register = () => {
  return (
    <div className="register-page" style={{ margin: 'auto' }}>
      <h1>LOGO</h1>
      <RegisterHeader />
      <RegisterForm />
    </div>
  );
};

export default Register;
