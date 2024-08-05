import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import useAuthStore from "./store/authStore";

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  /*const authUser = useAuthStore((state) => state.user);*/

  return (
    <>
      <PageLayout>
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
          <Route path='/:username' element={<ProfilePage />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App
