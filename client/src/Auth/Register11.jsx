import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password!== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const userData = { name, email, password };
    axios.post('http://localhost:3000/api/auth/signup', userData)
     .then(response => {
        console.log(response.data);
        alert('User registered successfully');
        resetForm();
      })
     .catch(error => {
        console.log('error')
        // console.error(error);
        alert('Error registering user');
      });
  };

    // reset form
    const resetForm = () => {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '50%', padding: '55px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2>Registration Form</h2>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Register</button>

      </form>
    </div>
    
  );
};

export default RegistrationForm;