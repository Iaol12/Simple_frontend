import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormScreen = ({ setFormData }) => {
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    dob: '',
    currency: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Chyba pri načítavaní krajín:', error));
  }, []);

  const validateName = name => /^[a-zA-Z\s]+$/.test(name);
  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const year = parseInt(form.dob.substring(0, 4), 10);
  const validateDOB = dob => /^\d{4}-\d{2}-\d{2}$/.test(dob)&& year >= 1950 && year <= 2020;  

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'country') {
      const selectedCountry = countries.find(country => country.name === value);
      setForm({
        ...form,
        country: value,
        currency: selectedCountry ? selectedCountry.currencies[0].name : ''
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};

    if (!validateName(form.name)) {
      valid = false;
      newErrors.name = 'Neplatné meno. Povolené sú len písmená a medzery.';
    }

    if (!validateEmail(form.email)) {
      valid = false;
      newErrors.email = 'Neplatná emailová adresa.';
    }

    if (!validateDOB(form.dob)) {
      valid = false;
      newErrors.dob = 'Neplatný dátum narodenia. ';
    }

    setErrors(newErrors);

    if (valid) {
      setFormData(form);
      navigate('/data');
    }
  };

  return (
    <div className="container">
      <h1>Vyplňte formulár</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Meno:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Dátum narodenia:</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
          {errors.dob && <p className="error">{errors.dob}</p>}
        </div>
        <div>
          <label>Krajina:</label>
          <select name="country" value={form.country} onChange={handleChange} required>
            <option value="">Vyberte krajinu</option>
            {countries.map(country => (
              <option key={country.alpha3Code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Potvrdiť</button>
      </form>
    </div>
  );
};

export default FormScreen;
