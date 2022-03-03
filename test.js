import file from 'node:fs'
import Writable from 'node:stream'
import { tmpdir } from 'node:os'

const cpuUsage = process.cpuUsage()
console.log(cpuUsage)
console.log({ platform: process.platform })

const NUL = tmpdir()
console.log({ NUL })

const { defineProperties, getOwnPropertyDescriptors, setPrototypeOf } = Object
const { watch } = file

let InternalFSWatcher = watch(NUL)

InternalFSWatcher = defineProperties(function FSWatcher(pathname, options) {
	return setPrototypeOf(watch(pathname, options), this.__proto__)
}, getOwnPropertyDescriptors(InternalFSWatcher.close() || InternalFSWatcher.constructor))

console.log(InternalFSWatcher)
console.log(process.cpuUsage(cpuUsage))
