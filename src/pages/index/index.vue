<template>
  <view class="index bg-page">
    <view class="index__card bg-container shadow-1 m-2 p-2 radius-default">
      <view class="f-flex f-items-center f-justify-between mb-1">
        <text class="f-s-title-medium text-primary font-bold">布局工具类示例</text>
        <t-button size="small" theme="primary">操作</t-button>
      </view>

      <view class="f-flex f-gap-md mb-1">
        <view class="index__block bg-brand-light f-flex f-center w-4 h-4 radius-small text-brand">
          <text>A</text>
        </view>
        <view class="index__block bg-warning-light f-flex f-center w-4 h-4 radius-small text-warning">
          <text>B</text>
        </view>
        <view class="index__block bg-success-light f-flex f-center w-4 h-4 radius-small text-success">
          <text>C</text>
        </view>
      </view>

      <view class="mt-1">
        <text class="f-s-body-small text-secondary t-ellipsis-2">
          使用 dis- / f- / m- / p- / w- / h- / bg- / text- 等全局工具类，可以快速完成常见布局和间距，不需要在局部样式里重复写很多 CSS。
        </text>
      </view>
    </view>
  </view>
</template>

<script>
import './index.less'

export default {
  name: 'Index',
  components: {}
}
</script>
