import { FC } from "react";
import { Router } from "@/routes/router";
import { AuthProvider } from "@/context/AuthContext";

const App: FC = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
