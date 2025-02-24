import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import CustomNavbar from "../components/navBar";
import PropertyCard from "../components/propertyCard";
import Search from "../components/search";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const searchCriteria = location.state;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/data/properties.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch properties: ${response.statusText}`);
        }
        const json = await response.json();
        setProperties(json.properties);

        if (searchCriteria) {

          const filtered = json.properties.filter((property) => {
            const matchesType = searchCriteria.type
              ? searchCriteria.type.toLowerCase() === "any" ||
                property.type.toLowerCase() ===
                  searchCriteria.type.toLowerCase()
              : true;

            const matchesPrice =
              searchCriteria.minPrice && searchCriteria.maxPrice
                ? property.price >= Number(searchCriteria.minPrice) &&
                  property.price <= Number(searchCriteria.maxPrice)
                : true;

            const matchesBeds = searchCriteria.beds
              ? property.bedrooms === Number(searchCriteria.beds)
              : true;

            const matchesZip = searchCriteria.zip
              ? property.postCode === Number(searchCriteria.zip)
              : true;

            const matchesDate = searchCriteria.date
              ? // Create Date objects from both added and formattedDate
                new Date(
                  property.added.year,
                  property.added.month,
                  property.added.day
                ).toDateString() ===
                new Date(
                  searchCriteria.formattedDate.year,
                  searchCriteria.formattedDate.month,
                  searchCriteria.formattedDate.day
                ).toDateString()
              : true;

            return (
             
              matchesType && matchesBeds && matchesPrice &&
              matchesDate &&  matchesZip
            );
          });

          setFilteredProperties(filtered);
        } else {
          setFilteredProperties(json.properties);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [searchCriteria]);

  console.log(properties);
  return (
    <>
      <CustomNavbar active={"properties"} />
      <div className="container">
        <div className="section-header mt-4">
          <h3 className="profile-info">Properties</h3>
        </div>
      </div>

      <Search />

      {isLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" className="custom-spinner" />
          <p>Loading...</p>
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="container mt-5">
          <div className="row">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
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

export default Properties;
