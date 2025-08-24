<template>
  <footer class="pt-10 pb-5 mx-28">
    <div class="bg-linear-to-t from-primary-800 to-primary-600 rounded-4xl p-10 text-white">
      <h4 class="font-semibold text-5xl leading-14 text-center">
        Automate your payment <br> processes with Paytrack
      </h4>
      <p class="my-7 w-2/3 mx-auto text-center opacity-90">
        Paytrack simplifies your payment management, allowing you to focus on what matters most. Join us today and experience seamless transactions and automatic workflows.
      </p>

      <div class="flex justify-center gap-3">
        <NuxtButton
          variant="solid"
          size="lg"
          class="bg-white text-primary hover:bg-gray-300 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <NuxtLink to="/auth/signup">
            <span class="text-body-sm">
              Try Paytrack Now
            </span>
          </NuxtLink>
        </NuxtButton>
        <NuxtButton
          variant="solid"
          size="lg"
          class="transition transform hover:scale-105"
        >
          <NuxtLink to="/auth/signup">
            <span class="text-body-sm">
              Learn More
            </span>
          </NuxtLink>
        </NuxtButton>
      </div>
    </div>
    <div class="mt-10 px-4 flex items-center justify-between">
      <div>
        <NuxtLink
          to="/"
          class="flex items-center gap-2 w-fit"
        >
          <NuxtAvatar
            alt="Paytrack"
            size="xl"
            :ui="{
              root: 'bg-primary',
              fallback: 'text-white'
            }"
          />
          <h2 class="text-primary text-heading-5 font-semibold">
            PayTrack
          </h2>
        </NuxtLink>
      </div>
      <nav>
        <ul class="flex items-center gap-10">
          <li
            v-for="data in navigationDatas"
            :key="data.title"
          >
            <NuxtLink :to="data.link">
              <span class="text-body-lg font-semibold">
                {{ data.title }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="social-medias">
        <ul class="flex items-center gap-4">
          <li>
            <NuxtLink to="#">
              <NuxtIcon
                name="i-ic-baseline-facebook"
                class="w-5 h-5"
              />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="#">
              <NuxtIcon
                name="i-line-md-twitter-x"
                class="w-5 h-5"
              />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="#">
              <NuxtIcon
                name="i-mdi-linkedin"
                class="w-5 h-5"
              />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <NuxtSeparator class="my-5" />
    <div class="text-center mt-5">
      <span class="text-muted text-sm">
        © 2023 Paytrack. All rights reserved.
      </span>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const navigationDatas = [
  {
    title: 'Features',
    link: '#features'
  },
  {
    title: 'Pricing',
    link: '#pricing'
  },
  {
    title: 'Contact',
    link: '#contact'
  },
  {
    title: 'FAQ',
    link: '#faq'
  }
]
</script>
