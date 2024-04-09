import React, { useEffect, useState } from "react";
import Header from "../Home/Header/Header";
import Navbar from "../Shared/Navbar/Navbar";
import axios from "axios";

import "./Search.css";

const Search = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [therapistsList, setTherapistsList] = useState([]);

  const getTherapists = async () => {
    try {
      const res = await axios.get(`${baseUrl}/auth/therapists`);
      if (Array.isArray(res.data)) setTherapistsList(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getTherapists();
  }, []);

  return (
    <div>
      <header style={{ padding: "0 20px" }}>
        <Navbar current={"search"}></Navbar>
      </header>

      <div className="container">
        <h1>Search Therapists</h1>

        <div className="grid-layout">
          {therapistsList.length === 0 ? (
            <p>No therapists found.</p>
          ) : (
            therapistsList.map((therapist, i) => (
              <div className="item" key={i}>
                <img
                  src={`https://ui-avatars.com/api/?name=${therapist.username}&size=280&background=random`}
                  alt="Profile"
                />

                <div className="content">
                  <h5>
                    {therapist.username}
                  </h5>
                   <p className="under-title">
                    More information...
                  </p>

                  <div style={{marginTop:20}} class="d-grid gap-2">
  <a href={`/appointment/${therapist.username}`} style={{borderRadius:4}} class="btn btn-primary" type="button">Schedule Appointment</a>

</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
