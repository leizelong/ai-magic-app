import taskModel from '@renderer/mongodb/schemas/task'
import { eventSubject } from '@renderer/subjects/eventSubject'
import { observable, action, computed } from 'mobx'
import { Browser } from 'puppeteer'
import { Subject } from 'rxjs'

class TaskStore {
  @observable browserMap = new Map<string, Browser>()
  userInfoRefreshSubject = new Subject<void>()

  @observable value = { maxRoomSize: 100, liveRoomUserCount: 100 }
  // @observable value = { maxRoomSize: 1, liveRoomUserCount: 300 }

  constructor() {
    window.electron.ipcRenderer.on('win-close-tips', () => {
      for (const taskId of this.browserMap.keys()) {
        this.removeBrowser(taskId)
      }
    })
  }

  @action setMaxRoomSize(v) {
    this.value.maxRoomSize = v
  }

  @action setLiveRoomUserCount(v) {
    this.value.liveRoomUserCount = v
  }

  @computed
  isRunning(taskId: string) {
    return this.browserMap.has(taskId)
  }

  @action
  async registerBrowser(id: string, browser: Browser) {
    this.browserMap.set(id, browser)
    await taskModel.start(id)
  }

  @action
  async removeBrowser(id: string) {
    const browser = this.browserMap.get(id)
    if (!browser) return

    this.browserMap.delete(id)
    await taskModel.stop(id)
    eventSubject.next({ event: 'browser_disconnect' })
    browser.close()
  }
}

export default new TaskStore()
