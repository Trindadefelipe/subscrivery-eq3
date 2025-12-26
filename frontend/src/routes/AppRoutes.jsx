import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import Welcome from "../pages/Welcome/Welcome"
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Plans from "../pages/Plans/Plans";
import Layout from "../components/Layout/Layout";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Category from "../pages/Category/Category";
import Product from "../pages/Product/Product";
import Account from "../pages/Account/Account";
import { CheckoutRoutes } from './CheckoutRoutes';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Navigate to="/Welcome" />} />


                <Route path="/Welcome" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Home />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/conta"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Account />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/categoria/:id"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Category />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/produto/:id"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Product />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/checkout/*"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <CheckoutRoutes />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/plans"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Plans />
                            </Layout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}