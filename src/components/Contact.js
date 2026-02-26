import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { EmailOutlined, PhoneOutlined, LocationOnOutlined } from '@mui/icons-material';
import { Instagram, Facebook } from '@mui/icons-material';
import siteConfig from '../siteConfig';

const isSet = (val) => val && !val.startsWith('{{');

const Contact = () => {
    const { email, phone, address } = siteConfig.contact;
    const { instagram, facebook } = siteConfig.social || {};

    return (
        <Box component="section" sx={{ py: 4 }}>
            <Container>
                <Typography
                    fontSize={30}
                    sx={{ fontWeight: 400, fontFamily: 'Alumni Sans', color: '#31312C', mb: 2 }}
                >
                    CONTACT
                </Typography>

                <Stack spacing={2}>
                    {isSet(email) && (
                        <Link
                            href={`mailto:${email}`}
                            underline="none"
                            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#31312C', fontFamily: 'Alumni Sans' }}
                        >
                            <EmailOutlined sx={{ fontSize: 24 }} />
                            <Typography fontSize={18} sx={{ color: '#31312C', lineHeight: 1, '&:hover': { color: siteConfig.primaryColor } }}>
                                {email}
                            </Typography>
                        </Link>
                    )}

                    {isSet(phone) && (
                        <Link
                            href={`tel:${phone}`}
                            underline="none"
                            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#31312C', fontFamily: 'Alumni Sans' }}
                        >
                            <PhoneOutlined sx={{ fontSize: 24 }} />
                            <Typography fontSize={18} sx={{ color: '#31312C', lineHeight: 1, '&:hover': { color: siteConfig.primaryColor } }}>
                                {phone}
                            </Typography>
                        </Link>
                    )}

                    {isSet(address) && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#31312C' }}>
                            <LocationOnOutlined sx={{ fontSize: 24 }} />
                            <Typography fontSize={18} sx={{ color: '#31312C', fontFamily: 'Alumni Sans' }}>
                                {address}
                            </Typography>
                        </Box>
                    )}

                    {(isSet(instagram) || isSet(facebook)) && (
                        <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                            {isSet(instagram) && (
                                <Link href={instagram} target="_blank" rel="noopener" sx={{ color: '#31312C', '&:hover': { color: siteConfig.primaryColor } }}>
                                    <Instagram sx={{ fontSize: 28 }} />
                                </Link>
                            )}
                            {isSet(facebook) && (
                                <Link href={facebook} target="_blank" rel="noopener" sx={{ color: '#31312C', '&:hover': { color: siteConfig.primaryColor } }}>
                                    <Facebook sx={{ fontSize: 28 }} />
                                </Link>
                            )}
                        </Stack>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default Contact;
