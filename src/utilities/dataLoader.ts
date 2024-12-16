export interface Country {
    country_name: string;
    capital_city: string;
}

export async function loadCountries(): Promise<Country[]> {
    const response = await fetch(new URL('../assets/data/countries.json', import.meta.url));
    if (!response.ok) {
        throw new Error(`Failed to load countries data: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate the structure to ensure it has the fields we need
    if (!Array.isArray(data)) {
        throw new Error('Invalid JSON format: expected an array');
    }

    for (const entry of data) {
        if (typeof entry.country_name !== 'string' || typeof entry.capital_city !== 'string') {
            throw new Error('Invalid JSON format: each entry must have country_name and capital_city strings');
        }
    }

    return data;
}
