import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useFlashAlert = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(location.state?.alert || null);

  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
      // clear it so a refresh doesn't show it again
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);

  return [alert, setAlert];
};

export default useFlashAlert;
