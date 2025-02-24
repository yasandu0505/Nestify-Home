import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; 
import "../css/propertyCardStyles.css";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for the confirmation modal

  // Check if the property is already in favorites on mount
  useEffect(() => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = existingFavorites.some(
      (favProperty) => favProperty.id === property.id
    );
    setIsFavorite(isAlreadyFavorite);
  }, [property.id]);

  const handleAddToFavorites = (property) => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = existingFavorites.some(
      (favProperty) => favProperty.id === property.id
    );

    if (!isAlreadyFavorite) {
      // Add to favorites
      const updatedFavorites = [...existingFavorites, property];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(true); // Highlight the icon
      setShowModal(true); // Show success modal
    } else {
      // If already in favorites, show confirmation modal to remove
      setShowConfirmationModal(true);
    }
  };

  const handleRemoveFromFavorites = () => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = existingFavorites.filter(
      (favProperty) => favProperty.id !== property.id
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(false); // Remove highlight from the icon
    setShowConfirmationModal(false); // Close confirmation modal
  };

  return (
    <div key={property.id} className="col-md-4 mb-4">
      <div
        className="card-company-info"
        onClick={() => {
          navigate(`/property/${property.id}`);
        }}
      >
        <div className="img-holder">
          <img src={property.picture} alt="hi" />
        </div>
        <div className="card-body-info mb-4 mt-3">
          <div className="card-title-fav-icon">
            <h4 className="card-title profile-info">{property.title}</h4>
            <div
              className={`fav-icon-holder ${isFavorite ? "it-is-fav" : ""}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the parent `onClick` from triggering
                handleAddToFavorites(property);
              }}
            >
              <i className="bi bi-heart"></i>
            </div>
          </div>

          <p className="card-text profile-info-2 mt-3">
            <i className="bi bi-cash me-1"></i>
            {property.price}
            <i class="bi bi-currency-dollar"></i>
          </p>

          <p className="card-text  text-align-justify profile-info-2">
            <i className="bi bi-house-door-fill me-1"></i>
            {property.type}
          </p>
          <p className="card-text profile-info-2">
            <i className="bi bi-feather"></i> Beds : {property.bedrooms}
          </p>

          <p className="card-text profile-info-2">
            <i className="bi bi-geo-alt-fill me-1"></i>
            {property.location}, {property.postCode}
          </p>
        </div>
      </div>

      {/* Modal for showing confirmation to remove from favorites */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="profile-info">Remove from Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this property from your favorites list?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveFromFavorites}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for confirming addition to favorites */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="profile-info">Added to Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This property has been added to your favorites list.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PropertyCard;
