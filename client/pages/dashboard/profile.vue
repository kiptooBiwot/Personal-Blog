<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})
</script>

<template>
  <div class="px-5 py-2">
    <h4 class="text-xl font-bold py-3">Profile</h4>
    <div class="grid gap-3 grid-cols-1 md:grid-cols-12">
      <div class="col-span-12 lg:col-span-3 rounded-xl bg-white shadow-sm p-5 h-auto w-full">
        <!-- <h3>First</h3> -->
        <div class="mx-auto w-full h-full text-center space-y-5">
          <img src="" alt="" class="rounded-full w-[150px] h-[150px] bg-gray-200 mx-auto">

          <h3 class="text-xl font-bold">John Doe</h3>
          <!-- <h5 class="text-base font-semibold">About</h5> -->
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde distinctio velit ad rem facilis, repudiandae
            eius facere placeat pariatur expedita sint quisquam neque? Optio explicabo, eum ratione harum itaque enim.</p>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-9 rounded-xl bg-white shadow-sm p-8 h-auto w-full">
        <!-- <h3>Second</h3> -->
        <div class="flex">
          <div class="space-y-5">
            <p class="font-bold">Name: <span class="font-normal">Kiptoo Biwot</span> </p>
            <p class="font-bold">Email: <span class="font-normal">mail@mail.com</span> </p>
            <p class="font-bold">Email: <span class="font-normal">mail@mail.com</span> </p>
            <!-- <p>Kiptoo Biwot</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped></style>