import React, { useState } from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CompanyList from "./CompanyList";

function CompanyPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ width: "50%", mb: 2 }}>
        <TextField
          fullWidth
          size="medium"
          label="Tìm kiếm doanh nghiệp"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <CompanyList ratingDisplay={false} searchTerm={searchTerm} />
    </Box>
  );
}

export default CompanyPage;
