import axios from 'axios';

const url = "https://disease.sh/v3/covid-19";

export const fetchData = async (country) => {
    let changedUrl = `${url}/all`; // Default to global data
    if (country) {
        changedUrl = `${url}/countries/${country}`;
    }
    try {
        const { data } = await axios.get(changedUrl);
        if (country) {
            return {
                confirmed: { value: data.cases },
                recovered: { value: data.recovered },
                deaths: { value: data.deaths },
                lastUpdate: data.updated,
            };
        }
        return {
            confirmed: { value: data.cases },
            recovered: { value: data.recovered },
            deaths: { value: data.deaths },
            lastUpdate: data.updated,
        };
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return { confirmed: {}, recovered: {}, deaths: {}, lastUpdate: null }; 
    }
};

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(`${url}/countries`);
        return data.map(country => country.country);
    } catch (error) {
        console.error("Error fetching countries:", error.message);
        return [];
    }
};
