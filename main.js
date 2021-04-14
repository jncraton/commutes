const splitPUMA = (data) => {
  /*
  Creates two new fields on each row based on the PUMA field
  The two fields are state and city

  For example, the PUMA value "Dothan City PUMA, AL" would result in
  {
    PUMA: "Dothan City PUMA, AL",
    city: "Dothan City",
    state: "AL"
  }

  This function should return a new array.

  This function should use data.map(...)
  */

  return data
}

const filter = (data, state, city, year, maxCommuteTime) => {
  // Filter data to match column filter strings
  // This function should use data.filter(...)
  return data
}

const sort = (data, column, descending) => {
  // Sort data by column in place
  // This function should use data.sort(...)
}

const average = (data, column) => {
  // Returns the average value for a column
  // This function should use data.reduce(...)
  return 0
}

const writeRow = (row) => {
  // Writes a new row to the table
  const tr = document.querySelector('tbody').insertRow(-1)

  // PUMA is Public Use Microdata Area
  ;['state', 'city', 'year', 'commuteTime'].forEach(field => {
    const td = document.createElement('td')
    td.appendChild(document.createTextNode(row[field]))
    tr.appendChild(td)
  })
}

const update = () => {
  // Updates table data to match input filters
  const get = (name) => document.querySelector(`[name=${name}]`).value

  const filtered = filter(data, get('state'), get('city'), get('year'), parseFloat(get('commuteTime')))
  sort(filtered, get('sort'), document.querySelector('[name=desc]').checked)

  document.querySelector('tbody').innerHTML = ''
  filtered.forEach(writeRow)

  document.querySelector('#average').textContent = 'Average commute is ' + average(filtered, 'commuteTime')
}

// Bind input events
document.querySelectorAll('input,select').forEach(e => {
  e.addEventListener('input', update)
})

// Load data and initialize
let data = []

window.fetch('https://datausa.io/api/data?measure=Average%20Commute%20Time&drilldowns=PUMA')
  .then(response => response.json())
  .then(body => {
    data = body.data.map(row => {
      row.commuteTime = parseFloat(row['Average Commute Time'])
      row.year = row.Year
      return row
    })

    data = splitPUMA(data)

    update()
  })
