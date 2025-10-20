import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/loginSlice";

function Logout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);

  if (!user) return null; // hide if not logged in

  return (
    <button onClick={() => dispatch(logout())}>
      Logout ({user.name})
    </button>
  );
}

export default Logout;
