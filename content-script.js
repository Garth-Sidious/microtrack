const i = document.createElement('iframe')
const b = document.createElement('button')
const p = document.getElementById('some-id')

b.innerHTML = 'Open'
b.addEventListener('click', (evt) => {
  evt.preventDefault()
  chrome.runtime.sendMessage({ open: true }, (response) => {
    i.src = response
    p.appendChild(i)
  })
})
p.appendChild(b)