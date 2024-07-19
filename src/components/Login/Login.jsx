import React from 'react';
import {
  emailValidationMessage,
  validateEmail,
  validatePassword,
  passwordValidationMessage,
  validateUser,
  userValidationMessage
} from '../../shared/validators/validator.js';
import { Input } from '../Input.jsx';
import { useState } from 'react';
import { Logo } from '../Logo.jsx';
import { useLogin } from '../../shared/hooks/useLogin.jsx';
import { FaUser, FaLock } from "react-icons/fa";

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();
  const [formData, setFormData] = useState({
    user: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const isSubmitButtonDisable = !formData.user.isValid || !formData.password.isValid;

  const onValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value
      }
    }));
  };

  const handleValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case 'user':
        isValid = validateUser(value);
        break;
      case 'password':
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        isValid,
        showError: !isValid
      }
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(formData.user.value, formData.password.value);
  };

  return (
    <div className="login-container">
      <Logo text={"Login"} />
      <form name='form1' className="auth-form" onSubmit={handleLogin}>
        <Input
          field="user"
          label={
            <label style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#333",
              textTransform: "uppercase",
              letterSpacing: "0.1rem",
              display: "flex",
              alignItems: "center",
              fontFamily: 'Poetsen One, sans-serif'
            }}>
              <FaUser style={{ marginRight: "0.5rem" }} /> User
            </label>
          }
          value={formData.user.value}
          onChangeHandler={onValueChange}
          type="user"
          placeholder="User"
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.user.showError}
          validationMessage={userValidationMessage}
          inputStyle={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "100%",
            boxSizing: "border-box",
            '::placeholder': {
              color: 'rgba(128, 128, 128, 0.5)',
              fontFamily: 'Poetsen One, sans-serif'
            }
          }}
        />
        {!formData.user.value && (
          <div style={{ color: "gray" }}>Please enter your credentials</div>
        )}

        <Input
          field="password"
          label={
            <label style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#333",
              textTransform: "uppercase",
              letterSpacing: "0.1rem",
              display: "flex",
              alignItems: "center",
              fontFamily: 'Poetsen One, sans-serif'
            }}>
              <FaLock style={{ marginRight: "0.5rem" }} /> Password
            </label>
          }
          value={formData.password.value}
          onChangeHandler={onValueChange}
          type="password"
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.password.showError}
          validationMessage={passwordValidationMessage}
          inputStyle={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "100%",
            boxSizing: "border-box",
            '::placeholder': {
              color: 'rgba(128, 128, 128, 0.5)',
              fontFamily: 'Poetsen One, sans-serif'
            }
          }}
        />
        {!formData.password.value && (
          <div style={{ color: "gray" }}>Please enter your password</div>
        )}

        <button
          className="btn btn-primary rounded-pill text-white login-button"
          style={{ backgroundColor: 'orange' }}
          disabled={isSubmitButtonDisable}
        >
          LogIn
        </button>
      </form>
      <span onClick={switchAuthHandler} className="auth-form-switch-label">
        ¿Aún no tienes una cuenta? ¡Registrate...!
      </span>
    </div>
  );
};