<template>
  <div class="max-w-screen-xl mx-auto">
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vue Store</span>
      </div>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button @click="toggleSideBar" type="button" class="mr-2">
            <span class="sr-only">Open user menu</span>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
            </svg>
          </button>
          <span class="bg-gray-800 rounded-full text-white h-7 w-7 text-center"><span class="">{{ totalQuantity }}</span></span>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <router-link :to="{name: 'home'}" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</router-link>
          </li>
           <li v-if="user">
            <router-link :to="{name: 'add-product'}" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Add Product</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{name: 'user'}" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">User</router-link>
          </li>
           <li v-if="!user">
            <router-link :to="{name: 'login'}" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</router-link>
          </li>
          <li v-if="user">
            <span @click="logout" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer">Logout</span>
          </li>
        </ul>
      </div>
      </div>
    </nav>
    <router-view
    :inventory="inventory"
    :add = "addToCart"
    :addInv = "addInventory"
    :updateInv = "updateInventory"
    :removeInv = "removeInventory"
    :remove="removeItem"
    :user = "user"
    />
    <SideBar
    :cart="cart"
    :inventory="inventory"
    :remove="removeItem"
    v-if="showSideBar"
    :toggle = "toggleSideBar"
    />
    <MainFooter/>
  </div>
</template>

<script>
import MainFooter from '@/components/MainFooter.vue'
import SideBar from '@/components/SideBar.vue'
// import product from '@/products.json'
import ProductDataService from '@/services/ProductDataService'
import { mapGetters } from 'vuex'
import UserDataService from './services/UserDataService'
export default {
  components: {
    SideBar,
    MainFooter
  },
  mounted () {
    ProductDataService.getAll()
      .then(response => {
        this.inventory = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  data () {
    return {
      showSideBar: false,
      inventory: [],
      // cart: { 'Gift Bag': 3, 'Travel Bag': 2, 'X-box': 2 }
      cart: {}
    }
  },
  methods: {
    toggleSideBar () {
      this.showSideBar = !this.showSideBar
    },
    addToCart (product, index) {
      if (!this.cart[product]) this.cart[product] = 0
      this.cart[product] += this.inventory[index].quantity
    },
    removeItem (name) {
      delete this.cart[name]
    },
    addInventory (product) {
      this.inventory.push(product)
    },
    updateInventory (index, data) {
      this.inventory[index] = data
    },
    removeInventory (index) {
      this.inventory.splice(index, 1)
    },
    logout () {
      UserDataService.getLogout()
        .then(response => {
          this.$store.dispatch('user', null)
          this.$router.push('login')
        })
    }
  },
  computed: {
    totalQuantity () {
      return Object.values(this.cart).reduce((acc, cur) => {
        return acc + cur
      }, 0)
    },
    ...mapGetters(['user'])
  },
  created () {
    UserDataService.getAuth()
      .then(response => {
        this.$store.dispatch('user', response.data)
      })
      .catch(e => {
        this.$store.dispatch('user', null)
      })
  }
}
</script>
