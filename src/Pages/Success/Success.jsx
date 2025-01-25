import "./success.styles.scss";

import React from "react";

const Success = () => {
  return (
    <div className="success-container">
      <div className="success-wrapper">
        <h1 className="success-heading">Booking Successful</h1>
        <p className="success-message">
          Thank you for your booking! Your reservation has been confirmed. 
          We look forward to seeing you soon.
        </p>
        <div className="success-cta">
          <button className="btn-primary" onClick={() => window.location.href = "/rooms"}>
            Back to Rooms
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
