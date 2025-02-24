import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../components/navBar";
import "../css/landingPage.css";
import { Spinner } from "react-bootstrap";
import PropertyCard from "../components/propertyCard";

import "../css/propertyInfo.css";
import Search from "../components/search";

const LandingPage = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/data/properties.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch properties: ${response.statusText}`);
        }
        const json = await response.json();
        setProperties(json.properties.slice(0, 6));
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <CustomNavbar active={"home"} />
      <div className="container mt-4">
        <div className="section-header ">
          <h3 className="profile-info text-align-center">Home</h3>
        </div>
      </div>

      <Search />

      {isLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" className="custom-spinner" />
          <p>Loading...</p>
        </div>
      ) : properties.length > 0 ? (
        <div className="container mt-0 mt-lg-5">
          <div className="row">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="see-more-btn-holder mt-2 mb-4">
            <button
              className="see-more-btn-holder-btn"
              onClick={() => {
                navigate("/properties");
              }}
            >
              See more <i class="bi bi-arrow-right-circle-fill arrow-icon"></i>
            </button>
          </div>
        </div>
      ) : (
        <div className="error-screen-not-found mt-3">
          <div className="error-container">
            <h5>No properties found</h5>
          </div>
        </div>
      )}

   
    </>
  );
};

export default LandingPage;
