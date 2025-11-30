import { Stack } from "@mui/material";
import { categories } from "../../constants";
import { colors } from "../../constants/colors";

const Category = ({selectedCategoryHandler, selectedCategory}) => {

  return (
    <Stack direction={'row'} justifyContent={'space-around'} sx={{overflowX: 'scroll'}}>
      {categories.map((item) => (
        <button key={item.name} className="category-btn" onClick={()=> selectedCategoryHandler(item.name)} style={{background: item.name === selectedCategory && colors.secondary, 
        color: item.name === selectedCategory && colors.primary }} >
          <span style={{color: item.name === selectedCategory ? "#ffff" : colors.secondary, marginRight: '15px'}} >{item.icon}</span>
          <span style={{opacity: 1}}>{item.name}</span>
        </button>
      ))}
    </Stack>
  );
};

export default Category;
