// log4js的配置
import * as log4js from 'log4js'
import path from 'path'
import fs from 'fs'

// 假设当前文件所在的目录为基准，指定统一的日志文件夹
const logDirectory = path.join(path.resolve(__dirname, '../..'), 'src', 'logs')

// 确保日志文件夹存在
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
}

log4js.configure({
  appenders: {
    traceLog: { type: 'file', filename: path.join(logDirectory, 'trace.log'), level: 'trace' },
    debugLog: { type: 'file', filename: path.join(logDirectory, 'debug.log'), level: 'debug' },
    infoLog: { type: 'file', filename: path.join(logDirectory, 'info.log'), level: 'info' },
    warnLog: { type: 'file', filename: path.join(logDirectory, 'warn.log'), level: 'warn' },
    errorLog: { type: 'file', filename: path.join(logDirectory, 'error.log'), level: 'error' },
    fatalLog: { type: 'file', filename: path.join(logDirectory, 'fatal.log'), level: 'fatal' },
    allLog: { type: 'file', filename: path.join(logDirectory, 'all.log') } // 所有级别的日志都会被记录到这里
  },
  categories: {
    trace: { appenders: ['traceLog', 'allLog'], level: 'trace' },
    debug: { appenders: ['debugLog', 'allLog'], level: 'debug' },
    info: { appenders: ['infoLog', 'allLog'], level: 'info' },
    warn: { appenders: ['warnLog', 'allLog'], level: 'warn' },
    error: { appenders: ['errorLog', 'allLog'], level: 'error' },
    fatal: { appenders: ['fatalLog', 'allLog'], level: 'fatal' },
    default: { appenders: ['allLog'], level: 'all' }
  }
})

// 获取特定类别的 logger 和定义日志函数等保持不变...

// 获取特定类别的 logger
const traceLogger = log4js.getLogger('trace')
const debugLogger = log4js.getLogger('debug')
const infoLogger = log4js.getLogger('info')
const warnLogger = log4js.getLogger('warn')
const errorLogger = log4js.getLogger('error')
const fatalLogger = log4js.getLogger('fatal')

const trace = (e: string) => {
  traceLogger.trace(e)
}
const debug = (e: string) => {
  debugLogger.debug(e)
}
const info = (e: string) => {
  infoLogger.info(e)
}
const warn = (e: string) => {
  warnLogger.warn(e)
}
const error = (e: string) => {
  errorLogger.error(e)
}
const fatal = (e: string) => {
  fatalLogger.fatal(e)
}

export {
  trace,
  debug,
  info,
  warn,
  error,
  fatal
}