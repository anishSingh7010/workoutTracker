import { createPortal } from 'react-dom';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      {createPortal(
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass="loading-wrapper"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />,
        document.getElementById('loader')
      )}
    </>
  );
};

export default Loader;
