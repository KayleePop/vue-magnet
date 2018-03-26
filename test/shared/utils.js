export default {
  createAppDiv () {
    let previousAppElement = document.querySelector('#app')
    if (previousAppElement) {
      previousAppElement.remove()
    }
    let appElement = document.createElement('div')
    appElement.setAttribute('id', 'app')
    document.body.appendChild(appElement)
  },
  cleanUpVue (vm) {
    vm.$destroy()
    vm.$el.remove()
    delete window.Vue
  }
}
