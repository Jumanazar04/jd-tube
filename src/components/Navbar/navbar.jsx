import { Stack } from "@mui/material";
import FullLogo from "../../assets/FullLogo_Transparent_NoBuffer.png"; 
import { colors } from "../../constants/colors";
import { Link } from "react-router";
import SearchBar from "../Search-Bar/search-bar";

const Navbar = () => {
  return (
    <Stack 
      direction={'row'} 
      justifyContent={'space-between'} 
      p={2} 
      gap={2}
      alignItems={"center"}
      position={'sticky'}
      top={0}
      sx={{position: 'sticky', zIndex: 999, background: colors.primary}}
      >
        <Link to={'/'}>
          <img src={FullLogo} alt="logo" height={30} />
        </Link>
      <SearchBar />
      <div></div>
    </Stack>
  );
}

export default Navbar;
