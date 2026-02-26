import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Contact from './components/Contact';
import siteConfig from './siteConfig';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';

const isSet = (val) => val && !val.startsWith('{{');

const Home = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const services = [siteConfig.service1, siteConfig.service2, siteConfig.service3]
        .filter(s => s && isSet(s.title));

    const hasContact =
        isSet(siteConfig.contact?.email) ||
        isSet(siteConfig.contact?.phone) ||
        isSet(siteConfig.contact?.address) ||
        isSet(siteConfig.social?.instagram) ||
        isSet(siteConfig.social?.facebook);

    return (
        <>
            <Navbar />
            <Header />

            {isSet(siteConfig.aboutText) && (
                <Container maxWidth="sm" id="about" sx={{ py: 6 }}>
                    <Typography
                        align="center"
                        sx={{ fontFamily: '"Inter", sans-serif', whiteSpace: 'pre-line' }}
                    >
                        {siteConfig.aboutText}
                    </Typography>
                </Container>
            )}

            {services.length > 0 && (
                <Box id="services" sx={{ bgcolor: '#f9f9f9', py: 6 }}>
                    <Container maxWidth="md">
                        <Typography
                            align="center"
                            sx={{
                                mb: 4,
                                fontFamily: '"Alumni Sans", sans-serif',
                                fontSize: 28,
                                letterSpacing: 2,
                                color: '#31312C',
                            }}
                        >
                            SERVICES
                        </Typography>
                        <Grid container spacing={3} justifyContent="center">
                            {services.map((service, i) => (
                                <Grid item xs={12} sm={6} md={4} key={i}>
                                    <Card elevation={0} sx={{ border: '1px solid #e8e8e8', height: '100%' }}>
                                        <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                            <Typography
                                                sx={{
                                                    fontFamily: '"Alumni Sans", sans-serif',
                                                    fontSize: 22,
                                                    mb: 1,
                                                    color: siteConfig.primaryColor,
                                                }}
                                            >
                                                {service.title}
                                            </Typography>
                                            {isSet(service.description) && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontFamily: '"Inter", sans-serif', color: '#666' }}
                                                >
                                                    {service.description}
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            )}

            {hasContact && (
                <Box id="contact" sx={{ py: 6 }}>
                    <Contact />
                </Box>
            )}
        </>
    );
};

export default Home;
