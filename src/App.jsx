import { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import useTheme from "./hooks/useTheme";
import { useDispatch } from "react-redux";
import { hydrateAuth } from "./redux/slices/userSlice";

const App = () => {
  useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(hydrateAuth());
  }, [dispatch]);
  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
