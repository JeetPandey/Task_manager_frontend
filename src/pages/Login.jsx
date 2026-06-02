import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

 const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response =
            await api.post(
                "login/",
                {
                    username,
                    password
                }
            );

        localStorage.setItem(
            "access",
            response.data.access
        );

        localStorage.setItem(
            "refresh",
            response.data.refresh
        );

        const profileResponse =
            await api.get(
                "profile/",
                {
                    headers: {
                        Authorization:
                        `Bearer ${response.data.access}`
                    }
                }
            );

        localStorage.setItem(
            "is_staff",
            profileResponse.data.is_staff
        );

        localStorage.setItem(
            "username",
            profileResponse.data.username
        );

        navigate("/tasks");

    } catch {

        setError(
            "Invalid credentials"
        );
    }
};

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card p-4">

            <h3 className="text-center">
              Login
            </h3>

            {error && (

              <div className="alert alert-danger">

                {error}

              </div>
            )}

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <button
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;