import React, { useState, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillBasketFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { userAuthContext } from "../context/UserAuthContext";
import { cartContext } from "../context/CartContext";
import "./styles/navbar.scss";

export const Navbar = () => {
  const [showSmallMenu, setShowSmallMenu] = useState(false);
  const { user, logOut } = useContext(userAuthContext);
  const { totalQty } = useContext(cartContext);
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogOut = (e) => {
    e.preventDefault(e);
    logOut();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <nav>
      <div className="logo">
        <span className="icon circle-1"></span>
        <span className="icon circle-2"></span>
        <span className="icon circle-3"></span>
      </div>
      <ul id="js-menu" className={`${showSmallMenu ? "active" : ""}`}>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/addproduct")}>Products</li>
        <li>
          <Badge badgeContent={totalQty} color="primary">
            <BsFillBasketFill
              size={20}
              onClick={() => navigate("/cartproducts")}
            />
          </Badge>
        </li>
        <li>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <FaUserCircle size={20} />
          </Button>
          <Menu
            id="basic-menu"
            className="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem disabled={true}>Welcome {user.displayName}</MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={(e) => handleLogOut(e)}>
              {user ? "Logout" : "Login"}
            </MenuItem>
          </Menu>
        </li>
      </ul>
      <span
        className="nav-toggle"
        onClick={() => setShowSmallMenu((prev) => !prev)}
        id="js-nav-toggle"
      >
        <GiHamburgerMenu />
      </span>
    </nav>
  );
};
