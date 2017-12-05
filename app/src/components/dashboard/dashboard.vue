<template>
  <div id="dashboard" class="container">
    <h1>Notizen</h1>
    <div class="row">
      <div class="col-12 col-md-6">
        Offene Notizen
        <show-task 
          v-for="(unchecked, index) in unchecked_tasks" 
          :key="unchecked.id" 
          :task="unchecked"
          :index="index"
          @checked="onCheck">
        </show-task>
      </div>
      <div class="col-12 col-md-6">
        Archivierte Notizen
        <show-task 
          v-for="(checked, index) in checked_tasks" 
          :key="checked.id" 
          :task="checked"
          :index="index"
          @checked="onCheck">
        </show-task>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios';
  import Task from '../task/task';

  export default {
    name: 'dashboard',
    components: {
      'show-task': Task,
    },
    data() {
      return {
        unchecked_tasks: [],
        checked_tasks: [],
        debugtasks: null,
      };
    },
    created() {
      this.$store.dispatch('fetchUser');
      const config = {
        headers: { Authorization: 'Bearer ' + this.$store.state.apiToken },
      };
      axios.get('/tasks', config)
        .then((res) => {
          this.debugtasks = res.data;
          /* eslint-disable no-restricted-syntax */
          for (let i = res.data.length - 1; i >= 0; i -= 1) {
            if (res.data[i].checked) {
              this.checked_tasks.push(res.data[i]);
            } else {
              this.unchecked_tasks.push(res.data[i]);
            }
          }
        });
    },
    methods: {
      onCheck(task, index) {
        console.log(task.checked);
        if (task.checked) {
          task.checked = 0;
          this.unchecked_tasks.push(task);
          this.checked_tasks.splice(index, 1);
        } else {
          task.checked = 1;
          this.checked_tasks.push(task);
          this.unchecked_tasks.splice(index, 1);
        }
      },
    },
    computed: {
      email() {
        return !this.$store.getters.user ? false : this.$store.getters.user.email;
      },
    },
  };
</script>

<style scoped>

</style>