import { createContext, useContext, useReducer } from "react";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { address } from "faker/lib/locales/az";

const UserCVContext = createContext();

const initialState = {
  name: "",
  address: "",
  avatar: "https://mui.com/static/images/avatar/1.jpg",
  contacts: [
    { icon: PhoneIcon, label: "Phone", value: "" },
    {
      icon: EmailIcon,
      label: "Email",
      value: "",
    },
    { icon: HomeIcon, label: "Address", value: "" },
  ],
  socialMedia: [
    { icon: FacebookIcon, label: "Facebook", link: "" },
    { icon: InstagramIcon, label: "Instagram", link: "" },
    { icon: LinkedInIcon, label: "LinkedIn", link: "" },
    { icon: TwitterIcon, label: "Twitter", link: "" },
  ],
  skills: [],
  education: [],
  experience: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_INFO":
      return {
        ...state,
        address: action.payload.address,
        name: action.payload.name,
        contacts: [...action.payload.contacts],
      };

    case "ADD_SKILLS":
      return {
        ...state,
        skills: [...action.payload],
      };
    case "ADD_EDUCATION":
      return {
        ...state,
        education: [...action.payload],
      };
    case "ADD_EXPERIENCES":
      return {
        ...state,
        experience: [...action.payload],
      };
    default:
      return state;
  }
}

function UserCVProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserCVContext.Provider value={{ state, dispatch }}>
      {children}
    </UserCVContext.Provider>
  );
}

function useUserCV() {
  const context = useContext(UserCVContext);
  if (!context) {
    throw new Error("useUserCV must be used within a UserCVProvider");
  }
  return context;
}

export { UserCVProvider, useUserCV };
