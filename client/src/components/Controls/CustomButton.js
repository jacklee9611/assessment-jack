import React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const CustomButton = (props) => {
  const {
    label,
    color,
    variant,
    size,
    width,
    onClick,
    disabled,
    bgcolor,
    hoverBgColor,
    fontSize,
    ...other
  } = props;

  // Create a custom theme with the desired disabled button color
  const theme = createTheme({
    palette: {
      primary: {
        main: "#202020",
      },
      secondary: {
        main: "#827eaf",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            "&.Mui-disabled": {
              backgroundColor: "#b1b1b1 !important",
              color: "#fff",
            },
          },
          label: {
            color: (props) =>
              props.color === "secondary"
                ? "#fff"
                : theme.palette.primary.contrastText,
          },
          containedPrimary: {
            "&:hover": {
              backgroundColor: "#303030",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant={variant}
        color={color}
        size={size}
        onClick={onClick}
        disabled={disabled}
        {...other}
      >
        {label}
      </Button>
    </ThemeProvider>
  );
};

export default CustomButton;
