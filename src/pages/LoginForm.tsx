import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/constants";
import { LoginRequest } from "../models/dto/LoginRequest";
import { AuthService } from "../services/AuthService";

// Define the structure of the form input values
type Inputs = {
    email: string;
    password: string;
};

// LoginForm component definition
export const LoginForm = () => {
    // Hook to navigate between routes
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState<string | null>(null);

    // Use the useForm hook from react-hook-form to manage form state
    const {
        register, // Function to register input fields
        handleSubmit, // Function to handle form submission
        formState: { errors }, // Object containing form validation errors
    } = useForm<Inputs>();

    // Function to handle form submission
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("Form data submitted:", data);
        setLoginError(null); // Clear any previous error message

        // Create a LoginRequest object from the form data
        const login: LoginRequest = {
            username: data.email,
            password: data.password,
        };

        // Instantiate the AuthService and call the login method
        new AuthService()
            .login(login.username, login.password)
            .then((response) => {
                console.log("Login successful", response);

              

                // Navigate to the home page after successful login
                navigate(URLS.Cuentas.LIST);
            })
            .catch((error) => {
                console.error("Login failed", error);
                setLoginError("Credenciales inválidas. Por favor, inténtelo de nuevo.");
            });
    };

    // Render the login form
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card w-100 max-w-md shadow-lg">
                <div className="card-body p-4">
                    <h2 className="card-title text-center mb-4">Iniciar sesión</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <div className="form-floating">
                            <input
                                type="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                id="email"
                                placeholder="nombre@ejemplo.com"
                                {...register("email", { required: "El email es requerido" })}
                            />
                            <label htmlFor="email">Email</label>
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email.message}</div>
                            )}
                        </div>
                        <div className="form-floating">
                            <input
                                type="password"
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                id="password"
                                placeholder="Contraseña"
                                {...register("password", { required: "La contraseña es requerida" })}
                            />
                            <label htmlFor="password">Contraseña</label>
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password.message}</div>
                            )}
                        </div>
                        {loginError && <div className="text-danger">{loginError}</div>}
                        <button type="submit" className="btn btn-primary w-100">
                            Iniciar sesión
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-muted">
                            ¿No tienes una cuenta? <a href="/register">Regístrate</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
