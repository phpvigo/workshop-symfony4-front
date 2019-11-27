<template>
  <div class="tweets">
    <v-container>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>
          <v-icon>mdi-account-group</v-icon> Usuarios
        </v-toolbar-title>
        <v-spacer>
        </v-spacer>
      </v-toolbar>

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
              <component :is="userDialogComponent" v-model="formDialog" :item="editedItem" :errors="editedItemErrors" @save="onSaveUser"></component>
            </template>

            <template v-slot:item.roles="{ item }">
              <v-chip v-for="(role, index) in item.roles" :key="index" class="mx-1 my-1">
                {{ role }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn small icon color="error" @click="deleteUser(item.id)" class="mx-2 my-2">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn x-small fab color="primary" @click="editUser(item.id)" class="mx-2 my-2">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>

          </v-data-table>
        </v-col>
      </v-row>

      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn fab fixed bottom right color="primary" v-on="on" @click.stop="createUser">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>
        Añadir usuario
      </span>
      </v-tooltip>

    </v-container>

  </div>
</template>

<script>
  import UserNewFormDialog from '@/components/UserNewFormDialog'
  import UserEditFormDialog from '@/components/UserEditFormDialog'
  export default {
    name: 'home',
    components: {
      UserNewFormDialog,
      UserEditFormDialog
    },
    data () {
      return {
        page: 1,
        search: '',
        tableOptions: {},
        totalItems: 0,
        formDialog: false,
        editedItem: {},
        editedItemErrors: {},
        headers: [
          {
            text: 'Nombre de usuario',
            value: 'username',
            sortable: false
          },
          {
            text: 'ID',
            value: 'id',
            sortable: false
          },
          {
            text: 'Roles',
            value: 'roles',
            sortable: false
          },
          {
            text: 'Acciones',
            value: 'actions',
            sortable: false,
            width: 130
          },
        ],
        items: []
      }
    },
    watch: {
      tableOptions: {
        handler (value) {
          value = Object.assign(value, {
            search: this.search
          })
          this.getUsers(value)

        },
        deep: true
      }
    },
    computed: {
      userDialogComponent () {
        return !this.editedItem.id ? 'UserNewFormDialog' : 'UserEditFormDialog'
      }
    },
    methods: {
      createUser () {
        this.formDialog = true
        this.editedItem = {}
      },
      onSaveUser (user) {
        if (!user.id) {
          this.$api.user.save(user)
            .then(() => {
              this.formDialog = false
              this.getUsers()
            })
            .catch((error) => {
              this.editedItemErrorsHydrate(error.response.data.violations)
            })
        } else {
          this.$api.user.resetPassword(
            user.id,
            user.oldPassword,
            user.newPassword,
            user.retypedPassword
          )
            .then(() => {
              this.formDialog = false
            })
            .catch((error) => {
              this.editedItemErrorsHydrate(error.response.data.violations)
            })
        }

      },
      editedItemErrorsHydrate (violations) {
        this.editedItemErrors = {}
        violations.forEach(violation => {
          this.editedItemErrors[violation.propertyPath] = violation.message
        })
      },
      editUser (id) {
        this.$api.user.get(id)
          .then(res => {
            this.editedItem = res.data
            this.formDialog = true
            this.editedItemErrors = {}
          })
      },
      deleteUser (id) {
        this.$confirm(
          '¿Estas seguro?',
          { 'title': 'Borrar usuario' }
        ).then(res => {
          if (res) {
            this.$api.user.delete(id)
              .then(() => {
                this.getUsers()
              })
          }
        })


      },
      getUsers() {
        this.$api.user.list(this.page)
          .then(res => {
            this.items = res.data['hydra:member']
            this.totalItems = res.data['hydra:totalItems']
          })
      }
    },
    mounted () {
      this.$nextTick(() => this.getUsers())
    }
  }
</script>
