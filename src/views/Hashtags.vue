<template>
  <div class="home">
    <v-container>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>
          <v-icon>mdi-pound</v-icon> Hashtags
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
              <table-search v-model="search" @search="getHashtags"></table-search>
            </template>

            <template v-slot:item.export="{ item }">
              <v-btn small color="secondary" @click="exportData(item, 'excel')" class="mx-2 my-2">
                <v-icon>mdi-file-excel-outline</v-icon> Excel
              </v-btn>
              <v-btn small color="secondary" @click="exportData(item, 'json')" class="mx-2 my-2">
                <v-icon>mdi-json</v-icon> JSON
              </v-btn>
              <v-btn small color="secondary" @click="exportData(item, 'csv')" class="mx-2 my-2">
                <v-icon>mdi-file-delimited-outline</v-icon> CSV
              </v-btn>

            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn small color="primary" @click.stop="randomTweet(item)" class="mx-2 my-2">
                <v-icon>mdi-dice-multiple</v-icon> Tweet aleatorio
              </v-btn>

            </template>

          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <random-tweet-dialog v-model="randomDialog" :hashtag="selectedHashtag"></random-tweet-dialog>
  </div>
</template>

<script>
  import TableSearch from '@/components/TableSearch'
  import RandomTweetDialog from '@/components/RandomTweetDialog'
  export default {
    name: 'home',
    components: {
      TableSearch,
      RandomTweetDialog
    },
    data () {
      return {
        page: 1,
        totalItems: 0,
        search: '',
        tableOptions: {},
        randomDialog: false,
        selectedHashtag: {},
        headers: [
          {
            text: 'Hashtag',
            value: 'name',
            sortable: false
          },
          {
            text: 'ID',
            value: 'id',
            sortable: false
          },
          {
            text: 'Exportar',
            value: 'export',
            sortable: false
          },
          {
            text: 'Acciones',
            value: 'actions',
            sortable: false
          },
        ],
        items: []
      }
    },
    watch: {
      tableOptions: {
        handler () {
          this.getHashtags()
        },
        deep: true
      }
    },
    methods: {
      exportData (item, format) {
        window.open(`${process.env.VUE_APP_EXPORT_BASE}export/${item.id}/${format}`)
      },
      randomTweet(hashtag) {
        this.selectedHashtag = hashtag
        this.randomDialog = true
      },
      getHashtags () {
        this.$api.hashtag.list(this.page, this.search)
          .then(res => {
            this.items = res.data['hydra:member']
            this.totalItems = res.data['hydra:totalItems']
          })
      }
    },
    mounted () {
      this.$nextTick(() => this.getHashtags())
    }
  }
</script>
