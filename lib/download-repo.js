let { promisify } = require('util')
const ora = require('ora')
const download = promisify(require('download-git-repo'))
const shell = require('shelljs')
let chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const templateRepo =
	'direct:https://github.com/zhishouH/convenient-template.git#main'

const downloadRepo = async name => {
	shell.rm('-rf', name)
	const spinner = ora(`🚀 正在创建项目 ${name}
		`).start()

	try {
		await download(templateRepo, name, { clone: true })

		// 修改 package.json 文件中的 name 字段
		const packageJsonPath = path.join(name, 'package.json')
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

		// 替换 package.json 中的 name 字段
		packageJson.name = name

		// 写回修改后的 package.json
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

		console.log(
			chalk.green(`
创建成功，请运行以下代码：
cd ${name}
pnpm install
pnpm run dev


`)
		)

		spinner.stop()
	} catch (error) {
		console.log(chalk.red(`创建失败, ${error}`))

		spinner.stop()
	}
}

module.exports = downloadRepo

