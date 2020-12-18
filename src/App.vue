<template>
  <controls></controls>
  <content></content>
</template>

<script>
import Controls from './components/controls/Controls.vue'
import Content from './components/content/Content.vue'

export default {
  
  name: 'App',

  components: { Controls, Content }

}
</script>
