export interface Country {
    country_name: string;
    capital_city: string;
    continent: string; // new field
}

export async function loadCountries(): Promise<Country[]> {
    const response = await fetch(new URL('../assets/data/countries.json', import.meta.url));
    if (!response.ok) {
        throw new Error(`Failed to load countries data: ${response.statusText}`);
    }

    const data = await response.json() as Country[];

    for (const entry of data) {
        if (typeof entry.country_name !== 'string' ||
            typeof entry.capital_city !== 'string' ||
            typeof entry.continent !== 'string') {
            throw new Error('Invalid JSON format: each entry must have country_name, capital_city, and continent');
        }
    }

    return data;
}
