import { IconButton, Paper, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import { colors } from "../../constants/colors";
import { useState } from "react";
import { useNavigate } from "react-router";

function SearchBar() {
    const [value, setValue] = useState("");
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        console.log(value);
        navigate(`/search/${value}`);
    }


  return (
    <Paper
      component="form"
        onSubmit={handleSubmit}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        border: `1px solid ${colors.secondary}`,
        borderRadius: 2 ,
        boxShadow: "none",
        width: {
          xs: "100%",   // mobil: to‘liq kenglik
          sm: "280px",  // kichik ekran
          md: "350px",  // o‘rta ekran
          lg: "420px",  // katta ekran
        },
        height: { xs: 40, sm: 45, md: 48 },
      }}
    >
      <InputBase
        placeholder="Search..."
        sx={{
          ml: 1,
          flex: 1,
          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ "aria-label": "search" }}
      />

      <IconButton
        type="submit"
        sx={{
          p: "8px",
          color: colors.secondary,
          "&:hover": { opacity: 0.7 },
        }}
      >
        <Search />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
