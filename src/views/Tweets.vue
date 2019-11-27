<template>
  <div class="tweets">
    <v-container>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>
          <v-icon>mdi-twitter</v-icon> Tweets
        </v-toolbar-title>
        <v-spacer>
        </v-spacer>
      </v-toolbar>

      <v-alert type="info" dismissible class="mt-3 mb-0">
        Tweets obtenidos desde el comando de consola <pre style="display: inline">licensedrawer:tweet:fetch</pre>
      </v-alert>

      <v-row>
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="items"
              :options.sync="tableOptions"
              :server-items-length="totalItems"
              :items-per-page="30"
              class="elevation-1"
              :footerProps="{itemsPerPageOptions: [30]}"
          >
            <template v-slot:top>
              <table-search v-model="search" @search="getTweets"></table-search>
            </template>

            <template v-slot:item.userImage="{ item }">
              <v-avatar class="my-1">
                <v-img :src="item.userImage" />
              </v-avatar>
            </template>

            <template v-slot:item.link="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                      small
                      color="blue"
                      dark
                      alt="{item.tweetId}"
                      v-on="on"
                      :href="`https://twitter.com/${item.userName}/status/${item.tweetId}`"
                  >
                    <v-icon>mdi-twitter</v-icon>
                  </v-btn>
                </template>
                <span>
                  {{ item.tweetId }}
                </span>
              </v-tooltip>
            </template>

            <template v-slot:item.createdAt="{ item }">
              <v-chip>
                <v-icon small class="mr-2">mdi-clock-outline</v-icon> {{ item.createdAt | moment('D-M-Y')}}  <strong class="ml-2">{{ item.createdAt | moment('h:m') }}</strong>
              </v-chip>
            </template>

          </v-data-table>
        </v-col>
      </v-row>


    </v-container>

  </div>
</template>

<script>
  import TableSearch from '@/components/TableSearch'
  export default {
    name: 'home',
    components: {
      TableSearch
    },
    data () {
      return {
        page: 1,
        search: '',
        tableOptions: {},
        totalItems: 0,
        headers: [
          {
            text: 'Avatar',
            value: 'userImage',
            sortable: false,
          },
          {
            text: 'Usuario',
            value: 'userName'
          },
          {
            text: 'ID',
            value: 'id'
          },
          {
            text: 'Tweet',
            value: 'link',
            sortable: false,
          },
          {
            text: 'Hashtag',
            value: 'hashtagName'
          },
          {
            text: 'Contenido',
            value: 'content',
            sortable: false,
          },
          {
            text: 'Fecha creacion',
            value: 'createdAt'
          },
        ],
        items: []
      }
    },
    watch: {
      tableOptions: {
        handler () {
          this.getTweets()

        },
        deep: true
      }
    },
    methods: {
      exportData () {

      },
      getTweets () {
        this.$api.tweet.list(
          this.page,
          this.search,
          this.tableOptions.sortBy,
          this.tableOptions.sortDesc
        )
          .then(res => {
            this.items = res.data['hydra:member']
            this.totalItems = res.data['hydra:totalItems']
          })
      }
    },
    mounted () {
      this.$nextTick(() => this.getTweets())
    }
  }
</script>
