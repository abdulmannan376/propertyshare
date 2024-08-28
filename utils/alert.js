// utils/alerts.js
import Swal from "sweetalert2";

// Success Alert Function
export const successAlert = (title = "Success", message = "Operation completed successfully") => {
  Swal.fire({
    title: title,
    text: message,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true,
    toast: true,
  });
};

// Error Alert Function
export const errorAlert = (title = "Error", message = "Something went wrong") => {
  Swal.fire({
    title: title,
    text: message,
    icon: "error",
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true,
    toast: true,
  });
};
