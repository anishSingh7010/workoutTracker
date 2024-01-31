import useAxiosPrivate from '../../hooks/use-axios-private';

const AccountLanding = () => {
  const WORKOUTS_ENDPOINT = '/workouts';
  const axiosPrivate = useAxiosPrivate();
  const sendRequest = async () => {
    try {
      const response = await axiosPrivate.get(WORKOUTS_ENDPOINT);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      HIIIIIIIIIIIIIIIII
      <button onClick={sendRequest}></button>
    </div>
  );
};
export default AccountLanding;
