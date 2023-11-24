import { useState } from 'react';

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);

  const hideLoading = () => setIsLoading(false);

  return {
    showLoading,
    hideLoading,
    isLoading,
  };
};

export default useLoading;
