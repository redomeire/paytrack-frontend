<template>
  <article>
    <section
      id="hero"
      class="pt-20 grid place-items-center"
    >
      <div class="space-y-5">
        <div class="flex items-center gap-2 w-fit mx-auto">
          <NuxtAvatarGroup size="xl">
            <NuxtAvatar
              src="https://github.com/benjamincanac.png"
              alt="Benjamin Canac"
            />
            <NuxtAvatar
              src="https://github.com/romhml.png"
              alt="Romain Hamel"
            />
            <NuxtAvatar
              src="https://github.com/noook.png"
              alt="Neil Richter"
            />
          </NuxtAvatarGroup>
          <NuxtAvatar
            size="xl"
            :ui="{ root: 'bg-primary', fallback: 'text-white' }"
          >
            <template #default>
              <span class="block text-white text-sm">
                2k+
              </span>
            </template>
          </NuxtAvatar>
          <span>
            Businesses Rely on <strong>Paytrack</strong>
          </span>
        </div>
        <h1 class="text-6xl leading-16 font-semibold text-center">
          Unified  Platform for Late <br> Stage Payments | Paytrack
        </h1>
        <p class="text-center">
          Paytrack is a comprehensive platform designed to streamline late-stage payments, <br> ensuring efficiency and reliability for businesses of all sizes.
        </p>
        <div class="flex gap-3 w-fit mx-auto">
          <NuxtButton
            size="xl"
            variant="outline"
            class="min-w-[150px] grid place-items-center"
          >
            <NuxtLink to="/auth/login">
              <span class="text-body-lg">
                Demo <span class="text-primary">→</span>
              </span>
            </NuxtLink>
          </NuxtButton>
          <NuxtButton
            size="xl"
            class="min-w-[150px] grid place-items-center"
          >
            <NuxtLink to="/auth/login">
              <span class="text-body-lg">
                Sign In
              </span>
            </NuxtLink>
          </NuxtButton>
        </div>
        <NuxtSeparator class="mt-10">
          <template #default>
            <span class="text-muted text-sm">
              Join <strong>4000+</strong> Companies Using Paytrack
            </span>
          </template>
        </NuxtSeparator>
        <div class="w-fit mx-auto space-x-3 space-y-3">
          <NuxtButton
            v-for="partner in partners"
            :key="partner"
            variant="outline"
            color="neutral"
            icon="i-heroicons-globe-alt-solid"
          >
            <NuxtLink to="https://www.google.com">
              <span class="text-body-lg">
                {{ partner }}
              </span>
            </NuxtLink>
          </NuxtButton>
        </div>
      </div>
    </section>
    <section
      id="features"
      class="py-10 px-28 mt-20"
    >
      <div class="grid md:grid-cols-2 items-center gap-10">
        <div>
          <NuxtBadge
            color="primary"
            variant="soft"
            size="lg"
            class="mb-6"
          >
            Features
          </NuxtBadge>
          <h2 class="text-4xl font-semibold mb-10">
            Powerful Features to Enhance Your <span class="text-primary">Payment Experience</span>
          </h2>
        </div>
        <div>
          <p>
            Paytrack offers a suite of powerful features designed to enhance your payment experience. From automated invoicing to real-time tracking, our platform ensures that every transaction is seamless and secure.
          </p>
        </div>
      </div>
      <ul class="grid md:grid-cols-3 gap-2">
        <li class="p-5 rounded-lg shadow-lg">
          <NuxtButton
            variant="subtle"
            color="neutral"
            icon="i-heroicons-check-circle-solid"
            size="xl"
            class="rounded-full"
          />
          <h3 class="text-2xl font-semibold mt-3">
            Automated Invoicing
          </h3>
          <p class="text-sm mt-3">
            Streamline your billing process with automated invoicing, reducing manual errors and saving time.
          </p>
        </li>
        <li class="p-5 rounded-lg shadow-lg">
          <NuxtButton
            variant="subtle"
            color="neutral"
            icon="i-heroicons-check-circle-solid"
            size="xl"
            class="rounded-full"
          />
          <h3 class="text-2xl font-semibold mt-3">
            One-Click Payments
          </h3>
          <p class="text-sm mt-3">
            Simplify your payment process with one-click payments, allowing customers to complete transactions quickly and securely.
          </p>
        </li>
        <li class="p-5 rounded-lg shadow-lg">
          <NuxtButton
            variant="subtle"
            color="neutral"
            icon="i-heroicons-check-circle-solid"
            size="xl"
            class="rounded-full"
          />
          <h3 class="text-2xl font-semibold mt-3">
            Real-Time Tracking
          </h3>
          <p class="text-sm mt-3">
            Monitor your transactions in real-time, ensuring transparency and accountability at every step of the payment process.
          </p>
        </li>
      </ul>
    </section>
    <section id="pricing">
      <div class="max-w-7xl mx-auto px-28 py-16">
        <!-- Header Badge -->
        <div class="text-center mb-8">
          <NuxtBadge
            color="primary"
            variant="soft"
            size="lg"
            class="mb-6"
          >
            Get Started Today—Your Billing, Your Way.
          </NuxtBadge>

          <!-- Main Title -->
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-snug">
            Find <span class="text-blue-600">the Right Plan</span> to Manage<br>
            Your Webflow Billing
          </h1>

          <!-- Subtitle -->
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a solo freelancer or managing a large team, FlowPay's pricing is built to scale with your business.
          </p>

          <!-- Billing Toggle -->
          <div class="flex items-center justify-center gap-4 mb-12">
            <span class="text-gray-700 font-medium">Bill Yearly</span>
            <NuxtSwitch
              v-model="isMonthly"
              size="lg"
            />
            <span class="text-blue-600 font-medium">Bill Monthly</span>
          </div>
        </div>

        <!-- Pricing Cards -->
        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Starter Plan -->
          <NuxtCard class="relative">
            <template #header>
              <div class="text-center">
                <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon
                    name="heroicons:rocket-launch"
                    class="w-8 h-8 text-white"
                  />
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                  Starter Plan
                </h3>
                <p class="text-gray-600 text-sm">
                  Get started with essential billing tools for managing your Webflow subscriptions.
                </p>
              </div>
            </template>

            <div class="text-center mb-6">
              <div class="flex items-baseline justify-center">
                <span class="text-5xl font-bold text-gray-900">$0</span>
                <span class="text-gray-600 ml-2">Per Month</span>
              </div>
            </div>

            <NuxtButton
              color="primary"
              variant="outline"
              size="lg"
              block
              class="mb-6"
            >
              Get Started For Free
            </NuxtButton>

            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <NuxtIcon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-green-500"
                />
                <span class="text-gray-700">Manage up to <strong>3 Webflow projects</strong>.</span>
              </div>
              <div class="flex items-center gap-3">
                <NuxtIcon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-green-500"
                />
                <span class="text-gray-700"><strong>Basic client invoicing</strong> for Webflow</span>
              </div>
            </div>
          </NuxtCard>

          <!-- Professional Plan -->
          <NuxtCard class="relative bg-blue-600 text-white transform scale-105">
            <template #header>
              <div class="text-center relative">
                <NuxtBadge
                  color="warning"
                  variant="solid"
                  class="absolute -top-2 right-4"
                >
                  <NuxtIcon
                    name="heroicons:star"
                    class="w-4 h-4 mr-1"
                  />
                  Preferred
                </NuxtBadge>
                <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <NuxtIcon
                    name="heroicons:user"
                    class="w-8 h-8 text-blue-600"
                  />
                </div>
                <h3 class="text-xl font-bold mb-2">
                  Professional Plan
                </h3>
                <p class="text-blue-100 text-sm">
                  Get started with essential billing tools for managing your Webflow subscriptions.
                </p>
              </div>
            </template>

            <div class="text-center mb-6">
              <div class="flex items-baseline justify-center">
                <span class="text-5xl font-bold">$29</span>
                <span class="text-blue-100 ml-2">Per Month</span>
              </div>
            </div>

            <NuxtButton
              variant="outline"
              size="lg"
              block
              class="mb-6 bg-white hover:bg-neutral-200 active:bg-neutral-200 text-blue-600"
            >
              Start a 7 Day Free Trial
            </NuxtButton>

            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-blue-200"
                />
                <span>Manage up to <strong>10 Webflow projects</strong>.</span>
              </div>
              <div class="flex items-center gap-3">
                <Icon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-blue-200"
                />
                <span><strong>Automated invoicing</strong> based on Webflow usage.</span>
              </div>
            </div>
          </NuxtCard>

          <!-- Agency Plan -->
          <NuxtCard class="relative">
            <template #header>
              <div class="text-center">
                <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <NuxtIcon
                    name="heroicons:user-group"
                    class="w-8 h-8 text-white"
                  />
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                  Agency Plan
                </h3>
                <p class="text-gray-600 text-sm">
                  Unlock advanced billing and payment tools for growing businesses and agencies.
                </p>
              </div>
            </template>

            <div class="text-center mb-6">
              <div class="flex items-baseline justify-center">
                <span class="text-5xl font-bold text-gray-900">$49</span>
                <span class="text-gray-600 ml-2">Per Month</span>
              </div>
            </div>

            <NuxtButton
              color="primary"
              variant="outline"
              size="lg"
              block
              class="mb-6"
            >
              Start a 7 Day Free Trial
            </NuxtButton>

            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <NuxtIcon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-green-500"
                />
                <span class="text-gray-700">Manage <strong>unlimited Webflow projects</strong>.</span>
              </div>
              <div class="flex items-center gap-3">
                <NuxtIcon
                  name="heroicons:check-circle"
                  class="w-5 h-5 text-green-500"
                />
                <span class="text-gray-700"><strong>Advanced automation</strong> for invoices, payments, and reports.</span>
              </div>
            </div>
          </NuxtCard>
        </div>
      </div>
    </section>
    <section
      id="testimonials"
      class="my-20"
    >
      <div class="mx-auto w-fit">
        <NuxtBadge
          color="primary"
          variant="soft"
          size="lg"
        >
          Testimonials
        </NuxtBadge>
      </div>
      <h2 class="text-center text-heading-2 font-semibold">
        What our <span class="text-primary">happy user</span> says!
      </h2>
      <p class="text-center">
        Hear from our satisfied users about their experiences with Paytrack, <br> and how it has transformed their payment processes.
      </p>
      <div class="mx-auto w-3/4 mt-10">
        <NuxtCarousel
          v-slot="{ item: testimonial }"
          ref="carousel"
          :items="testimonials"
          :ui="{ item: 'basis-1/3' }"
        >
          <NuxtCard
            class="p-3 hover:shadow-lg transition-shadow duration-300"
          >
            <div class="flex items-center mb-4">
              <NuxtIcon
                v-for="star in 5"
                :key="star"
                name="i-heroicons-star-solid"
                class="w-5 h-5 text-yellow-400"
              />
            </div>

            <blockquote class="text-gray-700 mb-6 leading-relaxed text-sm">
              "{{ testimonial.content }}"
            </blockquote>

            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <NuxtAvatar
                  :src="testimonial.avatar"
                  :alt="testimonial.name"
                  size="md"
                />
                <div>
                  <h4 class="font-semibold text-gray-900">
                    {{ testimonial.name }}
                  </h4>
                  <p class="text-sm text-gray-600">
                    {{ testimonial.title }}
                  </p>
                </div>
              </div>
            </div>
          </NuxtCard>
        </NuxtCarousel>
        <div class="button-group float-end space-x-2">
          <NuxtButton
            icon="i-material-symbols-arrow-left-alt"
            class="rounded-full"
            variant="outline"
            :color="carousel?.emblaApi?.canScrollPrev ? 'primary' : 'neutral'"
            @click="onClickPrev"
          />
          <NuxtButton
            icon="i-material-symbols-arrow-right-alt"
            class="rounded-full"
            variant="solid"
            :color="carousel?.emblaApi?.canScrollNext ? 'primary' : 'neutral'"
            @click="onClickNext"
          />
        </div>
      </div>
    </section>
    <section
      id="faqs"
      class="my-10"
    >
      <h2 class="text-center text-heading-2 font-semibold text-primary">
        FAQs
      </h2>
      <p class="text-center">
        Frequently Asked Questions about Paytrack, <br> covering topics such as security, integration, and support.
      </p>
      <div class="mx-auto w-2/3 mt-10">
        <NuxtAccordion :items="faqs">
          <template #default="{ item }">
            <span class="font-semibold text-lg">{{ item.label }}</span>
          </template>
        </NuxtAccordion>
      </div>
      <div>
        <h4 class="text-heading-4 font-semibold text-center mt-10">
          Still have questions?
        </h4>
        <p class="text-center w-1/3 mx-auto text-sm my-5">
          We've covered the most common questions, but if you have more, feel free to reach out to our support team. We're here to help you get the most out of Paytrack.
        </p>
        <div class="mx-auto w-fit">
          <NuxtButton
            variant="outline"
            size="xl"
          >
            <NuxtLink to="/contact">
              <span class="text-body-lg">
                Contact Support
              </span>
            </NuxtLink>
          </NuxtButton>
        </div>
      </div>
    </section>
  </article>
</template>

<script lang="ts" setup>
import type { AccordionItem } from '@nuxt/ui'

useSeoMeta({
  title: 'Paytrack'
})
const partners = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook']

const faqs = ref<AccordionItem[]>([
  {
    label: 'Can i integrate Paytrack with my existing systems?',
    content: 'Yes, Paytrack offers robust APIs and integration options to seamlessly connect with your existing systems.'
  },
  {
    label: 'What security measures does Paytrack have in place?',
    content: 'Paytrack employs industry-standard security protocols, including encryption and two-factor authentication, to protect your data.'
  },
  {
    label: 'How does Paytrack handle late-stage payments?',
    content: 'Paytrack automates late-stage payment processes, ensuring timely and accurate transactions while minimizing manual intervention.'
  }
])

const carousel = useTemplateRef('carousel')

const onClickPrev = () => {
  carousel.value?.emblaApi?.scrollPrev()
}

const onClickNext = () => {
  carousel.value?.emblaApi?.scrollNext()
}

const testimonials = ref([
  {
    id: 1,
    content: 'We\'ve scaled up quickly, and managing billing across multiple Webflow projects was becoming increasingly complex. FlowPay has given us a central platform where we can handle everything from automated invoicing to payment reporting. The best part? We\'ve cut our billing management time in half, giving us more space to focus on our clients and growth.',
    name: 'Joe K.',
    title: 'CEO, Finsweet',
    company: 'Finsweet',
    avatar: '/placeholder.svg?height=40&width=40',
    companyLogo: '/placeholder.svg?height=32&width=80'
  },
  {
    id: 2,
    content: 'As a small agency handling multiple projects, keeping track of Webflow billing used to be a headache. FlowPay changed that. The platform automatically syncs our Webflow usage with client invoicing, and the payment tracking is seamless. We\'ve been able to streamline our process and get paid faster—no more chasing clients!',
    name: 'Leonardo Zakour',
    title: 'CEO, Refokus',
    company: 'Refokus',
    avatar: '/placeholder.svg?height=40&width=40',
    companyLogo: '/placeholder.svg?height=32&width=80'
  },
  {
    id: 3,
    content: 'As a small agency handling multiple projects, keeping track of Webflow billing used to be a headache. FlowPay changed that. The platform automatically syncs our Webflow usage with client invoicing, and the payment tracking is seamless. We\'ve been able to streamline our process and get paid faster—no more chasing clients!',
    name: 'Harshit Agarwal',
    title: 'Freelancer',
    company: 'Flowchef',
    avatar: '/placeholder.svg?height=40&width=40',
    companyLogo: '/placeholder.svg?height=32&width=80'
  },
  {
    id: 4,
    content: 'As a small agency handling multiple projects, keeping track of Webflow billing used to be a headache. FlowPay changed that. The platform automatically syncs our Webflow usage with client invoicing, and the payment tracking is seamless. We\'ve been able to streamline our process and get paid faster—no more chasing clients!',
    name: 'Harshit Agarwal',
    title: 'Freelancer',
    company: 'Flowchef',
    avatar: '/placeholder.svg?height=40&width=40',
    companyLogo: '/placeholder.svg?height=32&width=80'
  }
])

const isMonthly = ref(true)
</script>

<style scoped>
@reference '~/assets/css/main.css';

.section__label {
  @apply text-primary text-base font-semibold;
}
</style>
