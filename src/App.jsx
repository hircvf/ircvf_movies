import { RoutesApp } from "./routes/routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <RoutesApp />
      <ToastContainer />
    </>
  );
}
