import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import Box from "@mui/material/Box";

export default function Navbar() {
    return (
        <nav>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
                <MobileNavbar />
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
                <DesktopNavbar />
            </Box>
        </nav>
    )
}