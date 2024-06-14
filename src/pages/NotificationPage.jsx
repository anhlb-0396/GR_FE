import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Badge,
  useTheme,
  Chip,
} from "@mui/material";
import {
  ChatBubble,
  Delete,
  HowToReg,
  Notifications,
  Cancel,
} from "@mui/icons-material";
import { useSocket } from "../contexts/SocketContext";
import TitleText from "../ui/sharedComponents/TitleText";
import { changeDateTimeFormat } from "../utils/helpers";

const displayNotificationIcon = (notificationType) => {
  switch (notificationType) {
    case "chat":
      return <ChatBubble />;
    case "job_reject":
      return <Cancel />;
    case "job_accept":
      return <HowToReg />;
    default:
      return <Notifications />;
  }
};

const NotificationPage = () => {
  const theme = useTheme();
  const { notifications } = useSocket();

  console.log(notifications);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <TitleText>Tất cả thông báo</TitleText>
      <Card sx={{ boxShadow: theme.shadows[3], mt: 2 }}>
        <CardContent>
          <List>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Badge badgeContent={notification.id} color="primary">
                      <Avatar>
                        {displayNotificationIcon(notification.type)}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box component="span" sx={{ fontWeight: "bold" }}>
                        {notification.title}
                      </Box>
                    }
                    secondary={
                      <Box component="span" sx={{ display: "block" }}>
                        <Chip
                          label={changeDateTimeFormat(notification.createdAt)}
                          size="small"
                          variant="rounded"
                          color="primary"
                        ></Chip>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mt={1}
                        >
                          {notification.message}
                        </Typography>
                      </Box>
                    }
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{ color: theme.palette.error.main }}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NotificationPage;
