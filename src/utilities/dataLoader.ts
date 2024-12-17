export interface Country {
    country_name: string;
    capital_city: string;
    continent: string;
    flag: string; // new field
}

// Directly import the JSON data, which should be placed in your project's root or assets directory.
import countriesData from '../assets/data/countries.json';

// Validate the data once during module load (optional but recommended)
if (!Array.isArray(countriesData)) {
    throw new Error('Invalid JSON format: root is not an array');
}
for (const entry of countriesData) {
    if (typeof entry.country_name !== 'string' ||
        typeof entry.capital_city !== 'string' ||
        typeof entry.continent !== 'string') {
        throw new Error('Invalid JSON format: each entry must have country_name, capital_city, and continent');
    }
}

/**
 * Since data is now directly imported, no async/await is needed.
 * Just export the already loaded countries data.
 */
export function loadCountries(): Country[] {
    return countriesData;
}
