import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import useSharedStore from "../store/sharedStore";
import { Avatar, Grid, Menu, MenuItem } from "@mui/material";
import { DRAWER_WIDTH, skuNavLinks } from "../constants/constants";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import FolderIcon from "@mui/icons-material/Folder";
import InventoryIcon from "@mui/icons-material/Inventory";
import QuizIcon from "@mui/icons-material/Quiz";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Assessment as AssessmentIcon,
  Summarize as SummarizeIcon,
} from "@mui/icons-material";
import Header from "../Components/Header";
import { z } from "zod";

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#F2F2F2",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#F2F2F2",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const Layout = () => {
  const theme = useTheme();
  const sideNavWidth = 250;
  const { zIsDrawerOpen, zSetIsDrawerOpen, zUserEmailAdd } = useSharedStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const getRoleId = window.localStorage.getItem("roleId");

  let roleId = 0;
  if (getRoleId !== null) {
    roleId = parseInt(getRoleId, 10);
  }

  const handleDrawerClose = () => {
    zSetIsDrawerOpen(false);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here, e.g., clearing tokens, redirecting, etc.
    console.log("User logged out!");
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header />
        <Drawer variant="permanent" open={zIsDrawerOpen}>
          <DrawerHeader>
            <Grid
              container
              spacing={8}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                {zIsDrawerOpen && (
                  <Box
                    sx={{
                      textAlign: "center",
                      color: "#1C2C5A",
                      marginTop: "10px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "70px",
                        fontFamily: "Arial",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        marginLeft: "80px",
                      }}
                    >
                      S&R
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        marginTop: "-19px",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        marginLeft: "80px",
                      }}
                    >
                      Membership Shopping
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        marginTop: "10px",
                        fontSize: "25px",
                        fontFamily: "Inter",
                        fontWeight: "900",
                        marginLeft: "80px",
                      }}
                    >
                      Order Web Form
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {skuNavLinks.map((row, index) => {
              if (row.role.includes(roleId)) {
                return (
                  <ListItem key={row.label} disablePadding>
                    <ListItemButton
                      key={`transactionsNavLink-${index}`}
                      component={NavLink}
                      to={row.href}
                      className="link"
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          marginRight: zIsDrawerOpen ? "8px" : "28px",
                        }}
                      >
                        {index === 0 ? (
                          <HomeIcon />
                        ) : index === 1 ? (
                          <NoteAltIcon />
                        ) : index === 2 ? (
                          <FolderIcon />
                        ) : index === 3 ? (
                          <InventoryIcon />
                        ) : index === 4 ? (
                          <AssessmentIcon />
                        ) : index === 5 ? (
                          <SummarizeIcon />
                        ) : index === 6 ? (
                          <QuizIcon />
                        ) : index === 7 ? (
                          <HowToRegIcon />
                        ) : (
                          <></>
                        )}
                      </ListItemIcon>
                      <ListItemText primary={row.label} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
          </List>
          <Divider />
          <Divider />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              textAlign: "center",
              pb: 2, // padding bottom
            }}
          >
            <IconButton onClick={handleAvatarClick}>
              <Avatar
                alt="User Avatar"
                src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png" // Replace with your image URL
                sx={{
                  width: 56,
                  height: 56,
                  margin: "0 auto",
                }}
              />
            </IconButton>
            {zIsDrawerOpen && (
              <Typography variant="caption" sx={{ mt: 1 }}>
                {zUserEmailAdd}
              </Typography>
            )}
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            //comment position to bottom if you want to remove the border radius and boxshadow (you need to comment flexGrow and p if you want to set to absolute)
            position: "absolute",
            top: "70px",
            left: zIsDrawerOpen ? `${sideNavWidth}px` : "100px",
            transition: "left 0.3s ease",
            right: "10px",
            bottom: "10px",
            //will maximize the space of the main content
            // flexGrow: 1,
            // p: 5,
            overflowX: "hidden",
            backgroundColor: "#FFFFFF",
            borderRadius: "25px",
            boxShadow:
              "inset 6px 9px 8px -1px rgba(0,0,0,0.1), inset -6px 0px 8px -1px rgba(0,0,0,0.1)",
          }}
        >
          <DrawerHeader />
          <Outlet />
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {/* <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} />
            Logout
          </MenuItem> */}
        </Menu>
      </Box>
    </>
    // <Box style={{ display: "flex" }}>
    //   <SideNav width={sideNavWidth} />
    //   <Box
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       transition: "margin-left 0.3s ease",
    //     }}
    //   >
    //     <Header sideNavWidth={sideNavWidth} />
    //     <Box
    //       sx={{
    //         position: "absolute",
    //         top: "70px",
    //         left: "250px",
    //         right: "10px",
    //         bottom: "10px",
    //         overflowX: "hidden",
    //         overflowY: "auto",
    //         marginTop: "10px",
    //         padding: "0 5px",
    //         transition: "left 0.3s ease",
    //         backgroundColor: "#FFFFFF",
    //         borderRadius: "25px",
    //         boxShadow:
    //           "inset 6px 9px 8px -1px rgba(0,0,0,0.1), inset -6px 0px 8px -1px rgba(0,0,0,0.1)",
    //       }}
    //     >
    //       <Outlet />
    //     </Box>
    //   </Box>
    // </Box>
  );
};

export default Layout;
