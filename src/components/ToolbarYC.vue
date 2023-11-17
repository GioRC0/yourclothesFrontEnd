<script>
import { ref } from 'vue';


export default {
  name: "ToolbarYC",
  setup(){
    const items = ref([
      {
        label: 'Update',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      }
    ]);
    return {
      items
    }
  }
}
</script>

<template>
  <Toolbar>
    <template #start>
      <Button icon="pi pi-plus" class="mr-2" />
      <Button icon="pi pi-print" class="mr-2" />
      <Button icon="pi pi-upload" />
    </template>

    <template #center>
        <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Search" />
        </span>
    </template>

    <template #end> <SplitButton label="Save" icon="pi pi-check" :model="items"></SplitButton></template>
  </Toolbar>
</template>

<style scoped>

</style>