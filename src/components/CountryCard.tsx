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

    const flagStyle = {
        width: '100%',
        maxHeight: '150px',
        height: '150px',
        objectFit: 'contain' as const,
        marginBottom: '16px',
    }

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
                        style={flagStyle}
                        onError={() => setImgError(true)}
                        loading="lazy"
                    />
                ) : (
                    <div
                        style={{
                            ...flagStyle,
                            backgroundColor: '#f5f5f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    >
                        <Typography variant="body1" color="textSecondary">
                            🏳️ Flag not available
                        </Typography>
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
