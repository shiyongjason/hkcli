## commander 的用法

usage(): 设置 usage 值
command(): 定义一个命令名字
description(): 设置 description 值
option(): 定义参数，需要设置“关键字”和“描述”，关键字包括“简写”和“全写”两部分，以”,”,”|”,”空格”做分隔。
parse(): 解析命令行参数 argv
action(): 注册一个 callback 函数
version() : 终端输出版本号

根据日常开发需要，我们创建以下几个脚手架命令

add 新增一个项目模板
<!-- delete 删除一个项目模板 -->
list 列举所以项目模板
init 初始化一个项目模板


# inquirer 命令行交互工具

# fs 的扩展工具  fs-extra 创建目录

# download-git-repo  下载远程模板


### 现在你可以用下面的命令来创建项目了👇
```bash
hk-cli create <project-name>
```