import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.scss";

import { Provider } from "react-redux";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.tsx";
import ScrollToTop from "./constants/scrollToTop/scrollToTop.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import SearchQueryPage from "./pages/SearchQueryPage/SearchQueryPage.tsx";
import AboutUs from "./pages/aboutUs/AboutUs.tsx";
import Home from "./pages/home/home.tsx";
import NotFoundPage from "./pages/notFound/NotFoundPage.tsx";
import Profile from "./pages/profile/Profile.tsx";
import TravelDeals from "./pages/travelDeals/TravelDeals.tsx";
import { store } from "./store/store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="/travel-deals" element={<TravelDeals />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/travelstyles" element={<TravelDeals />} />
          <Route path="/aboutus" element={<AboutUs />} />  {/* Add About Us route */}
          {/* Private Route */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path=":url" element={<SearchQueryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
