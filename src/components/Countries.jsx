import { Typography, NativeSelect } from "@material-ui/core";
import { useEffect, useState } from "react";
import { fetchCountries } from "../service/api";

const Countries = ({ handleCountryChange }) => {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const countriesData = await fetchCountries();
                setCountries(countriesData);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchApi();
    }, []);

    if (error) {
        return <Typography color="error">{`Error: ${error}`}</Typography>;
    }

    return (
        <>
            <Typography style={{ marginBottom: 20 }} variant="h5" color="textSecondary">
                Reported Cases or Deaths by Country or Territory
            </Typography>
            <NativeSelect onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {Array.isArray(countries) &&
                    countries.map((country, i) => (
                        <option key={i} value={country}>
                            {country}
                        </option>
                    ))}
            </NativeSelect>
        </>
    );
};

export default Countries;
