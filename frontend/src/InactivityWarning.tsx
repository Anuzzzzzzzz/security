import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const InactivityHandler = () => {
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // 5-minute countdown
  const navigate = useNavigate();

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const warningTimeout = 30 * 1000; // Show warning after 30 seconds
    const logoutTimeout = 300; // 5 minutes (300 seconds)

    // Function to logout user
    const handleLogout = () => {
      console.log("User logged out due to inactivity.");
      localStorage.removeItem("token"); // Clear stored session token
      setIsWarningVisible(false);
      navigate("/login");
      window.location.href = "/login"; // Ensures full redirection
    };

    // Function to start countdown after warning
    const startCountdown = () => {
      setIsWarningVisible(true);
      let countdown = logoutTimeout;

      countdownTimerRef.current = setInterval(() => {
        setRemainingTime(countdown);
        countdown--;

        if (countdown < 0) {
          clearInterval(countdownTimerRef.current!);
          handleLogout();
        }
      }, 1000);
    };

    // Function to reset inactivity timer
    const resetTimers = () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      setIsWarningVisible(false);
      setRemainingTime(300);

      inactivityTimerRef.current = setTimeout(startCountdown, warningTimeout);
    };

    // Event Listener for User Activity
    const userActivityListener = () => resetTimers();

    window.addEventListener("mousemove", userActivityListener);
    window.addEventListener("keypress", userActivityListener);

    // Start Inactivity Timer on Mount
    resetTimers();

    return () => {
      window.removeEventListener("mousemove", userActivityListener);
      window.removeEventListener("keypress", userActivityListener);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [navigate]);

  return (
    <div>
      {isWarningVisible && (
        <div className="warning-modal">
          <p>Inactive! Logging out in {remainingTime} seconds.</p>
          <button onClick={() => window.location.href = "/login"}>Log Out Now</button>
        </div>
      )}
    </div>
  );
};

export default InactivityHandler;
