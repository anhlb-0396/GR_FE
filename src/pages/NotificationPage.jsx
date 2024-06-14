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
} from "@mui/material";
import {
  Notifications,
  Delete,
  Email,
  Update,
  Build,
} from "@mui/icons-material";

const notifications = [
  {
    id: 1,
    title: "New Message",
    description: "You have received a new message from John.",
    timestamp: "2 hours ago",
    icon: <Email />,
  },
  {
    id: 2,
    title: "Update Available",
    description: "A new update is available for your software.",
    timestamp: "1 day ago",
    icon: <Update />,
  },
  {
    id: 3,
    title: "Server Maintenance",
    description: "Scheduled maintenance will occur at 2 AM.",
    timestamp: "3 days ago",
    icon: <Build />,
  },
];

const NotificationPage = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Notifications
      </Typography>
      <Card sx={{ boxShadow: theme.shadows[3] }}>
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
                      <Avatar>{notification.icon}</Avatar>
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
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ marginRight: 1 }}
                        >
                          {notification.timestamp}
                        </Typography>
                        {notification.description}
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
