import SigninHeader from '../components/Signin/SigninHeader.js';
import SigninForm from '../components/Signin/SigninForm.js';
import './Signin.css';

const Signin = () => {
  return (
    <div className="signin-page" style={{ margin: 'auto' }}>
      <h1>LOGO</h1>
      <SigninHeader />
      <SigninForm />
    </div>
  );
};

export default Signin;
