type ExecOptions = Parameters<typeof window.api.child_process.exec>[1]

type ExecConfig = {
  json?: boolean
}

export function exec<T = any>(cmd: string, options?: ExecOptions, config?: ExecConfig) {
  return new Promise<T>((resolve, reject) => {
    window.api.child_process.exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      }
      // if (stderr) {
      //   console.log(`${cmd} stderr :>>`, stderr)
      // }

      try {
        // const info = JSON.parse(stdout.toString())
        // resolve(info)
        if (!config?.json) {
          resolve(stdout.toString() as T)
        } else {
          const info = JSON.parse(stdout.toString())
          resolve(info)
        }
      } catch (error) {
        reject(error)
        if (stderr) {
          console.log(`${cmd} stderr :>> \n`, stderr)
        }
      }
    })
  })
}
