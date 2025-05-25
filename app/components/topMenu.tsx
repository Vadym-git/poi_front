import {
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { checkAuth, logout } from "~/web_api/apiAxios";
import { useAuth } from "../contexts/authContext";

export default function TopMenu() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // Placeholder for future dropdown handling
  const handleChange = (event: SelectChangeEvent) => {};

  // Check if the user is authenticated on component mount
  useEffect(() => {
    checkAuth()
      .then((res) => {
        setIsLoggedIn(res.isAuthenticated);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: "10px 0 0 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo link to home */}
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          <img src="/poi_logo.png" width={100} />
        </NavLink>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Divider orientation="vertical" flexItem />

          {/* Show dropdown only if user is logged in */}
          {isLoggedIn ? (
            <FormControl sx={{ minWidth: 120, width: 200 }}>
              <InputLabel>Add Data</InputLabel>
              <Select value={""} label="Add Value" onChange={handleChange}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <NavLink to="/add-category">
                  <MenuItem>Add Category</MenuItem>
                </NavLink>
                <NavLink to="/add-placemark">
                  <MenuItem>Add Place Mark</MenuItem>
                </NavLink>
              </Select>
            </FormControl>
          ) : (
            ""
          )}

          {/* Logout or Login link based on auth status */}
          {isLoggedIn ? (
            <span
              onClick={async () => {
                await logout(); // call backend logout
                setIsLoggedIn(false); // update auth state
              }}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "black",
              }}
            >
              Logout
            </span>
          ) : (
            <NavLink
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              Login
            </NavLink>
          )}
        </Box>
      </Box>
    </>
  );
}
