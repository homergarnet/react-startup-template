import React, { useContext, useState } from "react";
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import IUserLogin from "../pages/_Auth/interface/IUserLogin";
import { useNavigate } from "react-router-dom";
import api from "../config/AxiosConfig";
import useLoginContext from "../store/Login/useLoginContext";
import useSharedStore from "../store/sharedStore";

interface PaperProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  open: boolean;
  isExtraScreenSmall: boolean;
  location: string | null | undefined;
  role: string | null | undefined;
  date: string;
}

export const PopoverComponent: React.FC<PaperProps> = ({
  anchorEl,
  onClose,
  open,
  isExtraScreenSmall,
  location,
  role,
  date,
}) => {
  const { zSetIsAuthenticated } = useLoginContext();
  const { zUserEmailAdd } = useSharedStore();
  const userName = window.localStorage.getItem("userName");
  const navigate = useNavigate();

  const [login] = useState<IUserLogin>({
    Username: userName || "",
    Password: "",
  });

  const handleSignOut = () => {
    zSetIsAuthenticated(false);
    window.localStorage.removeItem("userEmailAdd");
    window.localStorage.removeItem("roleId");
    window.localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Account
        </Typography>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "15px",
            marginRight: "10px",
            textAlign: "left",
          }}
        >
          {zUserEmailAdd != null ? zUserEmailAdd : ""}
        </Typography>
        {isExtraScreenSmall ? (
          <Box
            sx={{
              marginRight: "10px",
              textAlign: "left",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: "13px",
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              {role} - {location}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: "11px",
                fontFamily: "Inter",
                fontWeight: "bold",
                marginTop: "3px",
              }}
            >
              {date}
            </Typography>
          </Box>
        ) : null}
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem
          onClick={handleSignOut}
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#1C2C5A",
            borderRadius: "10px",
            fontFamily: "Inter",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#15294D",
              borderColor: "#15294D",
            },
            textAlign: "center",
            display: "flex",
            alignItems: "center", // Center the content vertically
            justifyContent: "center", // Center the content horizontally
          }}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
