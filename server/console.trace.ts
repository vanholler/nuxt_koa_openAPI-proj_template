import { LoggerAdaptToConsole } from 'console-log-json'
import { tracer } from './utils'

const isProduction = process.env.NODE_ENV === 'production'

process.env.CONSOLE_LOG_JSON_NO_STACK_FOR_NON_ERROR = 'true'
process.env.CONSOLE_LOG_JSON_NO_FILE_NAME = 'true'
process.env.CONSOLE_LOG_JSON_NO_PACKAGE_NAME = 'true'

if (isProduction) {
  LoggerAdaptToConsole()
}

const consoleLogBackup = console.log
const consoleErrorBackup = console.error
const consoleWarnBackup = console.warn
const consoleInfoBackup = console.info
const consoleHttpBackup = console.http
const consoleVerboseBackup = console.verbose
const consoleDebugBackup = console.debug
const consoleSillyBackup = console.silly

function consoleRecorder (arg: IArguments) {
  return {
    message: arg,
    traceId: tracer.id.traceId,
    AppName: 'new app'
  }
}

if (isProduction) {
  console.log = function (arg: any) {
    tracer.scoped(() => {
      consoleLogBackup(consoleRecorder(arg))
    })
  }

  console.error = function (arg: any) {
    tracer.scoped(() => {
      consoleErrorBackup(consoleRecorder(arg))
    })
  }

  console.warn = function (arg: any) {
    tracer.scoped(() => {
      consoleWarnBackup(consoleRecorder(arg))
    })
  }

  console.info = function (arg: any) {
    tracer.scoped(() => {
      consoleInfoBackup(consoleRecorder(arg))
    })
  }

  console.http = function (arg: any) {
    tracer.scoped(() => {
      consoleHttpBackup(consoleRecorder(arg))
    })
  }

  console.verbose = function (arg: any) {
    tracer.scoped(() => {
      consoleVerboseBackup(consoleRecorder(arg))
    })
  }

  console.debug = function (arg: any) {
    tracer.scoped(() => {
      consoleDebugBackup(consoleRecorder(arg))
    })
  }

  console.silly = function (arg: any) {
    tracer.scoped(() => {
      consoleSillyBackup(consoleRecorder(arg))
    })
  }
}

export default console
