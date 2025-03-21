import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

export default function DropDownProfile() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    sessionStorage.removeItem('access_token');
    navigate('/');
}

const goDashboard = () => {
    navigate('/userdashboard');
}

  return (
    <div >
      <Button
        id="basic-button"
        size='small'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Mi cuenta
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}ef
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={goDashboard} className='gap-3'>
            <img src="/icons/calendar-check.svg" alt="calendarIcon" className='w-5' />
            Mis citas
        </MenuItem>
        <MenuItem onClick={logout} className='gap-3'>
            <img src="/icons/logout.svg" alt="contactIcon" className='w-5' />
            Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
