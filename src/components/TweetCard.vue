<template>
  <v-card
      class="mx-auto"
      color="#26c6da"
      dark
      max-width="400"
  >
    <v-card-title>
      <v-icon
          large
          left
      >
        mdi-twitter
      </v-icon>
      <span class="title font-weight-light">
        <a :href="`https:/twitter.com/${tweet.userName}/status/${tweet.tweetId}`" class="twitter-link">Twitter</a>
      </span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{ tweet.content }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
              class="elevation-6"
              :src="tweet.userImage"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title><a :href="`https:/twitter.com/${tweet.userName}`" class="twitter-link">@{{tweet.userName}}</a></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    name: 'tweet-card',
    props: {
      tweet: {
        type: Object,
        required: true,
      }
    }
  }
</script>
<style scoped lang="scss">
  .twitter-link {
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
</style>
