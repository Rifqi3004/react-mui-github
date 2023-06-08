import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

const Button = styled(MuiButton)({
    borderRadius: 50,
    height: 45,
}) as typeof MuiButton;

export default Button;
