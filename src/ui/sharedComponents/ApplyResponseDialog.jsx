import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from "@mui/material";

import TitleText from "../../ui/sharedComponents/TitleText";

const ApplyResponseDialog = ({ open, onClose, responseData }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>
        <TitleText variant="h5">Thông báo phản hồi từ HR</TitleText>
      </DialogTitle>
      <DialogContent>
        <Grid item>
          <Typography
            dangerouslySetInnerHTML={{ __html: responseData }}
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 4,
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: "5px",
            }}
          ></Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyResponseDialog;
