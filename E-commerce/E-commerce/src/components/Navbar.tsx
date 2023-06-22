import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Badge} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import './Navbar.css';
import Navigation from './Navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

interface NavbarProps {
  cartItems: any[];
}

const Navbar: React.FC<NavbarProps> = ({ cartItems }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const itemCount = cartItems.length;

  return (
    <AppBar position="sticky" color="transparent" style={{ backdropFilter: 'saturate(180%) blur(15px)' }}>
      <Toolbar>
        <Link className="logo" to="/" style={{ textDecoration: 'none' }}>
          <h2 className="logoText">
            <ElectricBoltIcon style={{ color: '#ff7b00' }} /> {t('global.logo')}
          </h2>
        </Link>
        <Box display="flex" alignItems="center" flexGrow={1} justifyContent="flex-end">
          <Box mx={2}>
            <Link to="/registration" style={{ textDecoration: 'none', color: '#fff' }}>
              <p className="navbarItem">
                <AccountCircleIcon />
              </p>
            </Link>
          </Box>
          <Navigation />
          <Box></Box>
          <Box mx={2}>
            <Link to="/allproducts" style={{ textDecoration: 'none', color: '#fff' }}>
              <p className="navbarItem">{t('global.shopAll')}</p>
            </Link>
          </Box>
          <Box mx={2} style={{ border: 'none' }}>
            <IconButton onClick={() => setOpen(!open)} edge="end" aria-label="shopping-cart">
              <Badge badgeContent={itemCount} color="error">
                <ShoppingCart style={{ color: 'black' }} />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
      {open && <Cart cartItems={[]} />}
    </AppBar>
  );
};

export default Navbar;
