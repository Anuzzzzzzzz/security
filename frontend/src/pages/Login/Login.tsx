import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Notification, useToaster } from "rsuite";
import { login as setCredentials } from "../../store/features/authSlice/authSlice";
import { useLoginMutation } from "../../store/features/usersApiSlice/usersApiSlice";
import { RootState } from "../../store/store"; // Ensure you have a RootState type
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toaster = useToaster();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [login, { isLoading }] = useLoginMutation();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(DOMPurify.sanitize(e.target.value));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      toaster.push(
        <Notification>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaExclamationCircle className="error-icon" />
            <h6>Please fill in both fields.</h6>
          </div>
        </Notification>,
        {
          placement: "topEnd",
        }
      );
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate("/");

      toaster.push(
        <Notification>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h6>Logged in successfully!</h6>
          </div>
        </Notification>,
        {
          placement: "topEnd",
        }
      );
    } catch (error: any) {
      toaster.push(
        <Notification>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaExclamationCircle className="error-icon" />
            <h6>Invalid credentials. Please try again.</h6>
          </div>
        </Notification>,
        {
          placement: "topEnd",
        }
      );
    }
  };

  return (
    <div className="page">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="container"
      >
        <h1>Login</h1>
        <div className="input-space">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
            required
          />
        </div>
        <div className="input-space">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
            required
          />
          <button onClick={handleShowPassword} className="show-password">
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        
        {/* Forgot Password Link */}
        <div className="forgot-password">
          <span onClick={() => navigate("/forgot-password")}>Forgot Password?</span>
        </div>

        <button disabled={isLoading} onClick={handleSubmit} className="button">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
