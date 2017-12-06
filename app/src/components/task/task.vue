<template>
  <div class="col-12">
    <input type="checkbox" 
      :id="task.id" 
      :checked="task.checked ? 'checked' : ''" 
      :value="task.id" 
      @click="onCheckItem"
      :disabled="task.isChange"
      >
    <label :for="task.id">{{ task.title }}</label>
    <ul>
      <li><b>isChange:</b> {{ task.isChange }}</li>
      <li><b>checked:</b> {{ task.checked }}</li>
      <li><b>created_at:</b> {{ task.created_at }}</li>
      <li><b>id:</b> {{ task.id }}</li>
      <li><b>title:</b> {{ task.title }}</li>
      <li><b>updated_at:</b> {{ task.updated_at }}</li>
      <li><b>user_id:</b> {{ task.user_id }}</li>
    </ul>
    <!-- <a href="javascript:void(0);" v-if="typ !== 'checked'" @click="removeItem">Remove</a> -->
  </div>
</template>

<script>
  export default {
    name: 'task-overview',
    props: ['task', 'index'],
    methods: {
      onCheckItem(/* event */) {
        this.task.isChange = true;
        this.$emit('checked', this.task, this.index);
      },
      removeItem(/* event */) {
      },
    },
  };
</script>

<style scoped>

</style>