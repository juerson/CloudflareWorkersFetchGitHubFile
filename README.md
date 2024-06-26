该代码库的作用，通过 cloudflare worker 访问 GitHub 的私有代码库中的文件内容。



### 一、设置访问GitHub私有文件所需的参数（有两种方法）

- 第一种方法：在 Cloudflare Workers/Pages 中设置变量（推荐）


| 参数             | 含义                                                         |
| ---------------- | ------------------------------------------------------------ |
| GITHUB_TOKEN     | GitHub访问令牌，用于授权请求（获取方法，在后面）             |
| GITHUB_OWNER     | 仓库所有者的用户名，填您的GitHub用户名                       |
| GITHUB_REPO      | 私有文件所在的仓库名称                                       |
| GITHUB_BRANCH    | 私有文件所在的分支名称，通常是main，如果您创建了其它分支，就改为您创建的分支名称 |
| GITHUB_FILE_PATH | 私有文件所在的路径（是相对路径，不是绝对路径）               |

<img src="images\1.png" />

- 第二种方法：在`_worker.js`源码中设置默认值（不推荐）

与前面设置变量效果一样，名称不同而已，该方法可能会泄露您的 GitHub token。

<img src="images\2.png" />

##### GITHUB_TOKEN 值怎么获取？

1、获取 GitHub token 的地址：[link](https://github.com/settings/tokens)

2、获取 GitHub token 的教程

- 【官方版】创建 personal access token (classic) 的教程：[link](https://docs.github.com/zh/enterprise-server@3.10/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#%E5%88%9B%E5%BB%BA-personal-access-token-classic)
- 如何在 GitHub 生成经典的个人访问令牌(token)：[link](https://medium.com/@mbohlip/how-to-generate-a-classic-personal-access-token-in-github-04985b5432c7)

### 二、测试地址

```
https://lively-truth-bb80.{您的子域}.workers.dev/fetch-github-file
```

