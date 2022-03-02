// @ts-check

import { existsSync } from 'fs'
import { defineConfig } from 'vite'
import { watch } from 'chokidar'

/** Returns the posix-normalized path from the given path. */
export const normalize = (/** @type {string} */ path, /** @type {boolean} */ trim = false) => {
	const segments = path.split('\\')

	if (trim && segments.at(-1) === '') segments.pop()

	return segments.join('/')
}

export const trimTrailingSlash = (/** @type {string} */ path) => path[path.length - 1] === '/' ? path.slice(0, -1) : path

const stats = {
	configResolved: { run: 0, set: new Set },
	resolveId: { run: 0, set: new Set },
	load: { run: 0, set: new Set },
	transform: { run: 0, set: new Set },
	buildEnd: { run: 0, set: new Set },
	closeBundle: { run: 0, set: new Set },
}

console.log('value of process.cwd()')
console.log(' ', [ process.cwd() ])

const test = {}

export default defineConfig({
	root: 'src',
	plugins: [
		{
			name: '@example/test',
			configResolved(config) {
				++stats.configResolved.run

				const root = config.root

				console.log('config as raw path:')
				try {
					console.log(' ', [ root ])
					console.log(' ', 'exists', existsSync(root))
				} catch (error) {
					console.log(' ', 'threw an error')
					console.log(' ', error)
				}

				console.log('config as url path:')
				try {
					console.log(' ', new URL(root, 'file:'))
					console.log(' ', 'exists', existsSync(new URL('//' + root, 'file:')))
				} catch (error) {
					console.log('threw an error')
					console.error(error)
				}

				stats.configResolved.set.add(root)

				return new Promise(
					(resolve) => {
						const manifest = {}
						const watcher = watch(root, {
							persistent: false,
							ignored: [
								'**/node_modules/**',
								'**/.git/**',
							],
							ignoreInitial: false,
							ignorePermissionErrors: true,
							disableGlobbing: true,
						})
						watcher.on('all', (event, path, stats) => {
							path = normalize(path, true)

							manifest[path] = manifest[path] || {}

							switch (event) {
								case 'add':
									manifest[path].type = 'file'
									manifest[path].size = stats.size
									manifest[path].time = stats.mtimeMs
									break
								case 'addDir':
									manifest[path].type = 'dir'
									manifest[path].size = stats.size
									manifest[path].time = stats.mtimeMs
									break

								case 'change':
									manifest[path].size = stats.size
									manifest[path].time = stats.mtimeMs
									break

								case 'unlink':
								case 'unlinkDir':
									delete manifest[path]
									break
							}
						})
						watcher.on('ready', () => {
							console.log('watcher:ready')
							console.table(manifest)

							resolve()
						})
					}
				)
			},
			resolveId(importee) {
				++stats.resolveId.run

				stats.resolveId.set.add(importee)

				return undefined
			},
			load(importee) {
				++stats.load.run

				stats.load.set.add(importee)

				return undefined
			},
			transform(_code, importee) {
				++stats.transform.run

				stats.transform.set.add(importee)

				return undefined
			},
			buildEnd() {
				++stats.buildEnd.run
			},
			closeBundle() {
				++stats.closeBundle.run

				// print results of tests
				console.table(
					Object.entries(stats).reduce(
						(result, [name, data]) => Object.assign(result, {
							[name]: {
								'# times run': data.run,
								'all results': [ ...data.set ]
							},
						}),
						Object.create(null)
					)
				)
			},
		}
	]
})