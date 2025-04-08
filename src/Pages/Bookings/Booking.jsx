import "./booking.styles.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createBooking, reset } from "../../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

 const API_URL = process.env.REACT_APP_API_URL || "https://hotelrentalappserver-production.up.railway.app";


const Booking = () => {
  const { id: roomId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess } = useSelector((state) => state.booking);

  const [room, setRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const { name, email, checkInDate, checkOutDate } = formData;

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`${API_URL}/rooms/${roomId}`);
        const data = await res.json();
        if (!res.ok) {
          return console.log("there was a problem getting room");
        }
        return setRoom(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRoom();
  }, [roomId]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/success");
      dispatch(reset());
    }
  }, [isSuccess, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      roomId,
      name,
      email,
      checkInDate,
      checkOutDate,
    };

    dispatch(createBooking(dataToSubmit));
  };

  return (
    <div>
      <h1 className="heading center">Book Now</h1>

        {/* Display room details if available */}
        {room && (
  <div className="room-details">
    <h2 className="room-title">{room.name}</h2>
    <p className="room-description">{room.description}</p>
    <p className="room-price">Price: <span>${room.price}</span></p>
  </div>
)}

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter full name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email address"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="date">Check In Date</label>
            <input
              type="date"
              name="checkInDate"
              value={checkInDate}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="date">Check Out Date</label>
            <input
              type="date"
              name="checkOutDate"
              value={checkOutDate}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;