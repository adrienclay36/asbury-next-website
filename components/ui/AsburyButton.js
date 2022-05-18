import { Button } from "@mantine/core";
const AsburyButton = ({
  leftIcon = null,
  onClick = () => {},
  text,
  loading = false,
  styles = null,
  variant = 'filled',
  margin = 'mt-12'
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
    >
      {text}
    </Button>
  );
};

export default AsburyButton;
