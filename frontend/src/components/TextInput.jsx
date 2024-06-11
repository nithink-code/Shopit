import TextField from "@mui/material/TextField";

export default function TextInput({
  labelTagText,
  labelText,
  nameText,
  item,
  setFormData2,
  errors,
  typeValue,
}) {
  return (
    <div className="form-elements">
      <label htmlFor="name" className="label">
        {labelTagText}
      </label>
      <TextField
        label={typeValue !== "file" ? labelText : null}
        id="outlined-size-small"
        size="small"
        name={nameText}
        type={typeValue}
        multiline={
          typeValue === "number" ||
          typeValue === "password" ||
          nameText === "username" ||
          nameText === "email" ||
          typeValue === "file"
            ? false
            : true
        }
        fullWidth
        value={typeValue === "file" ? undefined : item}
        onChange={setFormData2}
        error={errors.valid}
        helperText={errors.errMsg}
      />
    </div>
  );
}
