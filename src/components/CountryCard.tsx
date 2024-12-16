import React from 'react'
import { Card, CardContent, Typography, Button, Stack } from '@mui/material'

interface CountryCardProps {
    country: string
    options: string[]
    onSelect: (capital: string) => void
}

const CountryCard: React.FC<CountryCardProps> = ({ country, options, onSelect }) => {
    return (
        <Card style={{ margin: '16px' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {country}
                </Typography>
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
