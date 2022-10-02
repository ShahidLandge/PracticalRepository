import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateEmployee = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      city: ""
    }
  });

  useEffect(() => {
    const fetchHandler = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const data = await response.data;
      console.log(data);
      setInputs(data);
    };
    fetchHandler();
  }, [id]);

  const handleInputChange = (e) => {
    let updatedInput = { ...inputs };
    if (e.target.id === "city") {
      updatedInput.address.city = e.target.value;
    } else {
      updatedInput[e.target.id] = e.target.value;
    }
    setInputs(updatedInput);
  };

  const sendRequest = async () => {
    await axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        name: inputs.name,
        email: inputs.email,
        phone: inputs.phone,
        address: {
          city: inputs.address.city
        }
      })
      .then((response) => console.log(response.data));
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/employees"));
  };

  return (
    <>
      <form className="px-4 py-3" onSubmit={handlesubmit}>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              style={{ width: "20rem" }}
              value={inputs.name}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleDropdownFormEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="email@example.com"
              style={{ width: "20rem" }}
              value={inputs.email}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>

            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Phone Number"
              style={{ width: "20rem" }}
              value={inputs.phone}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>

            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="City"
              style={{ width: "20rem" }}
              value={inputs.address.city}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </>
  );
};
