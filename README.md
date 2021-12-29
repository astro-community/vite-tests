# Astro Vite Tests

This project analyzes an Astro project in different operating systems, checking for how often Vite plugin hooks are run and for what values they return.

- [Read the results](#results).
- [Read the observations](#observations).



### Details

The test runs `astro build` on a project with one Astro file importing another JavaScript file. In the Astro configuration file, a single vite plugin is added to track how often certain hooks are used, specifically those involving the JavaScript file.

These are the contents of `src/pages/mickey-mouse.astro`:

```astro
---
import { quack } from '../donald-duck.js'

void quack
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Welcome to Astro</title>
  </head>
  <body>
    <h1>Welcome to Astro</h1>
  </body>
</html>
```

These are the contents of `src/donald-duck.js`:

```js
export const quack = { pack: true }
```

These are the hooks that are tested:

- `configResolved` (_this is inspecific to the Astro or JavaScript files_)
- `resolveId`
- `load`
- `transform`
- `buildEnd` (_this is inspecific to the `src/donald-duck.js` JavaScript file_)
- `closeBundle` (_this is inspecific to the `src/donald-duck.js` JavaScript file_)

These are a few values we can check in each operating system:

| Operating System   | Value of `process.cwd()`                   | Value of `pathToFileURL(process.cwd())`           |
|:-------------------|:-------------------------------------------|:--------------------------------------------------|
| **ubuntu-latest**  | `/home/runner/work/vite-tests/vite-tests`  | `file:///home/runner/work/vite-tests/vite-tests`  |
| **macos-latest**   | `/Users/runner/work/vite-tests/vite-tests` | `file:///Users/runner/work/vite-tests/vite-tests` |
| **windows-latest** | `D:\\a\\vite-tests\\vite-tests`            | `file:///D:/a/vite-tests/vite-tests`              |



---



## Results

| Plugin Hook      | Runs |
|:-----------------|-----:|
| `configResolved` |    4 |
| `build`          |    4 |
| `closeBundle`    |    4 |



### Results, when tracking the Astro file

| Plugin Hook | Runs |
|:------------|-----:|
| `resolveId` |   10 |
| `load`      |    2 |
| `transform` |    2 |



### Results, when tracking the JavaScript file

| Plugin Hook | Runs |
|:------------|-----:|
| `resolveId` |   18 |
| `load`      |    2 |
| `transform` |    2 |



### `configResolved` Hook

```js
{
  configResolved(
    /** @type {import('vite').ResolvedConfig} */ config
  ) {}
}
```

| Operating System   | Value of `config.root`                     |
|:-------------------|:-------------------------------------------|
| **ubuntu-latest**  | `/home/runner/work/vite-tests/vite-tests`  |
| **macos-latest**   | `/Users/runner/work/vite-tests/vite-tests` |
| **windows-latest** | `D:/a/vite-tests/vite-tests`               |



### `resolveId` Hook

```js
{
  resolveId(
    /** @type {string} */ sourceId,
    /** @type {string | undefined} */ importerId
  ) {}
}
```

| Operating System   | Value of `sourceId`, when observing `donald-duck.js`          |
|:-------------------|:---------------------------------------------------------|
| **ubuntu-latest**  | `/home/runner/work/vite-tests/vite-tests/src/donald-duck.js`  |
| **macos-latest**   | `/Users/runner/work/vite-tests/vite-tests/src/donald-duck.js` |
| **windows-latest** | `D:/a/vite-tests/vite-tests/src/donald-duck.js`               |
| **all** (run 3-6)  | `../donald-duck.js`                                           |
| **all** (run 7-18) | `/src/donald-duck.js`                                         |



| Operating System   | Value of `sourceId`, when observing `mickey-mouse.astro`        |
|:-------------------|:---------------------------------------------------------|
| **ubuntu-latest**  | `/home/runner/work/vite-tests/vite-tests/src/donald-duck.js`  |
| **macos-latest**   | `/Users/runner/work/vite-tests/vite-tests/src/donald-duck.js` |
| **windows-latest** | `D:/a/vite-tests/vite-tests/src/donald-duck.js`               |
| **all** (run 3-6)  | `../donald-duck.js`                                           |
| **all** (run 7-18) | `/src/donald-duck.js`                                         |



#### `resolveId` Hook, when the value of `sourceId` is `../donald-duck.js`

| Operating System   | Value of `importerId`                                            |
|:-------------------|:-----------------------------------------------------------------|
| **ubuntu-latest**  | `/home/runner/work/vite-tests/vite-tests/src/pages/mickey-mouse.astro`  |
| **macos-latest**   | `/Users/runner/work/vite-tests/vite-tests/src/pages/mickey-mouse.astro` |
| **windows-latest** | `D:/a/vite-tests/vite-tests/src/pages/mickey-mouse.astro`               |



#### `resolveId` Hook, when the value of `sourceId` is `/src/donald-duck.js`

| Operating System   | Value of `importerId`                                 |
|:-------------------|:------------------------------------------------------|
| **ubuntu-latest**  | `/home/runner/work/vite-tests/vite-tests/mickey-mouse.html`  |
| **macos-latest**   | `/Users/runner/work/vite-tests/vite-tests/mickey-mouse.html` |
| **windows-latest** | `D:\\a\\vite-tests\\vite-tests\\mickey-mouse.html`           |



### `load` Hook

```js
{
  load(
    /** @type {string} */ loadId
  ) {}
}
```

| Operating System   | Value of `loadId`                                        |
|:-------------------|:---------------------------------------------------------|
| **ubuntu-latest**  | `/home/runner/work/vite-tests/vite-tests/src/donald-duck.js`  |
| **macos-latest**   | `/Users/runner/work/vite-tests/vite-tests/src/donald-duck.js` |
| **windows-latest** | `D:/a/vite-tests/vite-tests/src/donald-duck.js`               |



### `transform` Hook

```js
{
  transform(
    /** @type {string} */ code,
    /** @type {string} */ transformId
  ) {}
}
```

| Operating System   | Value of `transformId`                                   |
|:-------------------|:---------------------------------------------------------|
| **ubuntu-latest**  | `/home/runner/work/vite-tests/vite-tests/src/donald-duck.js`  |
| **macos-latest**   | `/Users/runner/work/vite-tests/vite-tests/src/donald-duck.js` |
| **windows-latest** | `D:/a/vite-tests/vite-tests/src/donald-duck.js`               |



---



## Observations

- IDs analyzed in **ubuntu-latest** and **macos-latest** are consistently a posix-style path; tho sometimes a relative posix path.
- The IDs analyzed in **windows-latest** are inconsistent; sometimes a windows-style path, other times a windows-style path with posix slashes, and other times a relative posix path.
- The `astro build` command seems to run hooks 4 times;
  - 2 times in `serve` mode; and then,
  - 2 times in `build` mode.
  - [Related Vite Documentation](https://vitejs.dev/guide/env-and-mode.html#modes)



### Notable Path Inconsistencies in Windows

The value of `process.cwd()` might be `D:\\a\\vite-tests\\vite-tests`, while the value of `config.root` might be `D:/a/vite-tests/vite-tests`.

The value of `resolveId` might be `D:/a/vite-tests/vite-tests/src/donald-duck.js`, or `../donald-duck.js`, or `/src/donald-duck.js`, while the value of `importerId` might be empty, or `D:/a/vite-tests/vite-tests/src/pages/mickey-mouse.astro`, or `D:\\a\\vite-tests\\vite-tests\\mickey-mouse.html`.



### Plugin Observerations

While observing `configResolved`, the number of plugins seems to change.

- During the 1st run of hooks, there are 22 plugins.
- During the 3rd run of hooks, there are 30 plugins.
- During the 4th run of hooks, there are 52 plugins.



---



## Solutions

Import IDs can be normalized to posix with the following method:

```ts
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
```
