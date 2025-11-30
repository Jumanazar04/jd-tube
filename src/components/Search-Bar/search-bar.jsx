import { IconButton, Paper } from "@mui/material";
import { Search} from '@mui/icons-material'
import { colors } from "../../constants/colors";


function SearchBar (){


    return <Paper component={'form'} sx={{border: `1px solid ${colors.secondary}`, pl: 2, boxShadow: 'none'  }}>
        <input placeholder="Search..." style={{border: 'none', width: '350px', outline: 'none'}}/>
        <IconButton>
            <Search />
        </IconButton>
    </Paper>
}

export default SearchBar