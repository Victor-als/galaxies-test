import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export function Header() {
  return (
    <AppBar 
     sx={{
    bgcolor: "rgba(30, 30, 30, 0.7)", 
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  }}
    position="static" color="primary">
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