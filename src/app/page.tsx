"use client";

import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import departments from "./departments.json";
import doctors from "./doctors.json";

export default function Home() {
  const API = "https://dev.minaini.com:2053/r";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [departmentId, setDepartmentId] = useState(null);
  const [fetchedDoctors, setFetchedDoctors] = useState([]);

  const dep = departments.results.filter((d) => d.is_active === true);

  const login = async () => {
    axios
      .post(API, {
        email: email,
        password: password,
        app_type: "patient",
      })
      .then((res) => {
        console.log(res);
      });
  };

  const fetchDoctors = async ({ id }) => {
    setDepartmentId(id);
    const docs = doctors.results.filter((doctor) => doctor.department.id == id);
    console.log(docs);
    setFetchedDoctors(docs);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    login();
  };

  return (
    <main>
      <form>
        <input
          type="text"
          value={email}
          name="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          name="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={onSubmitForm}
          disabled={!email.trim() || !password.trim()}
          type="submit"
        >
          Submit
        </button>
      </form>

      <div>
        <h1>Departments</h1>
        <div>
          {dep.map(({ id, name, image }) => {
            return (
              <button onClick={() => fetchDoctors({ id })} key={id}>
                <h3>{name}</h3>
                {image && <img width={40} src={image} />}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h1>Doctors</h1>
        <div>
          {fetchedDoctors.map(({ id, user }) => {
            return (
              <div key={id}>
                <span>name: {user.name}</span> <br />
                {user?.image && <img width={100} src={user?.image} />}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
