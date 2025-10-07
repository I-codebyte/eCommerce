import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Navigation from "./pages/Auth/Navigetion";

export default function App() {
	return <>
	<ToastContainer />
	<Navigation />
	<main className="py-3">
		<Outlet />
	</main>
	</>
}
