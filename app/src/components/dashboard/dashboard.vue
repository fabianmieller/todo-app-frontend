<template>
  <div id="dashboard" class="container">
    <h1 class="display-2">Notizen</h1>
    <h2>Neue Notizen</h2>
    <new-task @newTask="createNewTask"></new-task>
    <hr class="mt-5 mb-5">
    <div class="row">
      <div class="col-12">
        <p>Status:</p>
        <div class="progress">
          <div class="progress-bar progress-bar-striped progress-bar-animated bg-success status" role="progressbar" :aria-valuenow="status" aria-valuemin="0" aria-valuemax="100" :style="'width: '+status+'%'">{{status+"%"}}</div>
        </div>
      </div>
    </div>
    <hr class="mt-5 mb-5">
    <div class="row">
      <div class="col-12 col-md-6">
        <h2>Offene Notizen</h2>
          <show-task 
            v-for="(unchecked, index) in unchecked_tasks" 
            :key="unchecked.id" 
            :task="unchecked"
            :index="index"
            @checked="onCheck"
            @delete="removeTask">
          </show-task>
      </div>
      <div class="col-12 col-md-6">
        <h2>Archivierte Notizen</h2>
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
  import NewTask from '../task/new-task';

  export default {
    name: 'dashboard',
    components: {
      'new-task': NewTask,
      'show-task': Task,
    },
    data() {
      return {
        unchecked_tasks: [],
        checked_tasks: [],
      };
    },
    created() {
      this.$store.dispatch('fetchUser');
      const config = {
        headers: { Authorization: 'Bearer ' + this.$store.state.apiToken },
      };
      axios.get('/tasks', config)
        .then((res) => {
          /* eslint-disable no-restricted-syntax */
          for (let i = res.data.length - 1; i >= 0; i -= 1) {
            res.data[i].isChange = false;
            if (res.data[i].checked) {
              this.checked_tasks.push(res.data[i]);
            } else {
              this.unchecked_tasks.push(res.data[i]);
            }
          }
        });
    },
    methods: {
      createNewTask(newTask) {
        console.log(newTask);
        this.unchecked_tasks.push(newTask);
      },
      onCheck(task, index) {
        const status = !task.checked;
        this.updateTask(task, index, status);
      },
      updateTask(task, index, status) {
        const config = {
          headers: { Authorization: 'Bearer ' + this.$store.state.apiToken },
        };
        let updatedTask = {};
        axios.put('/tasks/' + task.id, {
          title: task.title,
          checked: status,
        }, config)
        .then((res) => {
          updatedTask = res.data;
          updatedTask.isChange = false;
          if (!status) {
            this.checked_tasks.splice(index, 1);
            this.unchecked_tasks.push(updatedTask);
          } else {
            this.unchecked_tasks.splice(index, 1);
            this.checked_tasks.push(updatedTask);
          }
        })
        .catch(error => console.log('Error:' + error));
      },
      removeTask(task, index) {
        const config = {
          headers: { Authorization: 'Bearer ' + this.$store.state.apiToken },
        };
        axios.delete('/tasks/' + task.id, config)
        .then((res) => {
          console.log(res);
          this.unchecked_tasks.splice(index, 1);
        })
        .catch(error => console.log('Error:' + error));
      },
    },
    computed: {
      email() {
        return !this.$store.getters.user ? false : this.$store.getters.user.email;
      },
      status() {
        const checkedSum = this.checked_tasks.length;
        const allTasks = this.unchecked_tasks.length + checkedSum;
        let status = 0;
        if (checkedSum > 0) {
          status = (checkedSum / allTasks) * 100;
        }
        status = status.toFixed(0);
        return status;
      },
    },
  };
</script>

<style scoped>

</style>