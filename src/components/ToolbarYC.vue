<script>
import { ref } from 'vue';
import router from "@/router";

export default {
  name: "ToolbarYC",
  setup(){
    const items = ref([
      {
        label: 'Log out',
        icon: 'pi pi-times',
        command: () => {
          router.push('/login');
        }
      }
    ]);
    return {
      items
    }
  },
  methods: {
    createPost() {
      router.push('/createPost');
    }
  }
}
</script>

<template>
  <Toolbar>
    <template #start>
      <b class="title">YC</b>
      <Button icon="pi pi-upload" @click="createPost()" ></Button>
    </template>
    <template #end> <SplitButton  icon="pi pi-user" :model="items"></SplitButton></template>
  </Toolbar>
</template>

<style scoped>
.title{
  padding-right:20px;
}
</style>