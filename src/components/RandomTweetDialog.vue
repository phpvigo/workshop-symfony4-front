<template>
  <v-dialog v-model="localValue" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Tweet aleatorio {{ hashtag.name }}</span>
      </v-card-title>

      <v-card-text>
        <div v-if="!showTweet" class="dices-wrapper">
          <dices :animated="animatedDices"></dices>
        </div>

        <tweet-card
          :tweet="tweet"
          v-if="showTweet"
          class="my-8"
        ></tweet-card>

        <div class="text-center">
          <v-btn large color="primary" @click="getRandomTweet" :loading="animatedDices">
            <v-icon>mdi-dices-multiple</v-icon> Obtener tweet aletatorio
          </v-btn>
        </div>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click="close">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import Dices from '@/components/Dices'
  import TweetCard from '@/components/TweetCard'
  export default {
    name: 'random-tweet-dialog',
    components: {
      Dices,
      TweetCard
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      hashtag: {
        type: Object,
        required: true,
        default: () => ({})
      }
    },
    data () {
      return {
        animatedDices: false,
        localValue: this.value,
        tweet: {}
      }
    },
    computed: {
      showTweet () {
        return this.tweet.id
      }
    },
    methods: {
      close () {
        this.localValue = false
      },
      getRandomTweet() {
        this.animatedDices = true
        this.tweet = {}
        setTimeout(() => {
          this.animatedDices = false
          this.$api.tweet.getRandom(this.hashtag).
            then((res) => {
              this.tweet = res.data
            })
        }, 2000)
      }
    },
    watch: {
      localValue (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.tweet = {}
        this.localValue = val
      }
    }
  }
</script>
<style>
  .dices-wrapper {
    position: relative;
    width: 200px;
    padding-top: 100px;
    margin: 0 auto;
    perspective: 1200px;
    min-height: 400px;
  }
</style>
