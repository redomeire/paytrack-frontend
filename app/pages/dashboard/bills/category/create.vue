<template>
  <article class="p-4">
    <div class="flex justify-between gap-5 flex-wrap">
      <div>
        <h1 class="text-2xl font-bold">
          Create New Bill Category
        </h1>
        <p>
          Fill in the details of your new bill category.
        </p>
      </div>
    </div>
    <div>
      <NuxtForm
        :schema="billsCategorySchema"
        :state="state"
        class="mt-5"
        @submit="handleCreateBillCategory"
      >
        <div class="form-group grid md:grid-cols-2 gap-5">
          <div>
            <NuxtFormField
              label="Category Name"
              name="name"
              required
            >
              <NuxtInput
                v-model="state.name"
                color="primary"
                size="xl"
                class="w-full"
                placeholder="Enter Category Name"
              />
            </NuxtFormField>
            <NuxtFormField
              label="Description"
              name="desription"
              class="mt-5"
            >
              <NuxtTextarea
                v-model="state.description"
                color="primary"
                size="xl"
                class="w-full"
                placeholder="ex: Monthly electricity bill for January 2024"
              />
            </NuxtFormField>
          </div>
          <div>
            <NuxtFormField
              name="color"
              label="Color"
            >
              <NuxtPopover>
                <NuxtButton
                  label="Choose color"
                  color="neutral"
                  variant="outline"
                  size="xl"
                >
                  <template #leading>
                    <span
                      :style="chip"
                      class="size-3 rounded-full"
                    />
                  </template>
                </NuxtButton>

                <template #content>
                  <NuxtColorPicker
                    v-model="state.color"
                    class="p-2"
                  />
                </template>
              </NuxtPopover>
            </NuxtFormField>
          </div>
        </div>
        <NuxtButton
          type="submit"
          color="primary"
          size="xl"
          class="mt-5"
          icon="mdi-plus"
          :loading="status === 'pending'"
          :disabled="status === 'pending'"
        >
          Submit
        </NuxtButton>
      </NuxtForm>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { NuxtColorPicker, NuxtFormField } from '#components'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { InferenBillsCategorySchema } from '~~/shared/types/bills-category/billCategorySchema'
import { billsCategorySchema } from '~~/shared/types/bills-category/billCategorySchema'

definePageMeta({
  layout: 'dashboard'
})
const route = useRoute()
const { $useCases } = useNuxtApp()

const state = reactive({
  name: route.query.name as string || '',
  description: '',
  color: '#000000',
  icon: '',
  is_default: false
})
const chip = computed(() => ({ backgroundColor: state.color }))

const { status, execute } = await useAsyncData(() => $useCases.bill.createBillCategory
  .execute({
    payload: state
  }), {
  immediate: false
})

const handleCreateBillCategory = async (event: FormSubmitEvent<InferenBillsCategorySchema>) => {
  event.preventDefault()

  await execute()

  if (status.value !== 'error') {
    navigateTo('/dashboard/bills/create')
  }
}
</script>
