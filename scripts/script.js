const $ = document
const wrapperElm = $.querySelector('.wrapper')
const selectBtnElm = $.querySelector('.select-btn')
const selectedCountryElm = $.querySelector('.select-btn span')
const inputSearchElm = $.querySelector('.search input')
const optionElm = $.querySelector('.options')

let countries = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan","Brazil", "Canada", "China", "Denmark", "Ethiopia", "Finland", "France", "Germany","Hungary", "Iceland", "India", "Indonesia", "Iran", "Italy", "Japan", "Malaysia","Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan","Peru", "Russia", "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland","Thailand", "Turkey", "Uganda", "Ukraine", "United States", "United Kingdom", "Vietnam"];
let fragment = $.createDocumentFragment()

const searchBetweenCountries = () =>{
    let newCountries = countries.filter(country => country.toLowerCase().includes(inputSearchElm.value.toLowerCase()))
    if(newCountries.length !== 0) appendCountriesToOptionElm(newCountries) 
    else{
        appendCountriesToOptionElm([])
        alert('Oops!Country not found')
    }
}

const appendCountriesToOptionElm = (countries) =>{
    optionElm.innerHTML = ''
    countries.forEach(country =>{
        let countryElm = $.createElement('li')
        countryElm.innerText = country
        countryElm.addEventListener('click', function(){
            selectedCountry(this)
        })
        if(inputSearchElm.value !== '') highlightTheSearchedTerm(countryElm)
        if(country === selectedCountryElm.innerText) countryElm.classList.add('selected')

        fragment.append(countryElm)
    })
    optionElm.append(fragment)
}

const highlightTheSearchedTerm = (elm) =>{
    let regex = new RegExp(inputSearchElm.value, 'i')
    elm.innerHTML = elm.innerText.replace(regex, result => `<mark>${result}</mark>`)
}

const selectedCountry = (newCountry) =>{
    if(optionElm.querySelector(".selected")){
        let oldCountry = optionElm.querySelector(".selected")
        oldCountry.classList.remove('selected')
    }
    wrapperElm.classList.remove('active')
    selectedCountryElm.innerText = newCountry.innerText
    newCountry.classList.add('selected')
}

selectBtnElm.addEventListener('click', () => wrapperElm.classList.toggle('active'))
inputSearchElm.addEventListener('keyup', searchBetweenCountries)
window.addEventListener('load', () => appendCountriesToOptionElm(countries))