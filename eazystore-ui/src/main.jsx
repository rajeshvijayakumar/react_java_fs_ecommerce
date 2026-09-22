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
import Contact, { contactLoader } from "./components/Contact.jsx";
import Cart from "./components/Cart.jsx";
import Login, { loginAction } from "./components/Login.jsx";
import About from "./components/About.jsx";
import Home, { productsLoader } from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { contactAction } from "./components/Contact.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import ProductDetail from "./components/ProductDetail.jsx";
// import { CartProvider } from "./store/cart-context.jsx";
import { AuthProvider } from "./store/auth-context.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import Profile, {
  profileAction,
  profileLoader,
} from "./components/Profile.jsx";
import Orders, { ordersLoader } from "./components/Orders.jsx";
import AdminOrders, { adminOrdersLoader } from "./components/admin/AdminOrders.jsx";
import Messages, { messagesLoader } from "./components/admin/Messages.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import Register, { registerAction } from "./components/Register.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {OrderSuccess} from "./components/OrderSuccess.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";



const stripePromise = loadStripe(
  "pk_test_51UGXl1ERMBo0WPl4VhbjKw11z4unVKViRzhdLdkT09YrE8Q3RtdBumsUVuqC1PvNgGyR8hXmv99cLrnoP2TZejZp00PPW19P4A",
);

// This method of routes mechanism used commonly and complex applications and have better readability
const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} loader={contactLoader}/>
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/register" element={<Register />} action={registerAction} />
    <Route path="/cart" element={<Cart />} />
    <Route element={<ProtectedRoutes />}>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route
        path="/profile"
        element={<Profile />}
        loader={profileLoader}
        action={profileAction}
        shouldRevalidate={({ actionResult }) => {
          return !actionResult.success;
        }}
      />
      <Route path="/orders" element={<Orders />} loader={ordersLoader} />
      <Route
        path="/admin/orders"
        element={<AdminOrders />}
        loader={adminOrdersLoader}
      />
      <Route
        path="/admin/messages"
        element={<Messages />}
        loader={messagesLoader}
      />
    </Route>
    <Route path="/products/:productId" element={<ProductDetail />} />
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
    <Elements stripe={stripePromise}>
      {/* // If you are using the react version below 19. Use '.Provider' behind the cart context...
    <CartContext.Provider>
      <RouterProvider router={appRouter} />
    </CartContext.Provider> */}

      {/* // STEP 4 */}
      <AuthProvider>
        <Provider store={store}>
          <RouterProvider router={appRouter} />
        </Provider>
      </AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable
        pauseOnHover
        theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
        transition={Bounce}
      />
    </Elements>
  </StrictMode>,
);
