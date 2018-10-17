<template>
  <div class="task">
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
      <b-button :disabled="task.isChange" type="submit" size="md" class="mt-3" variant="danger" @click="removeItem">Delete</b-button>
      <!-- <b-button :disabled="task.isChange" v-if="!task.checked" type="submit" size="md" class="mt-3" variant="danger" @click="removeItem">Delete</b-button> -->
    </ul>
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
        this.task.isChange = true;
        this.$emit('delete', this.task, this.index);
      },
    },
  };
</script>

<style scoped>

</style>