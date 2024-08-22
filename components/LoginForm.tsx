"use client";

import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [cookies, setCookie] = useCookies(['authToken']);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  async function handleSubmit() {
    try {
      const response = await fetch("https://kundenportal.iot-wizard.at/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        setIsSuccess(false);
        setFeedback("Login failed");
        return;
      }

      const data = await response.json();

      // Assuming the API returns a token or some user data
      const { token } = data; // Replace 'token' with the actual key if different

      // Set the cookie with secure flags
      setCookie('authToken', token, {
        maxAge: 3600, // Expires in 1 hour
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        httpOnly: false, // Cookies set from the client side can't be httpOnly
        sameSite: 'strict', // Ensures the cookie is only sent for same-site requests
      });

      setIsSuccess(true);
      setFeedback("Login successful");

      setEmail("");
      setPassword("");

    } catch (error) {
      setIsSuccess(false);
      setFeedback("Error Submitting: ");
    }
  }

  return (
    <div className="card text-neutral-content w-96 p-6 space-y-4">
      <label htmlFor="email" className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          id="email"
          type="text"
          className="grow"
          placeholder="Email"
          autoFocus={true}
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          id="password"
          type="password"
          className="grow"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button onClick={handleSubmit} className="btn btn-outline">Login</button>
      {feedback && (
        <h2 className={`text-center ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
          {feedback}
        </h2>
      )}
    </div>
  );
};

export default LoginForm;
