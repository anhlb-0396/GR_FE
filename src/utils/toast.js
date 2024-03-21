import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function showToast(msg = "Lưu thông tin thành công", toast) {
  toast.success(msg, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000, // Close the toast after 2000 milliseconds (2 seconds)
  });
}

export default showToast;
