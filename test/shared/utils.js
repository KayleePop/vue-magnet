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
  cleanUp () {
    if (window.vueInstance) {
      let vm = window.vueInstance
      vm.$el.remove()
      vm.$destroy()
      delete window.vueInstance
    }
    delete window.Vue
  }
}
