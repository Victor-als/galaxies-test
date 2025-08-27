import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box display="flex" alignItems="center" gap={1}>
          <RocketLaunchIcon />
          <Typography variant="h6" component="div">
            GalaxyExplorer
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}