import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

export default function LoadButtton({ processing }) {
  return (
    <>
      {!processing ? (
        <LoadingButton size="small" loading={true} variant="contained" disabled>
          <span>disabled</span>
        </LoadingButton>
      ) : (
        <LoadingButton
          size="small"
          endIcon={<SendIcon />}
          loading={true}
          loadingPosition="end"
          variant="contained"
          disabled
        >
          <span>Processing</span>
        </LoadingButton>
      )}
    </>
  );
}
