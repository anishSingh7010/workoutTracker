import AccountNavigation from '../components/Account/AccountNavigation';
import { Outlet } from 'react-router-dom';
import './Account.css';

const Account = () => {
  const [exercises, setExercises] = useState([]);
  const { isLoading, showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // loading start
        showLoading();
        const response = await axiosPrivate.get(EXERCISE_ENDPOINT);
        setExercises(response.data.exercises);
      } catch (error) {
        console.log(error);
      } finally {
        //loading end
        hideLoading();
      }
    };
    fetchData();
  }, []);

  return (
    <div className="account-page">
      <AccountNavigation />
      <div className="wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
