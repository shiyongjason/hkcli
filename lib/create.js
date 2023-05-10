
// create.js
// 当前函数中可能存在很多异步操作，因此我们将其包装为 async

const path = require('path')
// fs-extra 是对 fs 模块的扩展，支持 promise 语法
const fs = require('fs-extra')
// 询问
const inquirer = require('inquirer');
const ora = require('ora')
const Generator = require('./generator')


module.exports = async function (projectName, options) {
  console.log(projectName, options);
  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetAir = path.join(cwd, projectName)
  console.log("🤡 ~ targetAir:-( ", targetAir)

  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {

    // 是否为强制创建？
    if (options.force) {
      console.log("🤡 ~ options:-( ", options)
      await fs.remove(targetAir)
    } else {
      // TODO：询问用户是否确定要覆盖
      // 询问用户是否确定要覆盖

      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            }, {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        const spinner = ora('Removing...')
        spinner.start()
        await fs.remove(targetAir)
        spinner.succeed()
      }

    }
  }

  // 创建项目
  const generator = new Generator(projectName, targetAir);
  // 开始创建项目
  generator.create()
}
