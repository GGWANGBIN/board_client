import * as React from "react";

import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {

  const goSearch = () => {
  alert("dd")
  }


  return (
      <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '20ch' },
          }}
          noValidate
          autoComplete="off"
      >
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <NativeSelect
              defaultValue={"none"}
              inputProps={{
                name: 'category',
                id: 'uncontrolled-native',
              }}
          >
            <option value={"none"}>통합검색</option>
            <option value={"title"}>글 제목</option>
            <option value={"writer"}>작성자</option>
          </NativeSelect>
        </FormControl>
        <TextField
            id="standard-search"
            type="search"
            variant="standard"
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon onClick={(e)=>{goSearch()}}/>
        </IconButton>
      </Box>
  );
}

export default SearchBar