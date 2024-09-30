import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { UserProvider } from "./Context/UserContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <UserProvider>
      <App />
    </UserProvider>
    <ToastContainer />
  </>
);
