import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/searchStyles.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Search = () => {
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [beds, setBeds] = useState(null);
  const [date, setDate] = useState("");
  const [zip, setZip] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!type || !minPrice || !maxPrice || !beds) {
      setErrorMessage(
        "Type, Min price, Max price and Beds fields are required. Please fill the fields before searching."
      );
      setShowModal(true);
      return;
    }

    if (Number(minPrice) >= Number(maxPrice)) {
      setErrorMessage(
        "Minimum price must be less than maximum price. Please enter price correctly."
      );
      setShowModal(true);
      return;
    }

    if (date) {
      const [year, month, day] = date.split("-");

      // Convert month from number to name
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const formattedDate = {
        year: parseInt(year, 10),
        month: monthNames[parseInt(month, 10) - 1], // Convert numeric month to name
        day: parseInt(day, 10),
      };

      // Navigate to the properties page with the search criteria
      navigate("/properties", {
        state: { type, minPrice, maxPrice, beds, formattedDate, zip },
      });
    } else {
      const formattedDate = "";
      navigate("/properties", {
        state: { type, minPrice, maxPrice, beds, formattedDate, zip },
      });
    }
  };

  

  return (
    <div className="search mt-5 mt-lg-4">
      <div className="search-container">
        <div className="dropdown">
          <i className="bi bi-columns-gap dropdown-icon"></i>
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Type</option>
            <option value="any">Any</option>
            <option value="house">House</option>
            <option value="flat">Flat</option>
            <option value="apartment">Apartment</option>
          </select>
        </div>

        <div className="dropdown">
          <i className="bi bi-currency-dollar dropdown-icon"></i>
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="dropdown">
          <i className="bi bi-currency-dollar dropdown-icon"></i>
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="dropdown">
          <i className="bi bi-door-closed dropdown-icon"></i>
          <input
            type="number"
            placeholder="Beds"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
          />
        </div>

        <div className="dropdown">
       <i className="bi bi-calendar-week dropdown-icon"></i>
       <input
             type="date"
             placeholder="Date"
             value={date}
             onChange={(e) => setDate(e.target.value)}
           />
         </div>



        <div className="dropdown">
          <i className="bi bi-tag dropdown-icon"></i>
          <input
            placeholder="Zip code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>

        <button className="btn btn-primary search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Your search fields */}

      {/* Modal for Error Messages */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="profile-info">Search Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Search;
