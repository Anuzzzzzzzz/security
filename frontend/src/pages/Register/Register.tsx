import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Notification, useToaster } from "rsuite";
import { login as setCredentials } from "../../store/features/authSlice/authSlice";
import { useRegisterMutation } from "../../store/features/usersApiSlice/usersApiSlice";
import { RootState } from "../../store/store"; // Ensure you have a RootState type
import "./Register.scss";

// Password validation function (minimum 8 characters, one uppercase, one lowercase, one digit, and special character)
const validatePassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  return regex.test(password);
};

// Email validation function
const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [register, { isLoading }] = useRegisterMutation();
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toaster = useToaster();

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++; // Check for special characters
    setPasswordStrength(strength);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const showNotification = useCallback((message: string) => {
    toaster.push(
      <Notification>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FaExclamationCircle className="error-icon" />
          <h6>{message}</h6>
        </div>
      </Notification>,
      { placement: "topEnd" }
    );
  }, [toaster]);

  const handleClickButton = async () => {
    if (!email || !password || !confirmPassword || !name) {
      showNotification("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      showNotification("Invalid email format.");
      return;
    }

    if (password.length < 8) {
      showNotification("Password must be at least 8 characters long.");
      return;
    }

    if (!validatePassword(password)) {
      showNotification("Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
      return;
    }

    if (password !== confirmPassword) {
      showNotification("Passwords do not match.");
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");

      toaster.push(
        <Notification>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h6>Successfully registered. Welcome {res.name}! 🎉</h6>
          </div>
        </Notification>,
        { placement: "topEnd" }
      );
    } catch (error: any) {
      showNotification("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    calculatePasswordStrength(password);
  }, [password]);

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
        <h1>Register</h1>
        <div className="input-space">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={3}
            required
          />
        </div>
        <div className="input-space">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-space">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
          <button onClick={handleShowPassword} className="show-password">
            {showPassword ? "Hide" : "Show"}
          </button>
          <div className={`password-strength-bar strength-${passwordStrength}`} />
        </div>
        <div className="input-space">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          disabled={isLoading}
          onClick={handleClickButton}
          className="button"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </motion.div>
    </div>
  );
};

export default Register;
