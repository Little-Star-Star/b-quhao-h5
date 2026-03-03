import type { App } from 'vue'
import { Button } from 'tdesign-mobile-vue'

import 'tdesign-mobile-vue/es/button/style/index.css'

export function setupTDesign(app: App) {
  app.use(Button)
}

