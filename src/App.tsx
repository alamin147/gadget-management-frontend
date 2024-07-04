import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import "./App.css";
import { logout } from "./redux/features/auth/authSlice";
import { IoMenu } from "react-icons/io5";

const App = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const { user, imgUrl }: any = useAppSelector((state) => state.auth);
  // console.log("inside appp", user, imgUrl);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden text-4xl ms-3 mt-2"
        >
          <IoMenu />
        </label>
        <div className="w-full">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex items-center">
          {/* Sidebar content here */}
          <div className="avatar my-8 online">
            <div className="w-24 rounded-full ring ring-bg-primary ring-offset-base-100 ring-offset-1">
              <img src={imgUrl} title={user?.username} />
            </div>
          </div>
          <li className="mb-3">
            <p>
              Hello, <span className="text-info">{user?.username}</span>
            </p>
          </li>
          <li className="mb-3">
            <NavLink to="/">Products</NavLink>
          </li>
          <li className="mb-3">
            <NavLink to="/addproduct">Add Product</NavLink>
          </li>
          <li className="mb-3">
            <NavLink to="/inventory">Inventory</NavLink>
          </li>
          <li className="mb-3">
            <NavLink to="/checkout">Checkout</NavLink>
          </li>
          <li className="mb-3">
            <NavLink to="/salesHistory">Sales History</NavLink>
          </li>
          {!user && (
            <li className="mb-3">
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
          {!user && (
            <li className="mb-2">
              <NavLink to="/register">Register</NavLink>
            </li>
          )}
          <li
            className="cursor-pointer hover:bg-[#272D33] py-2 px-4 hover:rounded-md"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
