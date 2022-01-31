<script>
import { defineComponent } from 'vue'
export default defineComponent({
    setup(){},
    props: {
        tags: {
            type: Object,
            default: () => {
                return {};
            }
        }
    }
})
</script>

<template>
<div>
<span class="red" :key="tag.text" v-for="tag in tags">{{ tag.text }}</span>
</div>
</template>

<style>
.red {
  color: red;
  padding: 2px;
}
</style>