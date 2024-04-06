import React from "react";
import { Typography, Button } from "@mui/material";
import TitleText from "../ui/inputs/TitleText";

const Unauthorize = () => {
  return (
    <div>
      <TitleText variant="h4" color="error">
        Không có quyền truy cập
      </TitleText>
      <TitleText variant="h6" color="text">
        Bạn không có quyền truy cập trang này !
      </TitleText>
    </div>
  );
};

export default Unauthorize;
