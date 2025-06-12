import {
  Grid,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { format } from "date-fns";
import { PopoverComponent } from "./Popover";
import { useLocation } from "react-router-dom";
import { AxiosRequestConfig } from "axios";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import api from "../Config/AxiosConfig";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWER_WIDTH } from "../constants/constants";
import useSharedStore from "../store/sharedStore";
import ColorCircle from "./ReusableComponents/ColorCircle";

interface UserInfo {
  Role: string | null | undefined;
  Club: string | null | undefined;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#F2F2F2",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Header = () => {
  const { zIsDrawerOpen, zSetIsDrawerOpen } = useSharedStore();
  const anchorRef = useRef(null);
  const theme = useTheme();
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, MMMM dd, yyyy");
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const userName = window.localStorage.getItem("userName");
  const isExtraScreenSmall = useMediaQuery(theme.breakpoints.down(550));
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(false);
  }, []);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleDrawerOpen = () => {
    zSetIsDrawerOpen(true);
  };

  const fetchUserInfo = useCallback(async () => {
    try {
      if (userName) {
        const formData = new FormData();
        if (userName !== null) {
          formData.append("username", userName);
        }
        const config: AxiosRequestConfig = {
          method: "POST",
          url: `/Auth/GetUserInfo`,
          data: formData,
        };

        await api(config)
          .then(async (response) => {
            setUserInfo(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, [, userName]);

  useEffect(() => {
    if (userName !== null) {
      fetchUserInfo();
    }
  }, [fetchUserInfo, userName]);

  const name =
    userInfo.Role === "Accounting" || userInfo.Role === "System Admin"
      ? userInfo.Role
        ? userInfo.Role
        : ""
      : (userInfo.Role ? userInfo.Role : "") +
        " - " +
        (userInfo.Club ? userInfo.Club : "");

  return (
    <Box>
      <AppBar position="fixed" open={zIsDrawerOpen}>
        {location.pathname === "/" ? (
          <Box>
            <Toolbar>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                flexGrow={1}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  disableRipple
                >
                  <Grid container alignItems="center">
                    {!isExtraScreenSmall && (
                      <Box
                        sx={{
                          marginRight: "10px",
                          textAlign: "right",
                          color: "#1C2C5A",
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: "15px",
                            fontFamily: "Inter",
                            fontWeight: "900",
                          }}
                        >
                          {name}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontSize: "11px",
                            fontStyle: "italic",
                            fontFamily: "Inter",
                            fontWeight: "900",
                          }}
                        >
                          {formattedDate}
                        </Typography>
                      </Box>
                    )}
                    <Avatar
                      onClick={handleOpenPopover}
                      ref={anchorRef}
                      sx={{
                        backgroundColor: "#1C3766",
                        textTransform: "uppercase",
                        color: "white",
                        marginLeft: "10px",
                        boxShadow: "0px 7px 5px -1px rgba(0,0,0,0.5)",
                      }}
                    >
                      <PersonRoundedIcon />
                    </Avatar>
                  </Grid>
                </IconButton>
                <PopoverComponent
                  anchorEl={anchorRef.current}
                  open={openPopover}
                  onClose={handleClosePopover}
                  isExtraScreenSmall={isExtraScreenSmall}
                  role={userInfo?.Role}
                  location={userInfo?.Club}
                  date={formattedDate}
                />
              </Box>
            </Toolbar>
          </Box>
        ) : (
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                  backgroundColor: "black", // Example: light gray background
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker background on hover
                  },
                },
                zIsDrawerOpen && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>

            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              flexGrow={1}
            >
              <ColorCircle color={`red`} marginTop={1} />
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                disableRipple
              >
                <Grid container alignItems="center">
                  {!isExtraScreenSmall && (
                    <Box
                      sx={{
                        marginRight: "10px",
                        textAlign: "right",
                        color: "#1C2C5A",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: "15px",
                          fontFamily: "Inter",
                          fontWeight: "900",
                        }}
                      >
                        {name}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: "11px",
                          fontStyle: "italic",
                          fontFamily: "Inter",
                          fontWeight: "900",
                        }}
                      >
                        {formattedDate}
                      </Typography>
                    </Box>
                  )}
                  <Avatar
                    onClick={handleOpenPopover}
                    ref={anchorRef}
                    sx={{
                      backgroundColor: "#1C3766",
                      textTransform: "uppercase",
                      color: "white",
                      marginLeft: "10px",
                      boxShadow: "0px 7px 5px -1px rgba(0,0,0,0.5)",
                    }}
                  >
                    <PersonRoundedIcon />
                  </Avatar>
                </Grid>
              </IconButton>
              <PopoverComponent
                anchorEl={anchorRef.current}
                open={openPopover}
                onClose={handleClosePopover}
                isExtraScreenSmall={isExtraScreenSmall}
                role={userInfo?.Role}
                location={userInfo?.Club}
                date={formattedDate}
              />
            </Box>
          </Toolbar>
        )}
      </AppBar>
    </Box>
  );
};

export default Header;
