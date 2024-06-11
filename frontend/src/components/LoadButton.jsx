import LoadingButton from "@mui/lab/LoadingButton";

export default function LoadButtton() {
  return (
    <LoadingButton size="small" loading={true} variant="contained" disabled>
      <span>disabled</span>
    </LoadingButton>
  );
}
