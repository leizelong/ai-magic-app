import { observable, action } from 'mobx'
import { Browser } from 'puppeteer'
import { Subject } from 'rxjs'

class ClientStore {
  userInfoRefreshSubject = new Subject<void>()
}

export default new ClientStore()
