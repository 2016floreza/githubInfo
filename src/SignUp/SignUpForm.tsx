import React from "react";
import TextField from "@material-ui/core/TextField";

interface IProps {
  token: String;
  setToken: React.Dispatch<React.SetStateAction<String>>;
}

const SignUpForm: React.FC<IProps> = ({ token, setToken }: IProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  return (
    <React.Fragment>
      <TextField
        autoFocus
        type="text"
        onChange={handleChange}
        value={token}
        fullWidth
        style={{ padding: "8px 0px 16px 0px" }}
      />
    </React.Fragment>
  );
};

export default SignUpForm;
