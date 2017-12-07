<template>
  <div class="new-task">
    <b-form novalidate :validated="false" class="row" @submit.prevent="onSubmitTask">
      <div class="col-12 col-md-6">
        <b-form-group id="email-group">
          <label for="title-input">Titel:</label>
          <b-form-input v-model="taskTitle"
                    type="text"
                    :state="titleState"
                    placeholder="Enter your title"
                    id="title-input" required></b-form-input>
          <div class="invalid-feedback">
            Please enter a title.
          </div>
        </b-form-group>
        <div class="submit">
          <b-button type="submit" size="md" variant="primary">Submit</b-button>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <label for="category-input">Kategorien: (Mehrfachauswahl möglich)</label>
        <b-form-select multiple disabled id="category-input" :select-size="4" v-model="selected" :options="options"></b-form-select>
      </div>
    </b-form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'new-task',
    props: [],
    data() {
      return {
        taskTitle: '',
        selected: [],
        options: [
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Default Selected Option' },
          { value: 'c', text: 'This is another option' },
          { value: 'e', text: 'This is option e' },
          { value: 'f', text: 'This is option f' },
          { value: 'g', text: 'This is option g' },
        ],
      };
    },
    computed: {
      titleState() {
        return this.taskTitle.length > 1 ? true : false;
      },
    },
    methods: {
      onSubmitTask(/* event */) {
        if (this.titleState) {
          const task = {
            title: this.taskTitle,
            categories: this.selected,
          };
          const config = {
            headers: { Authorization: 'Bearer ' + this.$store.state.apiToken },
          };
          axios.post('/tasks/', task, config)
          .then((res) => {
            console.log(res.data);
            const newTask = res.data;
            newTask.isChange = false;
            this.taskTitle = '';
            this.selected = [];
            this.$emit('newTask', newTask);
          })
          .catch(error => console.log('Error:' + error));
        }
      },
    },
  };
</script>

<style scoped>

</style>