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
    const token = await TokenData('HKRUQbh-ZAJw5gB6TGD9hhqBfjvfna2S5xgQRd25BB54j8lCYLIw0X7pWMbvU4M-3_0');
    const bearer = JSON.stringify(`${token?.auth_token}`)
    const fetch_country = await fetch(`https://www.universal-tutorial.com/api/countries/`, {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ6YWVlbS56YWZhckBiaW5hdGVkaWdpdGFsLmNvbSIsImFwaV90b2tlbiI6IkhLUlVRYmgtWkFKdzVnQjZUR0Q5aGhxQmZqdmZuYTJTNXhnUVJkMjVCQjU0ajhsQ1lMSXcwWDdwV01idlU0TS0zXzAifSwiZXhwIjoxNjY4NzM0NTIzfQ.fcJbjxK8UpID3Fcf8lggrhSYy52UPo8lu5bpIT8FGXQ`,
        }
    })

    const response = await fetch_country.json();
    const country = response.map((data) => data.country_name);
    return country;
}

// Getting Country Data Function end here

// Getting State Data Function start here

const DataByState = async () => {
    const country = await DataByCountry();
    const fetch_state = await fetch(`https://www.universal-tutorial.com/api/states/${country[163]}`, {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ6YWVlbS56YWZhckBiaW5hdGVkaWdpdGFsLmNvbSIsImFwaV90b2tlbiI6IkhLUlVRYmgtWkFKdzVnQjZUR0Q5aGhxQmZqdmZuYTJTNXhnUVJkMjVCQjU0ajhsQ1lMSXcwWDdwV01idlU0TS0zXzAifSwiZXhwIjoxNjY4NzM0NTIzfQ.fcJbjxK8UpID3Fcf8lggrhSYy52UPo8lu5bpIT8FGXQ`,
        }
    });
    const resp = await fetch_state.json();
    const state = resp.map((data) => data.state_name);
    return state;
}

// Getting State Data Function end here


// Getting City Data Function start here

const DataByCity = async () => {
    const state = await DataByState();
    const fetch_city = await fetch(`https://www.universal-tutorial.com/api/cities/${state[5]}`, {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ6YWVlbS56YWZhckBiaW5hdGVkaWdpdGFsLmNvbSIsImFwaV90b2tlbiI6IkhLUlVRYmgtWkFKdzVnQjZUR0Q5aGhxQmZqdmZuYTJTNXhnUVJkMjVCQjU0ajhsQ1lMSXcwWDdwV01idlU0TS0zXzAifSwiZXhwIjoxNjY4NzM0NTIzfQ.fcJbjxK8UpID3Fcf8lggrhSYy52UPo8lu5bpIT8FGXQ`,
        }
    });
    const city = await fetch_city.json();
    const resp = city
        .filter((data) => data.city_name !== [] ? data.city_name : console.log("No CIty in State"))
        .map((data) => data)

    return resp;

}

// Getting City Data Function end here


DataByCity().then((data) => console.log(data))




