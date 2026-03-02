//fetching data using Rest Countries API

async function searchCountry(countryName){

        try {
        // Show loading spinner
        document.getElementById("loading-spinner").style.display="block";
        // Fetch country data

        document.getElementById("country-info").style.display="block"
        document.getElementById("bordering-countries").style.display="block"
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName.toLowerCase()}?fullText=true`);
        if (!response.ok){
            throw new Error("Could not fetch the data");
        }
        const data = await response.json();
        
        // Update DOM
        document.getElementById('country-info').innerHTML = `
            <h2>${data[0].name.common}</h2>
            <p><strong>Capital:</strong> ${data[0].capital[0]}</p>
            <p><strong>Population:</strong> ${data[0].population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${data[0].region}</p>
            <img src="${data[0].flags.png}" alt="${data[0].name.common} flag" />
        `;
        // Fetch bordering countries
        if (data[0].borders && data[0].borders.length >0){
            const codes = data[0].borders.join(",");
            const response2 = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}`);
            if (!response2.ok){
                throw new Error ("Could not find the data for bordering countries");
            }
            const data2 = await response2.json();
            document.getElementById("bordering-countries").innerHTML = data2.map(b => `
                <p>Bordering Countries:</p>
                <p>${b.name.common}</p>
                <img src="${b.flags.svg}" alt="${b.name.common} flag" height="400" width="400">`).join(" ");
        }
        else{
            document.getElementById("error-message").innerHTML="Could not find the data for bordering countries";
        }       

        } catch (error) {
            // Show error message
            console.error(error);
            document.getElementById("error-message").innerHTML=`${error}`;
        } finally {
            // Hide loading spinner
            document.getElementById('loading-spinner').style.display = "none";
        }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});