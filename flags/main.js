
const btnToggle = document.querySelector('.toggle');
const countries = document.querySelector('.countries');
const formSearch = document.querySelector('.form_search');
const inputSearch = document.querySelector('.input_search');
const filter = document.querySelector('.filter');

btnToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.className === 'dark') {
        btnToggle.innerHTML = `
        <i class="far fa-sun"></i>
        Light Mode
        `
    } else {
        btnToggle.innerHTML = `
        <i class="far fa-moon"></i>
        Dark Mode
        `
    }
})

document.addEventListener('DOMContentLoaded', e => {
    fetchData();
})

const fetchData = async () => {
    try {
        const url = await fetch("https://restcountries.com/v2/all");
        const data = await url.json();

        showCountries(data);
        serchCountry(data);
        filterRegion(data);
    } catch (error) {
        console.log(error)
    }
}

function showCountries(data) {
    let template = '';

    for (let key in data) {
        template += `
            <div class="country">
                <div class="country_flag">
                    <img src=${data[key].flag}>
                </div>
                <div class="country_details">
                    <h1>${data[key].name}</h1>
                    <p><strong>Population:</strong> ${data[key].population}</p>
                    <p><strong>Region:</strong> ${data[key].region}</p>
                    <p><strong>Capital:</strong> ${data[key].capital}</p>
                </div>
            </div>`
    }
    countries.innerHTML = template;
}

function serchCountry(data) {
    formSearch && formSearch.addEventListener('keyup', (e) => {
        e.preventDefault();

        const letter = inputSearch.value.toLowerCase();
        const arraySerch = data.filter(item => {
            const letterApi = item.name.toLowerCase();
            if (letterApi.includes(letter)) {
                return item;
            }
        })

        showCountries(arraySerch);
    })
}

function filterRegion(data) {
    filter && filter.addEventListener('change', (e) => {
        e.preventDefault();

        const carrentRegion = filter.value;

        if (carrentRegion === '') {

            showCountries(data);
            serchCountry(data);

        } else {
            const filterData = data.filter(item => item.region === carrentRegion)

            showCountries(filterData);
            serchCountry(filterData);

        }
    })
}
