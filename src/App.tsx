import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import { setUser } from "./redux/feature/user/authSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
  // For user Persistency.
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state);

  useEffect(() => {
    if (auth.token && auth.user.email) {
      dispatch(
        setUser({
          token: auth.token,
          user: {
            email: auth.user.email,
          },
        })
      );
    }
  }, [auth.token, auth.user.email, dispatch]);

  return (
    <div>
      <MainLayout />
    </div>
  );
}

export default App;
