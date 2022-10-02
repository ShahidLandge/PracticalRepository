import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const Employees = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userFunc = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const data = await response.data;
    console.log(data);
    setUsers(data);
    setLoading(false);
  };
  useEffect(() => {
    userFunc();
  }, []);
  const Loader = () => {
    return (
      <>
        <h3>Loading Products....Please wait</h3>
        <div className="loader"></div>
      </>
    );
  };
  // Add Employee
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/users/", {
        name: name,
        email: email,
        phone: phone,
        city: city
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
      });
  };
  return (
    <>
      <br />
      {!loading ? (
        <>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-outline-primary mx-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add Employee
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Add New Employee
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form className="px-4 py-3" onSubmit={handlesubmit}>
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleDropdownFormName"
                            className="form-label"
                          >
                            Name
                          </label>

                          <input
                            type="name"
                            className="form-control"
                            id="exampleDropdownFormName"
                            placeholder="Name"
                            style={{ width: "20rem" }}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleDropdownFormEmail1"
                            className="form-label"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleDropdownFormEmail1"
                            placeholder="email@example.com"
                            style={{ width: "20rem" }}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label">
                            Phone
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="Phone Number"
                            style={{ width: "20rem" }}
                            onChange={(e) => setPhone(e.target.value)}
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
                            placeholder="City Name"
                            style={{ width: "20rem" }}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Add Employee
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive my-5 mx-3">
            <table className="table  table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email-Id</th>
                  <th scope="col">Phone-No</th>
                  <th scope="col">City</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              {users.map((ele) => {
                return (
                  <tbody key={ele.id}>
                    <tr>
                      <th scope="row">{ele.id}</th>
                      <td>{ele.name}</td>
                      <td>{ele.email}</td>
                      <td>{ele.phone}</td>
                      <td>{ele.address.city}</td>

                      <td>
                        {" "}
                        <button
                          type="submit"
                          className="btn"
                          onClick={() => navigate(`/employee/update/${ele.id}`)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
