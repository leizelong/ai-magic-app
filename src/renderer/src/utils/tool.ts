type ExecOptions = Parameters<typeof window.api.child_process.exec>[1]

type ExecConfig = {
  json?: boolean
}

const api = window.api

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

type ReadFileOptions = Parameters<typeof window.api.fs.readFile>[0]

export function readFile(filePath: string, options?: any) {
  return new Promise<Buffer>((resolve, reject) => {
    window.api.fs.readFile(filePath, options, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      resolve(e?.target.result);
    };
    // readAsDataURL
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'));
    };
  });
}


export async function fileToUrl(filePath: string) {
  const buffer = await readFile(filePath)
  const blob = new Blob([buffer], { type: 'image/png' })
  // console.log('blob :>> ', blob);
  const url = URL.createObjectURL(blob)
  // const base64 = await blobToBase64(blob)
  // console.log('base64 :>> ', base64);
  // console.log('url :>> ', url)
  return url
}
