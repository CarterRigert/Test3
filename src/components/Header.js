import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import siteConfig from '../siteConfig';
import heroImage from '../images/hero.jpg';

const Header = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!imageLoaded) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress sx={{ color: siteConfig.primaryColor }} />
                <Box
                    component="img"
                    src={heroImage}
                    alt=""
                    onLoad={() => setImageLoaded(true)}
                    sx={{ display: 'none' }}
                />
            </Box>
        );
    }

    return (
        <Box
            component="header"
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '50vh', sm: '60vh', md: '70vh' },
                overflow: 'hidden',
            }}
        >
            <Box
                component="img"
                src={heroImage}
                alt={siteConfig.siteName}
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    textAlign: 'center',
                    width: '90%',
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        mb: 3,
                        fontSize: { xs: 32, sm: 40 },
                        fontFamily: '"Annie Use Your Telescope", cursive',
                    }}
                >
                    {siteConfig.tagline}
                </Typography>
            </Box>
        </Box>
    );
};

export default Header;
