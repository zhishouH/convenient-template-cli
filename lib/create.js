const { program } = require('commander')
let { promisify } = require('util')
let asyncFiglet = promisify(require('figlet'))
let chalk = require('chalk')
let inquirer = require('inquirer')
const downloadRepo = require('./download-repo')

// 打印LOGO
async function printLogo() {
	let data = await asyncFiglet('convenient-template-cli')
	console.log(chalk.blue(data))
}

const createProject = () => {
	program
		.command('create <app-name>')
		.description('创建Vue项目')
		.action(async name => {
			await printLogo()

			// 选择语言版本
			let answer = await inquirer.prompt([
				{
					name: 'language',
					type: 'list',
					message: '请选择语言版本',
					choices: ['Javascript', 'Typescript'],
				},
			])

			// 执行后续操作
			if (answer.language == 'Javascript') {
				downloadRepo(name)
			} else {
				console.log(chalk.blue('敬请期待...'))
			}
		})
}

module.exports = createProject

