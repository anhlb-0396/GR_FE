import React, { useState } from "react";
import {
  Avatar,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { useSocket } from "../../contexts/SocketContext";
import { useAuth } from "../../contexts/AuthContext";
import { createNewChatMessage } from "../../services/chats/chatAPI";
import { createNewNotification } from "../../services/notifications/notificationAPI";
import TitleText from "../../ui/sharedComponents/TitleText";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Chat = () => {
  const {
    currentChatUserId,
    setCurrentChatUserId,
    socket,
    setChatMessages,
    chatMessagesOfCurrentChatUserId,
    setChatMessagesOfCurrentChatUserId,
    chattingUsers,
  } = useSocket();
  const { currentUser } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  const onSubmit = (data) => {
    if (!data.comment.trim() || !currentChatUserId) return;

    const newMessage = {
      sender_id: currentUser.id,
      receiver_id: currentChatUserId,
      message: data.comment,
      createdAt: new Date().toISOString(),
      SENDER_INFO: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
      },
    };

    createNewChatMessage(newMessage)
      .then(() => {
        reset();
        socket.emit("sendChatMessage", newMessage);
        setChatMessages((prev) => [...prev, newMessage]);
        setChatMessagesOfCurrentChatUserId((prev) => [...prev, newMessage]);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        toast.error("Gửi tin nhắn thất bại");
      });

    const newNotification = {
      sender_id: currentUser.id,
      receiver_id: currentChatUserId,
      message: `💬 Bạn có tin nhắn mới từ ${currentUser.name}`,
      type: "chat",
      createdAt: new Date().toISOString(),
    };

    createNewNotification(newNotification)
      .then(() => {
        socket.emit("sendMessageNotification", newNotification);
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
        toast.error("Gửi thông báo thất bại");
      });
  };

  // Filtering function to filter users based on the search query
  const filteredUsers = chattingUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler function to update search query state
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={3}>
          <TitleText variant="h5">Lịch sử trò chuyện</TitleText>
        </Grid>

        <Grid item xs={9}>
          <TitleText variant="h5">
            {currentChatUserId
              ? `Trò chuyện vs ${
                  chattingUsers.find((user) => user.id === currentChatUserId)
                    .name
                }`
              : "Chọn một người để trò chuyện"}
          </TitleText>
        </Grid>
      </Grid>
      <Grid
        container
        component={Paper}
        sx={{ width: "100%", height: "auto", mt: 2, p: 2 }}
      >
        <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
          <List>
            <ListItem button key={currentUser.name}>
              <ListItemIcon>
                <Avatar alt={currentUser.name} src={currentUser.avatar} />
              </ListItemIcon>
              <ListItemText primary={currentUser.name}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearch} // Call handleSearch on input change
            />
          </Grid>
          <Divider />
          <List>
            {filteredUsers.map((chatUser) => (
              <ListItem
                button
                key={chatUser.id}
                onClick={() => setCurrentChatUserId(chatUser.id)}
                sx={{
                  bgcolor:
                    currentChatUserId === chatUser.id ? "#dbd8d8" : "white",
                  borderRadius: "10px",
                }}
              >
                <ListItemIcon>
                  <Avatar alt={chatUser.name} src={chatUser.avatar}></Avatar>
                </ListItemIcon>
                <ListItemText primary={chatUser.name}></ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List sx={{ height: "65vh", overflowY: "auto" }}>
            {chatMessagesOfCurrentChatUserId.map((message, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={message.message}
                  secondary={new Date(message.createdAt).toLocaleString()}
                  align={
                    message.sender_id === currentUser.id ? "right" : "left"
                  }
                  sx={{
                    borderRadius: "10px",
                    padding: "10px",
                    backgroundColor:
                      message.sender_id === currentUser.id
                        ? "#f3f3f3"
                        : "#f3e7e7",
                  }}
                ></ListItemText>
              </ListItem>
            ))}
          </List>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              style={{ padding: "10px" }}
              alignItems="center"
              justifyContent="space-around"
            >
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Bình luận"
                  variant="outlined"
                  margin="dense"
                  required
                  name="comment"
                  id="comment"
                  sx={{ mt: 3 }}
                  {...register("comment")} // Register the comment field with React Hook Form
                />
              </Grid>
              <Grid item xs={1} align="right">
                <Fab color="primary" aria-label="add" type="submit">
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
