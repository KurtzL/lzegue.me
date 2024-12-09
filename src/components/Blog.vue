<script lang="ts" setup>
const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    v-if="frontmatter.display ?? frontmatter.title"
    class="prose m-auto mb-8"
    :class="[frontmatter.wrapperClass]"
  >
    <h1 class="mb-0">
      {{ frontmatter.display ?? frontmatter.title }}
    </h1>
  </div>
  <article
    ref="content"
    :class="[frontmatter.tocAlwaysOn ? 'toc-always-on' : '', frontmatter.class]"
  >
    <slot />
  </article>
</template>
