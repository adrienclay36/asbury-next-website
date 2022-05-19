import { Button } from "@mantine/core";
const AsburyButton = ({
  leftIcon = null,
  onClick = () => {},
  text,
  loading = false,
  styles = null,
  variant = 'filled',
  margin = 'm-0',
  disabled = false,
}) => {
  const filledClasses = `text-white bg-emerald-900 hover:bg-emerald-800 ${margin} ${styles}`
  return (
    <Button
      type="submit"
      loading={loading}
      variant={variant}
      leftIcon={leftIcon}
      onClick={onClick}
      className={filledClasses}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default AsburyButton;
