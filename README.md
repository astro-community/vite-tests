# Vite Tests

This project analyzes an Vite project in different operating systems, checking for how often plugin hooks are run and for what values they return.

- [Read the results](#results).
- [Read the observations](#observations).



### Details

The test runs `vite build` on a project with one `index.html` file and no external references. In the configuration file, a single plugin is added to track how often certain hooks are used.

These are the contents of `index.html`:

```html
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width" />
		<title>/index.html</title>
	</head>
	<body>
		<h1>/index.html</h1>
	</body>
</html>
```

These are the hooks that are tested:

- `configResolved`
- `resolveId`
- `load`
- `transform`
- `buildEnd`
- `closeBundle`

These are a few values we can check in each operating system:

| Operating System   | Value of `process.cwd()`                   |
|:-------------------|:-------------------------------------------|
| **ubuntu-latest**  | `/home/runner/work/vite-tests/vite-tests`  |
| **macos-latest**   | `/Users/runner/work/vite-tests/vite-tests` |
| **windows-latest** | `D:/a/vite-tests/vite-tests`               |



---



## Results

| Plugin Hook      | Runs |
|:-----------------|-----:|
| `configResolved` |    1 |
| `resolveId`      |    0 |
| `build`          |    1 |
| `transform`      |    1 |
| `buildEnd`       |    1 |
| `closeBundle`    |    1 |


---



## Observations

None, yet.



---



## Solutions

None, yet.
