// Link of Api to change access token if expired
// https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city

// -----------------------------------------**********************************-------------------------------------


// Getting Access token Function start here
const TokenData = async (country) => {

    const data1 = await fetch(`https://www.universal-tutorial.com/api/getaccesstoken`, {
        headers: {
            "Accept": "application/json",
            "api-token": `${country}`,
            "user-email": "zaeem.zafar@binatedigital.com"
        }
    });
    const response = await data1.json();
    return response;
}
// Getting Access token Function end here

// Getting Country Data Function start here

const DataByCountry = async () => {
    const access_token = 'HKRUQbh-ZAJw5gB6TGD9hhqBfjvfna2S5xgQRd25BB54j8lCYLIw0X7pWMbvU4M-3_0';
    const token = await TokenData(access_token);
    const bearer = token?.auth_token;
    const fetch_country = await fetch(`https://www.universal-tutorial.com/api/countries/`, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + `${bearer}`
        }
    })

    const response = await fetch_country.json();
    const country = response.map((data) => data);
    console.log("country",country)
    return { country: country, token: token };
}

// Getting Country Data Function end here

// Getting State Data Function start here

const DataByState = async () => {
    const country = await DataByCountry();
    const countryname = country.country.map((data, index) => {
        index = data.country_phone_code
        return data.country_name
    })
    const bearer = country?.token?.auth_token
    const fetch_state = await fetch(`https://www.universal-tutorial.com/api/states/${countryname[229]  }`, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + `${bearer}`
        }
    });
    const resp = await fetch_state.json();
    const state = resp.map((data) => data.state_name);
    console.log("state",state)
    return { state: state, bearer: bearer };
}

// Getting State Data Function end here


// Getting City Data Function start here

const DataByCity = async () => {
    const state = await DataByState();
    const bearer = state?.bearer
    const states = state.state.map((data) => {
        return data;
    })
    const fetch_city = await fetch(`https://www.universal-tutorial.com/api/cities/${states[32]}`, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + `${bearer}`
        }
    });
    const city = await fetch_city.json();
    console.log("city",city)
    const resp = city
        .filter((data) => {
            if (data.length < 1) {
                const statement = "No City in this State"
                return statement
            }
            else {
                return data.city_name
            }
        })
        .map((data) => data);
    return resp;

}

// Getting City Data Function end here


DataByCity().then((data) => console.log("final check",data))




