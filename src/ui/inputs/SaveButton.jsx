import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

function SaveButton({ onClick }) {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ color: "white", mr: "20px" }}
      startIcon={<SaveIcon />}
      type="submit"
      onClick={onClick}
    >
      Lưu
    </Button>
  );
}

export default SaveButton;
