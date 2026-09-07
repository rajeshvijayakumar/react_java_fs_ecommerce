import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Contact from "./components/Contact.jsx";
import Cart from "./components/Cart.jsx";
import Login from "./components/Login.jsx";
import About from "./components/About.jsx";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";


// This method of routes mechanism used commonly and complex applications and have better readability
const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/cart" element={<Cart />} />
  </Route>,
);

const appRouter = createBrowserRouter(routeDefinitions);




// This method routes used in the simple and small applications
// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "/home",
//         element: <Home />,
//       },
//       {
//         path: "/contact",
//         element: <Contact />,
//       },

//       {
//         path: "/cart",
//         element: <Cart />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },

//       {
//         path: "/about",
//         element: <About />,
//       },
//     ],
//   },
// ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
);
