import { TextField } from "@mui/material";

const InputField = ({ name, label, value, onChange }) => {
  return (
    <>
      <TextField
        margin="dense"
        name={name}
        label={label}
        type="text"
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
          "&:hover .MuiInputLabel-root": {
            color: "black",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "black",
          },
        }}
      />
    </>
  );
};

export default InputField;
