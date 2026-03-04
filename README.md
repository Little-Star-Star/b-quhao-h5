## 项目概述

- **项目类型**：H5（Taro + Vue3）
- **技术栈**：TypeScript + Vue3 + Pinia + Less + TDesign Mobile Vue
- **设计稿基准**：750px（与设计稿 1:1 使用 px）
- **样式体系**：项目内自定义的一组全局样式工具类（颜色、间距、排版、布局等），统一通过 `src/app.less` 引入

## 目录结构

```text
b-quhao-h5/
├── src/
│   ├── app.ts            # 应用入口（Taro + Vue3）
│   ├── app.less          # 应用全局样式（导入 style 目录下的工具类）
│   ├── app.config.ts     # Taro 小程序 / H5 配置
│   ├── plugins/
│   │   └── tdesign.ts    # TDesign Mobile Vue 注册
│   ├── pages/
│   │   └── index/
│   │       ├── index.vue   # 页面组件（模板 + 逻辑）
│   │       ├── index.less  # 页面私有样式
│   │       └── index.config.ts
│   ├── stores/
│   │   └── counter.ts    # Pinia 示例 store
│   └── style/            # 全局样式工具类
│       ├── color.less
│       ├── font.less
│       ├── margin.less
│       ├── padding.less
│       ├── width.less
│       ├── height.less
│       ├── display.less
│       ├── flex.less
│       ├── border.less
│       ├── border-radius.less
│       ├── box-shadow.less
│       ├── box-sizing.less
│       ├── overflow.less
│       ├── text-align.less
│       ├── text-ellipsis.less
│       └── visibility.less
└── package.json
```

## Taro 使用规范

- **官方文档**
  - 文档地址：`https://docs.taro.zone/docs/`
  - 如有不确定的 API / 配置，优先以官方文档为准。

- **运行与构建（多端命令约定）**
  - H5 本地开发：`npm run dev:h5`
  - H5 打包构建：`npm run build:h5`
  - 小程序 / 其他端根据需要使用：`dev:weapp`、`dev:alipay`、`dev:rn` 等脚本（见 `package.json`），保持**同一份代码，多端构建**的思路，不要为不同端分叉代码目录。

- **设计稿与尺寸**
  - 本项目在 `config/index.ts` 中配置：`designWidth = 750`。
  - 代码统一使用 `px`，与 750 宽设计稿 1:1 对应；如需调整不同端的适配策略，统一通过 `config/index.ts` 的 `designWidth`、`deviceRatio` 与 postcss 配置处理，不要在业务代码里写死各种换算逻辑。

- **组件与模板**
  - 页面模板统一使用 Taro 组件：`<view>`、`<text>` 等（来自 `@tarojs/components`），不要直接写原生 DOM 标签到处混用。
  - 页面入口通过 `src/app.config.ts` 声明路由与 TabBar；**不要自行引入 `vue-router` 做 SPA 路由**，以免破坏 Taro 的多端路由体系。
  - 单个页面的标题等配置写在 `pages/**/index.config.ts` 中（如 `navigationBarTitleText`），不要在运行时用 `document.title` 等方式改标题。

- **跨端 API 使用**
  - 不直接使用 `window`、`document`、`location`、`alert` 等浏览器原生 API，统一使用 `@tarojs/taro` 提供的跨端 API：
    - 如跳转：`Taro.navigateTo` / `Taro.switchTab`
    - 如提示：`Taro.showToast`、`Taro.showModal`
    - 如网络：可后续封装基于 `Taro.request` 的请求层
  - 如必须使用仅 H5 可用的浏览器 API，需：
    - 明确标注为 H5 专用逻辑（例如放在 `process.env.TARO_ENV === 'h5'` 的分支里）
    - 避免影响其他端的构建与运行。

- **生命周期与页面逻辑**
  - 业务页面以 Vue3 组件形式编写，但生命周期应优先使用 Taro 提供的页面生命周期（如 `onShow`、`onHide` 等），通过 Taro Vue3 的组合式 API 或 hooks 使用。
  - 与端相关的逻辑（如重新拉取数据、重置状态）优先挂在 `onShow`、`onHide`，而不是只写在 Vue 的 `onMounted` 里。

- **配置统一管理**
  - 全局配置集中在 `config/index.ts`，按环境拆分 `dev.ts` / `prod.ts`，不要在业务代码中硬编码环境差异。
  - H5 相关公共资源路径、打包目录等统一通过 `h5` 配置项维护（如 `publicPath`、`staticDirectory`、输出文件命名等）。

## 样式编码规范（单位为 px）

- **【最重要】优先使用全局样式工具类**
  - 模板中尽量使用 `src/style/` 下的工具类（如 `f-flex`、`m-2`、`bg-container`、`text-primary` 等）
  - 只有当工具类无法满足需求时，才在对应页面的 `index.less` 中写局部样式
  - 通过全局工具类统一颜色、间距、圆角、阴影、布局，减少重复样式

- **单位规范**
- 统一使用 `px`，与 750 宽设计稿保持 1:1 显示
- 设计稿是多少 px，代码就写多少 px（例如设计稿 16px → 代码 16px）

- **颜色与设计 Token**
  - 必须使用 `color.less` 中定义的 CSS 变量，如：
    - 背景：`var(--bg-color-page)`、`var(--bg-color-container)`
    - 文本：`var(--text-color-primary)`、`var(--text-color-secondary)`
    - 品牌：`var(--brand-color)`、`var(--warning-color)`
  - 禁止在业务样式中直接写颜色值（如 `#333`, `rgba(...)`）

- **布局与间距**
  - 能用常规流式布局 + `margin` / `padding` 解决的，不额外上 flex
  - Flex 相关统一使用 `flex.less` 中的工具类：`f-flex`、`f-col`、`f-center`、`f-gap-md` 等
  - 间距统一使用 `margin.less` / `padding.less` 中的工具类：`m-1`、`mt-2`、`px-md` 等

- **BEM 命名规范（局部样式）**
  - Block：`.index`、`.order-page`
  - Element：`&__header`、`&__btn`
  - Modifier：`&--primary`、`&--warning`
  - 示例：

```less
.index {
  &__header {
    /* 局部样式（全局工具类不方便表达时再写） */
  }

  &__btn {
    &--primary {
      background-color: var(--brand-color);
    }
  }
}
```

## Vue / TS 编码规范

- **文件命名**
  - 统一使用 kebab-case：`index.vue`、`order-detail.vue`、`order-detail.less`

- **组件模板（`.vue`）**
  - 模板标签中优先使用全局工具类：
    - `class="f-flex m-2 p-3 bg-container text-primary"`
  - 多个类的顺序建议：`display → margin → padding → width/height → border → box-shadow → border-radius → background → font → color → box-sizing → overflow`

- **脚本部分**
  - 使用 TypeScript（`<script lang="ts" setup>` 或普通 `<script lang="ts">`）
  - 变量 / 函数使用 camelCase：`isLoading`、`handleSubmit`
  - 组件名使用 PascalCase：`IndexPage`、`OrderDetail`
  - 严格使用单引号和分号：
    - `const name = 'value';`

- **状态管理（Pinia）**
  - store 文件放在 `src/stores/`，文件名 kebab-case，storeId 使用有意义的命名：`useCounterStore`
  - store 内类型、常量命名同 TS 规范（接口推荐以 `I` 开头，例如 `IHomeState`、`ICounterState`）

## TDesign Mobile Vue 使用规范

- **官方文档**：请参考 TDesign Mobile Vue 官方文档了解组件属性与事件
- 在 `src/plugins/tdesign.ts` 中统一注册组件，不在业务组件里重复注册
- 业务组件中直接使用 `<t-button>`、`<t-dialog>` 等标签
- 布尔 / 对象属性建议使用 Vue 标准写法：
  - `:loading="loading"`、`:style="{ marginTop: '32px' }"`

## 提交前检查

- **样式**
  - 检查模板中是否优先使用了全局工具类，而不是到处写局部样式
  - 检查是否有未使用的 class / 空样式块，存在则删除

- **代码风格**
  - TS / Vue 代码是否统一使用单引号、分号、2 空格缩进
  - 对复杂逻辑增加必要注释

- **文档维护**
  - 若目录结构有明显调整（新增页面、全局样式目录变更等），需要同步更新本 `README.md` 的目录结构和约定说明

