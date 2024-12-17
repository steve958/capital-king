import React, { useState } from 'react'
import { Card, CardContent, Typography, Button, Stack } from '@mui/material'

interface CountryCardProps {
    country: string
    options: string[]
    onSelect: (capital: string) => void
    flagUrl: string // new prop
}

const CountryCard: React.FC<CountryCardProps> = ({ country, options, onSelect, flagUrl }) => {
    const [imgError, setImgError] = useState(false)

    return (
        <Card style={{ margin: '16px' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom textAlign='center'>
                    {country}
                </Typography>
                {!imgError ? (
                    <img
                        src={flagUrl}
                        alt={`Flag of ${country}`}
                        style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', marginBottom: '16px' }}
                        onError={() => setImgError(true)}
                        loading="lazy" // helps with performance
                    />
                ) : (
                    <div style={{ marginBottom: '16px', textAlign: 'center', color: '#999' }}>
                        <Typography variant="body2">Flag not available</Typography>
                    </div>
                )}
                <Stack spacing={2}>
                    {options.map((city) => (
                        <Button key={city} variant="contained" onClick={() => onSelect(city)}>
                            {city}
                        </Button>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}

export default CountryCard
