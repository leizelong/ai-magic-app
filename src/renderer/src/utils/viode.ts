import { PuppeteerNode } from 'puppeteer'
import { path } from './module'

const puppeteer: PuppeteerNode = require('puppeteer')

export async function getPuppeteerBrowserPath() {
  const pathList = [
    '.cache',
    'puppeteer',
    'chrome',
    'chrome-headless-shell',
    'win64-124.0.6362.0',
    'chrome-headless-shell-win64',
    'chrome-headless-shell.exe'
  ]
  // const isProd = process.env.NODE_ENV === 'production'
  const prodTargetPath = path.join(path.dirname(path.dirname(__dirname)), ...pathList)
  const devTargetPath = path.join(process.cwd(), ...pathList)
  return `C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe`
}

export const getPuppeteerLaunchOptions = async (headless: boolean | 'new') => {
  return {
    headless,
    defaultViewport: null,
    args: [
      '--public',
      '--mute-audio',
      '--window-size=1200,1080',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--proxy-server=117.71.149.48:8089`
    ],
    // executablePath: await getPuppeteerBrowserPath()
  }
}

export async function getMedia(shareUrl: string) {
  return new Promise<string>(async (resolve, reject) => {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      args: [
        '--public',
        '--mute-audio',
        '--window-size=1200,1080',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ],
      executablePath: await getPuppeteerBrowserPath()
    })
    // const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(shareUrl)
    page.on('response', async (response) => {
      const url = response.url()
      if (url.startsWith('https://v26-web.douyinvod.com/')) {
        console.log('url :>> ', url)
        resolve(url)
        await browser.close()
      }
    })
    setTimeout(() => {
      reject(new Error('等待超时'))
      browser.close()
    }, 1000 * 20)
  })
}
