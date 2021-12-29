import { existsSync } from 'fs'

/** Returns any kind of path as a posix path. */
const toPosixPath = (pathname) => String(
	pathname == null ? '' : pathname
).replace(
	// convert slashes
	/\\+/g, '/'
).replace(
	// prefix a slash to drive letters
	/^(?=[A-Za-z]:\/)/, '/'
).replace(
	// encode path characters
	/%/g, '%25'
).replace(
	/\n/g, '%0A'
).replace(
	/\r/g, '%0D'
).replace(
	/\t/g, '%09'
)

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
	renderers: [],
	vite: {
		plugins: [
			(() => {
				const match = /mickey-mouse/

				let stats = {
					configResolved: { run: 0, set: new Set },
					resolveId: { run: 0, set: new Set },
					load: { run: 0, set: new Set },
					transform: { run: 0, set: new Set },
					buildEnd: { run: 0, set: new Set },
					closeBundle: { run: 0, set: new Set },
				}

				// // print operating system constants
				// console.table({
				// 	'process.cwd()': process.cwd(),
				// 	'pathToFileURL(process.cwd())': pathToFileURL(process.cwd()).toString(),
				// })

				return {
					name: '@example/test',
					enforce: 'pre',
					configResolved(/** @type {import('vite').ResolvedConfig} */ config) {
						++stats.configResolved.run
						stats.configResolved.set.add(toPosixPath(config.root))
					},
					resolveId(/** @type {string} */ sourceId, /** @type {string | undefined} */ _importerId) {
						if (!match.test(sourceId)) return
						++stats.resolveId.run
						stats.resolveId.set.add(sourceId)
					},
					load(/** @type {string} */ loadId) {
						if (!match.test(loadId)) return
						++stats.load.run
						stats.load.set.add(toPosixPath(loadId))
					},
					transform(/** @type {string} */ _code, /** @type {string} */ transformId) {
						if (!match.test(transformId)) return
						++stats.transform.run
						stats.transform.set.add(toPosixPath(transformId))
					},
					generateBundle(options, bundle) {
						console.log({ dir: options.dir })
						console.log('bundle:', Object.keys(bundle))
						console.log('bundle:', Object.values(bundle).map(value => value.fileName))
					},
					buildEnd() {
						++stats.buildEnd.run
					},
					closeBundle() {
						++stats.closeBundle.run

						// // print results of tests
						// console.table(
						// 	Object.entries(stats).reduce(
						// 		(result, [name, data]) => Object.assign(result, {
						// 			[name]: {
						// 				'# times run': data.run,
						// 				'all results': [ ...new Set([ ...data.set ].map(pathname => `${String(pathname)}:${existsSync(new URL(pathname, 'file:'))}`)) ]
						// 			},
						// 		}),
						// 		Object.create(null)
						// 	)
						// )
					},
				}
			})(),
		],
	},
})
