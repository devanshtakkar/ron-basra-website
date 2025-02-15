import MobileNavbar from "./MobileNavbar";
import Box from "@mui/material/Box";
export default function Navbar(){
    return(
        <nav>
            <Box sx={{display: {xs: "block", md: "none"}}}>
                <MobileNavbar />
            </Box>
        </nav>
    )
}