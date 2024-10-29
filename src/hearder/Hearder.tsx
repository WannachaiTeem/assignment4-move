import { AppBar, Toolbar, IconButton, Typography,} from "@mui/material";
import { Box } from "@mui/system";


function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OMDB
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;