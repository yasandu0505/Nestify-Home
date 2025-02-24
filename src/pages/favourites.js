import { useState, useEffect} from "react";
import CustomNavbar from "../components/navBar";
import { Spinner } from "react-bootstrap"; 
import PropertyCard from "../components/propertyCard";


const Fav = () => {

    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = () => {
          const savedProperties = JSON.parse(localStorage.getItem("favorites")) || [];
          setProperties(savedProperties); 
          setIsLoading(false); 
        };
    
        fetchFavorites();
      }, []);


    return ( 
        <>
        <CustomNavbar active={'fav'}/>
        <div className="container">
        <div className="section-header mt-4">
          <h3 className="profile-info">Favourites</h3>
        </div>
        </div>
        {isLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" className="custom-spinner" />
          <p>Loading...</p>
        </div>
      ) : properties.length > 0 ? (
        <div className="container mt-4">
          <div className="row">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

        </div>
      ) : (
        <div className="error-screen-not-found mt-3">
          <div className="error-container">
            <h5>No favorites found</h5>
          </div>
        </div>
      )}
        </>
     );
}
 
export default Fav;