import React from 'react';
import { AppBar, Toolbar, Container, Box } from '@mui/material';
import siteConfig from '../siteConfig';
import Logo from '../images/logo.png';

const Navbar = () => {
    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid #f0f0f0', zIndex: 1000 }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'center', py: 1 }}>
                    <Box
                        component="img"
                        src={Logo}
                        alt={siteConfig.siteName}
                        sx={{ height: 50, cursor: 'pointer' }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
