import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomNavbar from "../components/navBar";
import { Spinner } from "react-bootstrap";
import { FaBed } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { FaSignsPost } from "react-icons/fa6";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import { FaMoneyBill } from "react-icons/fa";

const PropertyInfo = () => {

  const { propertyId } = useParams();

  const [properties, setProperties] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch("/data/properties.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch property: ${response.statusText}`);
        }
        const json = await response.json();
        const propertyData = json.properties.find(
          (p) => p.id === parseInt(propertyId)
        );
        setProperties(propertyData);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);


  return (
    <>
      <CustomNavbar active={"properties"} />

      {isLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" className="custom-spinner" />
          <p>Loading...</p>
        </div>
      ) : properties ? (
        <div className="property-info-space mt-5">
          <div className="container mb-5">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="image-slider-space">
                  <CCarousel controls>
                    <CCarouselItem>
                      <CImage
                        className="d-block w-100"
                        src={properties.pictureSet[0]}
                        alt="slide 1"
                      />
                    </CCarouselItem>
                    <CCarouselItem>
                      <CImage
                        className="d-block w-100"
                        src={properties.pictureSet[1]}
                        alt="slide 2"
                      />
                    </CCarouselItem>
                    <CCarouselItem>
                      <CImage
                        className="d-block w-100"
                        src={properties.pictureSet[2]}
                        alt="slide 3"
                      />
                    </CCarouselItem>
                    <CCarouselItem>
                      <CImage
                        className="d-block w-100"
                        src={properties.pictureSet[3]}
                        alt="slide 4"
                      />
                    </CCarouselItem>
                    <CCarouselItem>
                      <CImage
                        className="d-block w-100"
                        src={properties.pictureSet[4]}
                        alt="slide 5"
                      />
                    </CCarouselItem>
                  </CCarousel>
                </div>
              </div>
              <div className="col-12 col-lg-6 mt-4 mt-lg-0">
                <div className="property-details-space">
                  <div className="col-12">
                    <h3>{properties.title}</h3>
                  </div>
                  <div className="col-12">
                    <p className="text-align-justify">
                      {properties.description}
                    </p>
                    <p>
                    <FaMoneyBill className="me-3"  />
                      {properties.price}
                      <i class="bi bi-currency-dollar"></i>
                    </p>
                    <p>
                      <FaPhoneAlt className="me-3" />
                      {properties.phoneNumber}
                    </p>
                    <p>
                      <FaLocationArrow className="me-3" />
                      {properties.location}
                    </p>
                    <p>
                      <FaSignsPost className="me-3" />
                      {properties.postCode}
                    </p>
                  </div>
                  <div className="col-12 mt-4">
                    <div className="row">
                      <div className="col-12 col-lg-4">
                        <div className="small-info">
                          <i className="bi bi-columns-gap"></i>
                          {properties.type}
                        </div>
                      </div>

                      <div className="col-12 col-lg-4 mt-2 mt-lg-0">
                        <div className="small-info">
                          <FaBed />
                          {properties.bedrooms}
                        </div>
                      </div>

                      <div className="col-12 col-lg-4 mt-2 mt-lg-0">
                        <div className="small-info">
                          <i className="bi bi-currency-dollar "></i>
                          {properties.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center set-section  mb-4 mt-4 mt-lg-5">
              <iframe
                title="Location Map"
                src={properties.mapCode}
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
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

export default PropertyInfo;
