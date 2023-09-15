import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import child_process from 'child_process'

// PythonShell.runString('x=1+1;print(x)').then((messages) => {
//   console.log('finished', messages)
// })

// exec('yt-dlp --list-formats -i url https://youtu.be/mmUfZt10b6g', (err, stdout) => {
//   console.log('stdout :>> ', stdout)
// })

// child_process
//   .spawn('yt-dlp', ['--list-formats', '-i', 'url', 'https://youtu.be/mmUfZt10b6g'], {})
//   .stdout.on('data', (data) => {
//     console.log('spawn :>> ', data.toString())
//   })

// Custom APIs for renderer
export const api = { child_process }

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
