#!/usr/bin/env node

const program = require('commander')
const createProject = require('./lib/create')

// 定义显示模块的版本号
program.version(require('./package.json').version)

// 创建项目
createProject()

// 解析终端指令
program.parse(process.argv)

