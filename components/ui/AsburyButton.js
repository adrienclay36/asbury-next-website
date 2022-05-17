import { Button } from "@mantine/core";
const AsburyButton = ({
  leftIcon = null,
  onClick = () => {},
  text,
  loading = false,
  styles = null,
}) => {
  return (
    <Button
      type="submit"
      loading={loading}
      variant="filled"
      leftIcon={leftIcon}
      onClick={onClick}
      className={`text-white bg-emerald-900 hover:bg-emerald-800 mt-12 ${styles}`}
    >
      {text}
    </Button>
  );
};

export default AsburyButton;
