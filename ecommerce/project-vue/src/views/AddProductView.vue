<template>
  <div v-if="user" class="min-h-screen flex items-center justify-center border-t border-gray-100">
    <div class="border mt-2 p-6 rounded-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
      <div v-show="message" class="bg-red-500 mb-2 text-white p-2 rounded">{{ message }}</div>
      <h2 class="text-2xl font-semibold mb-6">Add New Product</h2>
      <div v-if="!submitted">
        <form>
          <div class="mb-4">
            <label for="productName" class="block text-sm font-medium text-gray-700">Product Name</label>
            <input v-model="product.name" type="text" id="productName" class="mt-1 p-2 border w-full rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="productPhoto" class="block text-sm font-medium text-gray-700">Product Photo</label>
            <input v-model="product.photo" type="text" id="productPhoto" class="mt-1 p-2 border w-full rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="productPrice" class="block text-sm font-medium text-gray-700">Price (CAD)</label>
            <input v-model.number="product.price" type="text" id="productPrice" class="mt-1 p-2 border w-full rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="productDescription" class="block text-sm font-medium text-gray-700">Product Description</label>
            <textarea v-model="product.description" id="productDescription" class="mt-1 p-2 border w-full rounded-md" required></textarea>
          </div>
          <div class="mb-4">
            <label for="productType" class="block text-sm font-medium text-gray-700">Product Type</label>
            <select  v-model="product.type"  id="productType" class="mt-1 p-2 border w-full rounded-md" required>
              <option value="">Select</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
              <option value="Electronics">Electronics</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Footwear">Footwear</option>
              <option value="Beauty">Beauty</option>
              <option value="Travel Accessories">Travel Accessories</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>
          <div class="mb-6">
            <button type="button" @click="saveProduct" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Save
            </button>
          </div>
        </form>
      </div>
      <div v-else>
        <div class="text-green-600 font-semibold mb-4">Success Message</div>
        <button   @click="addProduct"  class="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
          New Product
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    {{ this.$router.push({name: 'login'})}}
  </div>
</template>

<script>
import ProductDataService from '@/services/ProductDataService'

export default {
  props: ['addInv', 'user'],
  data () {
    return {
      message: null,
      submitted: false,
      product: {
        name: '',
        photo: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
        price: '',
        description: '',
        type: ''
      }
    }
  },
  methods: {
    saveProduct () {
      ProductDataService.create(this.product)
        .then((response) => {
          //  console.log(response.data)
          this.product.id = response.data.id
          this.addInv(this.product)
          this.submitted = true
        })
        .catch((e) => {
          this.message = e.response.data.message
        })
      // console.log(this.product)
    },
    addProduct () {
      this.submitted = false
      this.product = {
        name: '',
        photo: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
        price: '',
        description: '',
        type: ''
      }
    }
  }
}
</script>
