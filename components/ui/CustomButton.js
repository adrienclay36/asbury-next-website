import React from 'react'
import { Button } from '@mantine/core'
const CustomButton = ({ leftIcon = null, onClick = () => {}, text, loading = false, styles = null}) => {
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
}

export default CustomButton