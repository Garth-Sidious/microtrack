chrome.runtime.onMessage.addListener((request) => {
    if (request.open) {
        console.log('open request')
      return new Promise(resolve => {
        chrome.action.getPopup({}, (popup) => {
            console.log('popup resolved')
          return resolve(popup)
        })
      })
    }
  })