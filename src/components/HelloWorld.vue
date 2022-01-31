<script>
import { defineComponent, ref } from "vue";
import gql from "graphql-tag";
import TagList from "./TagList.vue";

export default defineComponent({
  
  setup() {
    const now = new Date().toISOString()
    const searchTags = ref('')
    const newEventTitle = ref('')
    return {
      searchTags,
      now,
      newEventTitle
    }
  },
  components: {
    TagList,
  },
  data() {
    return {
      events: [],
    };
  },
  methods: {
    addEvent() {
      this.$apollo.mutate({
        mutation: gql`
          mutation ($title: String!) {
            addEvent(input: [{
              title: $title,
              startTime: "2022-01-31T07:37:24.330Z"
              startTimeYear: "2021"
              startTimeMonth: "January"
              startTimeDayOfMonth: "1"
              startTimeDayOfWeek: "Monday"
              startTimeHourOfDay: 1
              endTime: "2022-01-31T07:37:24.330Z"
              Channels: [{ uniqueName: "cats" }]
              Poster: { username: "cluse" }
              canceled: false
            }]) {
              event {
                id
                title
              }
            }
          }
        `,
        variables: {
          title: this.newEventTitle
        }
      })
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
    }
  },
  apollo: {
    // simple version:
    // events: gql`query ($searchTags: String){
    //   events: queryEvent @cascade(fields: ["Tags"]){
    //     id
    //     title
    //     Tags (
    //       filter: {
    //         text: {
    //           allofterms: $searchTags
    //         }
    //       }
    //     ) {
    //       text
    //     }
    //   }
    // }`,

    // parameterized version for tags:
    events: {
      query: gql`
        query ($searchTags: String) {
          events: queryEvent {
            id
            title
            Tags(filter: { text: { anyofterms: $searchTags } }) {
              text
            }
          }
        }
      `,
      variables() {
        return {
          searchTags: this.searchTags,
        };
      },
    },


    // parameterized version for title search:
    // events: {
    //   query: gql`
    //     query($searchTags: String) {
    //       events: queryEvent (filter: {
    //         title: { alloftext: $searchTags }
    //       }){
    //         id
    //         title
    //       }
    //     }
    //   `,
    //   variables() {
    //     return {
    //       searchTags: this.searchTags
    //     }
    //   }
    // }
  },
});
</script>

<template>
  <div>
    <h3>Create Event Title</h3>
    <input v-model="newEventTitle" @input="(e) => (newEventTitle = e.target.value)"/>
    <button @click="addEvent">Submit</button>
    
    <h3>Search Tags</h3>
    <input v-model="searchTags" @input="(e) => (searchTags = e.target.value)" />
    
    <div v-if="$apollo.loading">Loading...</div>
    <p :key="event.id" v-for="event in events">
      {{ event.title }}
      <TagList :tags="event.Tags" />
    </p>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
