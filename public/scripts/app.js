const resultWrap = document.querySelector('.results')
resultWrap.classList.remove('active')

const resultOneDisplay = document.querySelector('.result1')
const resultTwoDisplay = document.querySelector('.result2')
const searchForm = document.querySelector('.search')

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  resultOneDisplay.innerHTML = 'loading...'
  resultWrap.classList.add('active')

  const address = e.target.elements.searchText.value
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        resultOneDisplay.innerHTML = data.error
      } else {
        resultOneDisplay.innerHTML = data.location
        resultTwoDisplay.innerHTML = data.forecast
      }
    })
  })
})
