import { Button } from "@mantine/core";


interface Props {
  leftIcon?: React.ReactNode;
  onClick?: () => any;
  text: string;
  loading?: boolean;
  styles?: string;
  variant?: "gradient" | "filled" | "outline" | "light" | "white" | "default" | "subtle" | undefined;
  margin?: string;
  disabled?: boolean;
  color?: string;
  hoverColor?: string;
}
const AsburyButton: React.FC<Props> = ({
  leftIcon = null,
  onClick = () => {},
  text,
  loading = false,
  styles = null,
  variant = 'filled',
  margin = 'm-0',
  disabled = false,
  color = 'bg-emerald-900',
  hoverColor = 'hover:bg-emerald-800'
}) => {
  const filledClasses = `text-white ${color} ${hoverColor} ${margin} ${styles}`
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
