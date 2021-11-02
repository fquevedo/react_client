
import { styled } from '@mui/material/styles';
import { Badge, Avatar } from '@mui/material';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 0px black`,
    '&::after': {
      position: '',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '85%',
      borderRadius: '50%',
      animation: 'ripple 2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2)',
      opacity: 0,
    },
  },
}));


export default function styleBadge(props){

    return(

        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            variant="dot"
        >
        <Avatar alt={props.alt} src={props.src} />
        </StyledBadge>


    );
}
