import { Button, CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import { SxProps } from "@mui/material/styles";

type Props = {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  isFinished?: boolean;
  text: string;
  textAfterLoading?: string;
  sx?: SxProps;
};

export const ButtonWithLoading = ({
  disabled,
  loading,
  isFinished,
  text,
  sx,
  textAfterLoading,
}: Props) => {
  return (
    <Button
      type="submit"
      fullWidth
      sx={sx}
      disabled={disabled}
    >
      <Stack flexDirection="row">
        {loading && (
          <CircularProgress
            sx={{ color: "common.white", mt: "11px", mr: 1 }}
            size={22}
          />
        )}
        {isFinished ? textAfterLoading ?? text : text}
      </Stack>
    </Button>
  );
};
