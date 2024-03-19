import { action, makeObservable, observable } from 'mobx'

class StorageStore {
  constructor() {
    makeObservable(this)
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    this.value = { token, username } as any
  }

  @observable
  value = {
    token: '',
    username: ''
  }

  @action
  setItem(key: string, value: string) {
    localStorage.setItem(key, value)
    this.value = { ...this.value, [key]: value }
  }

  @action
  getItem(key: string) {
    // localStorage.getItem(key)
    return this.value[key]
  }

  @action
  removeItem(key: string) {
    localStorage.removeItem(key)
    const cloneItem = { ...this.value }
    delete cloneItem[key]
    this.value = cloneItem
  }

  @action
  clear() {
    localStorage.clear()
    this.value = {} as any
  }
}

export default new StorageStore()
