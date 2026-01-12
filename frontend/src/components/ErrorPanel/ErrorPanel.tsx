import { Box, Button, Typography } from "@mui/material";
import { type FC, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";

interface ErrorPanelProps {
  error: string;
  loading: boolean;
  extraButtons?: React.ReactNode[];
}

const ErrorPanel: FC<PropsWithChildren<ErrorPanelProps>> = ({
  error,
  loading,
  extraButtons,
  children,
}) => {
  const navigate = useNavigate();

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography variant="h3">{error}</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Button variant="contained" onClick={() => navigate(0)}>
            Reload
          </Button>
          {extraButtons?.map((button) => button)}
        </Box>
      </Box>
    );
  } else if (loading) {
    return (
      <Typography
        sx={{
          width: "100%",
          height: "100%",
          textAlign: "center",
          alignContent: "center",
        }}
        variant="h3"
      >
        Loading...
      </Typography>
    );
  } else {
    return children;
  }
};

export default ErrorPanel;
