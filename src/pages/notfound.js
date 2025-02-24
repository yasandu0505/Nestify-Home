import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/notFound.css"; 
import notFoundImage from '../images/404.png'; 

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = setTimeout(() =>  {
      navigate("/");
    }, 3000);

    return () => clearTimeout(redirect);
  }, [navigate]);

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="text-center">
        
        <h1 className="not-found-heading">404 - Not Found</h1>
        <img src={notFoundImage} alt="Not Found" className="mb-2" style={{ maxWidth: '100px', height: 'auto' }} />
        <p className="not-found-text">
          The page you are looking for does not exist.
        </p>
        <p className="redirect-message">Redirecting to home...</p>
      </div>
    </div>
  );
};

export default NotFound;
