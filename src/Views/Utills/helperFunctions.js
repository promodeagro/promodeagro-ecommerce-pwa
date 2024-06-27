import { Box, CircularProgress } from "@mui/material";
export const Loader = {
    commonLoader() {
        return (
            <Box className="d-flex align-items-center justify-content-center common-loader">
                <CircularProgress />
            </Box>
        );
    },
};

export const pathFile = {
    // dashboard: "DashBoard",
  
};
