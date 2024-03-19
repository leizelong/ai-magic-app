import { hour } from '@renderer/constants'
import { checkLiveRoomStatus } from '@renderer/utils/douyin/checkLiveRoomStatus'
import { crawlingLiveRoomList } from '@renderer/utils/douyin/fetchLiveRoomList'
import { myInterval } from '@renderer/utils/tool'

class LiveRoomStore {
  constructor() {
    const clearCrawlingLiveRoomTask = myInterval(
      async () => {
        crawlingLiveRoomList()
      },
      { time: hour * 1, name: '获取直播间列表', immediate: false }
    )
    ;(async () => {
      this.checkLiveRoomTask = await checkLiveRoomStatus()
    })()
  }

  checkLiveRoomTask?: { start: () => void; stop: () => void }
}

export default new LiveRoomStore()
