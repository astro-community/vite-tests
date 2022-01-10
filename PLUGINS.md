# Astro Vite Plugins

This document analyzes the Vite Plugins that run in Astro.

- [Read the results](#results).
- [Read the observations](#observations).



## Results

From [research](./README.md), there are anywhere between 22, 30, and 52 plugins running at a time.



### Usage of Hooks Out-of-the-Box

#### `astro dev` (run 1 of 2 times it runs)

| Type of Hook      | Used by # of Plugins |
|:------------------|---------------------:|
| `configResolved`  |                    4 |
| `options`         |                    0 |
| `configureServer` |                    5 |
| `buildStart`      |                    5 |
| `resolveId`       |                    8 |
| `load`            |                    8 |
| `transform`       |                   11 |
| `moduleParsed`    |                    0 |
| `buildEnd`        |                    0 |
| `outputOptions`   |                    0 |
| `renderStart`     |                    0 |
| `renderChunk`     |                    2 |
| `generateBundle`  |                    2 |
| `writeBundle`     |                    0 |
| `handleHotUpdate` |                    1 |

#### `astro dev` (run 2 of 2 times it runs)

| Type of Hook      | Number of Times Used |
|:------------------|---------------------:|
| `configResolved`  |                    4 |
| `options`         |                    0 |
| `configureServer` |                    5 |
| `buildStart`      |                    5 |
| `resolveId`       |                    8 |
| `load`            |                    8 |
| `transform`       |                   11 |
| `moduleParsed`    |                    0 |
| `buildEnd`        |                    0 |
| `outputOptions`   |                    0 |
| `renderStart`     |                    0 |
| `renderChunk`     |                    2 |
| `generateBundle`  |                    2 |
| `writeBundle`     |                    0 |
| `handleHotUpdate` |                    1 |



#### `astro build` (runs 1-2 of 4 times it runs)

| Type of Hook      | Used by # of Plugins |
|:------------------|---------------------:|
| `configResolved`  |                    4 |
| `options`         |                    0 |
| `configureServer` |                    5 |
| `buildStart`      |                    5 |
| `resolveId`       |                    8 |
| `load`            |                    8 |
| `transform`       |                   11 |
| `moduleParsed`    |                    0 |
| `buildEnd`        |                    0 |
| `outputOptions`   |                    0 |
| `renderStart`     |                    0 |
| `renderChunk`     |                    2 |
| `generateBundle`  |                    2 |
| `writeBundle`     |                    0 |
| `handleHotUpdate` |                    1 |



#### `astro build` (runs 3-4 of 4 times it runs)

| Type of Hook      | Number of Times Used |
|:------------------|---------------------:|
| `configResolved`  |                    5 |
| `options`         |                    1 |
| `configureServer` |                    3 |
| `buildStart`      |                    8 |
| `resolveId`       |                   12 |
| `load`            |                   14 |
| `transform`       |                   16 |
| `moduleParsed`    |                    1 |
| `buildEnd`        |                    1 |
| `outputOptions`   |                    1 |
| `renderStart`     |                    1 |
| `renderChunk`     |                    6 |
| `generateBundle`  |                    7 |
| `writeBundle`     |                    1 |
| `handleHotUpdate` |                    1 |



## Observations

None.