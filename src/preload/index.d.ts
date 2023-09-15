import { ElectronAPI } from '@electron-toolkit/preload'
import child_process, { ChildProcess, exec, execSync, spawn, spawnSync } from 'child_process'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      child_process: typeof child_process
      // PythonShell: typeof PythonShell
      exec: typeof exec
      spawn: typeof spawn
    }
  }
}
