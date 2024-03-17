const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

const pathList = [
  '.cache',
  'puppeteer',
  'chrome',
  'chrome-headless-shell',
  'win64-124.0.6362.0',
  'chrome-headless-shell-win64',
  'chrome-headless-shell.exe'
]

const prodTargetPath = path.join(path.dirname(path.dirname(__dirname)), ...pathList)
const devTargetPath = path.join(process.cwd(), ...pathList)

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: isProd ? prodTargetPath : devTargetPath
}
