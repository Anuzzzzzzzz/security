import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Notification, useToaster } from "rsuite";
import { travelCards } from "../../pages/home/cardsArray";
import logo from "../../pages/home/logos/logo.png";
import { logout, selectUser } from "../../store/features/authSlice/authSlice";
import { createDataFunc } from "../../store/features/search/searchSlice";

import { useLogoutMutation } from "../../store/features/usersApiSlice/usersApiSlice";
import "./navbar.scss";

type Props = {};

const Navbar: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toaster = useToaster();
  const { data } = useSelector((state: any) => state.data);
  const user = useSelector(selectUser);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [, setSearchParams] = useSearchParams();
  const [travelStylesDropdownOpen, setTravelStylesDropdownOpen] =
    useState(false);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [wordEntered, setWordEntered] = useState<string>("");

  const [logoutApiCall] = useLogoutMutation();

  const handleClickOutsideDropdown = (e: any) => {
    if (
      travelStylesDropdownOpen &&
      !dropdownRef.current?.contains(e.target as Node)
    ) {
      setTravelStylesDropdownOpen(false);
    }
  };
  window.addEventListener("click", handleClickOutsideDropdown);

  const handleFilter = (e: any) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = travelCards.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };

  const clearInput = () => {
    setFilterData([]);
    setWordEntered("");
  };

  const handleSearch = () => {
    if (data) {
      setSearchParams({ q: data });
      navigate(`/sr?q=${data}`);
    }
  };

  const handleDropdownClick = (dropdown: string) => {
    if (dropdown === "travelStyles") {
      setTravelStylesDropdownOpen(!travelStylesDropdownOpen);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const activeLinksBorderBottom = (isActive: boolean) => {
    return isActive ? { borderBottom: "1px solid black" } : {};
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall("").unwrap();
      dispatch(logout());
      navigate("/");
      toaster.push(
        <Notification>
          <div className="notification-content">
            <h6>Successfully logged out 🎉</h6>
          </div>
        </Notification>,
        {
          placement: "topEnd",
        }
      );
    } catch (error: any) {
      toaster.push(
        <Notification type="error" header="Error">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h6>
              {error.data.message || "An error occurred. Please try again."}
            </h6>
          </div>
        </Notification>,
        {
          placement: "topEnd",
        }
      );
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <NavLink className="logo" to="/">
          <img src={logo} alt="Logo" />
        </NavLink>
        <ul className="links">
          <NavLink
            className="li"
            to="travel-deals"
            style={({ isActive }) => activeLinksBorderBottom(isActive)}
          >
            Travel deals
          </NavLink>
          <li
            onClick={() => handleDropdownClick("travelStyles")}
            ref={dropdownRef}
          >
            Travels
            <i className={travelStylesDropdownOpen ? "up" : "down"}>
              <AiOutlineDown />
            </i>
            {travelStylesDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="dropdown-content"
              >
                {travelCards.map((card) => (
                  <NavLink
                    to={`/${card.url}`}
                    className="dropdown-link"
                    style={({ isActive }) => activeLinksBorderBottom(isActive)}
                    key={card.url}
                  >
                    {card.title}
                  </NavLink>
                ))}
              </motion.div>
            )}
          </li>
          <NavLink
            className="li"
            to="about-us"
            style={({ isActive }) => activeLinksBorderBottom(isActive)}
          >
            About Us
          </NavLink>
          {user ? (
            <>
              <NavLink to="profile" className="li">
                Profile
              </NavLink>
              <NavLink to="/" className="li" onClick={handleLogout}>
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="login"
                className="li"
                style={({ isActive }) => activeLinksBorderBottom(isActive)}
              >
                Login
              </NavLink>
              <NavLink
                to="register"
                className="li"
                style={({ isActive }) => activeLinksBorderBottom(isActive)}
              >
                Register
              </NavLink>
            </>
          )}
        </ul>
        <div className="input-box">
          <input
            type="text"
            onChange={(e) => {
              dispatch(createDataFunc(e.target.value));
              handleFilter(e);
            }}
            value={wordEntered}
            onKeyDown={handleKeyDown}
            placeholder="Search for a hotel or deal..."
            ref={inputRef}
          />
          {filterData.length === 0 ? (
            <button onClick={handleSearch}>
              <AiOutlineSearch />
            </button>
          ) : (
            <h5 onClick={clearInput}>x</h5>
          )}

          {filterData.length != 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="dropdown-search-results"
            >
              {filterData.map((value, index) => (
                <div key={index} className="search-result-item">
                  {value.title}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
