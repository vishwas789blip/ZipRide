import React, { useEffect, useContext } from "react";
import { CaptainDataContext } from "../context/captainContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
  } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCaptain(res.data.captain);
        }
      })
      .catch((err) => {
        console.error(
          err.response?.data?.message || err.message
        );

        localStorage.removeItem("token");
        navigate("/captain-login");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, navigate, setCaptain, setIsLoading]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;