import React, { useState } from "react";
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
  useTheme,
  Chip,
  Pagination,
  Button,
} from "@mui/material";
import {
  ChatBubble,
  Delete,
  HowToReg,
  Notifications,
  Cancel,
  Send as SendIcon,
} from "@mui/icons-material";
import { useSocket } from "../contexts/SocketContext";
import TitleText from "../ui/sharedComponents/TitleText";
import { changeDateTimeFormat } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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

const routingToDetail = (notification, role) => {
  switch (notification.type) {
    case "chat":
      return role === "agent" ? "/agent/chats" : "/user/chats";
    default:
      return role === "agent" ? "/agent/applies" : "/user/applies";
  }
};

const NotificationPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { notifications, setCurrentChatUserId } = useSocket();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClickDetail = (notification, role) => {
    if (notification.type === "chat") {
      setCurrentChatUserId(notification.sender_id);
    }
    navigate(routingToDetail(notification, role));
  };

  const paginatedNotifications = notifications.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <TitleText>Tất cả thông báo ({notifications.length})</TitleText>
      <Card sx={{ boxShadow: theme.shadows[3], mt: 2 }}>
        <CardContent>
          <List>
            {paginatedNotifications.map((notification) => (
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
                    <Avatar>
                      {displayNotificationIcon(notification.type)}
                    </Avatar>
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
                    aria-label="detail"
                    sx={{ color: theme.palette.primary.main }}
                    size="small"
                    onClick={() =>
                      handleClickDetail(notification, currentUser.role)
                    }
                  >
                    <SendIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{ color: theme.palette.error.main }}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
          <Pagination
            count={Math.ceil(notifications.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 2 }}
            color="primary"
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default NotificationPage;
