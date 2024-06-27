import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

export const Loader = {
    commonLoader() {
        return (
            <Box className="d-flex align-items-center justify-content-center common-loader">
                <CircularProgress />
            </Box>
        );
    },
};


export const ErrorMessages = {
    error: (message) =>
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }),
    success: (message) =>
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }),
    info: (message) =>
      toast.info(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }),
  };







export const pathFile = {
    // dashboard: "DashBoard",
  
};
