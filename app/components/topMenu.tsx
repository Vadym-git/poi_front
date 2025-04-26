import { Box, TextField, InputAdornment } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router";

export default function TopMenu() {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          margin: "10px 0 0 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          slotProps={{
            input: {
              placeholder: "Search",
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            },
          }}
          variant="outlined"
        />
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          <img src="/poi_logo.png" width={100} />
        </NavLink>

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1
            }}
        >
          <NavLink to="" style={{ textDecoration: "none", color: "black" }}>
            Statistic
          </NavLink>
          <NavLink to="" style={{ textDecoration: "none", color: "black" }}>
            Login
          </NavLink>
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ margin: "4px 0" }} />
    </Box>
  );
}
