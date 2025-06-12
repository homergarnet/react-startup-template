import Swal from "sweetalert2";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useSwal = () => {
  // Basic alert
  const showAlert = async (
    title: string,
    text: string,
    icon: "success" | "error" | "warning" | "info"
  ) => {
    return await Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
      didOpen: () => {
        const swalContainer = document.querySelector(
          ".swal2-container"
        ) as HTMLElement;
        swalContainer?.focus(); // Ensure it's an HTMLElement before calling focus()
      },
    });
  };

  // Confirmation alert
  const showConfirm = async (
    title: string,
    text: string,
    confirmText = "Yes",
    cancelText = "No"
  ) => {
    return await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      didOpen: () => {
        const swalContainer = document.querySelector(
          ".swal2-container"
        ) as HTMLElement;
        swalContainer?.focus(); // Ensure it's an HTMLElement before calling focus()
      },
    });
  };

  // SweetAlert toast notification
  const showSwalToast = (
    title: string,
    icon: "success" | "error" | "warning" | "info"
  ) => {
    Swal.fire({
      title,
      icon,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        const swalContainer = document.querySelector(
          ".swal2-container"
        ) as HTMLElement;
        swalContainer?.focus(); // Ensure it's an HTMLElement before calling focus()
      },
    });
  };

  // React-Toastify notification
  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  return { showAlert, showConfirm, showSwalToast, showToast };
};

export default useSwal;
