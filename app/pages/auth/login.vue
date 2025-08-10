<template>
    <div class="login md:w-1/3 w-2/3 flex flex-col items-stretch justify-between font-sans">
        <h1 class="text-center text-h3 mb-5">Welcome Back</h1>
        <NuxtForm :schema="schema" :state="state" class="flex flex-col gap-5" @submit="handleLogin">
            <NuxtFormField name="email">
                <NuxtInput v-model="state.email" variant="subtle" color="primary" size="xl" class="w-full"
                    placeholder="Email" />
            </NuxtFormField>
            <NuxtFormField name="password">
                <NuxtInput v-model="state.password" variant="subtle" color="primary" size="xl" type="password"
                    class="w-full" placeholder="Password" />
            </NuxtFormField>
            <NuxtLink to="/auth/forgot-password" class="block w-fit text-sm hover:underline text-secondary">Forgot
                Password?
            </NuxtLink>
            <NuxtButton type="submit" class="flex justify-center" size="xl" :loading="status === 'pending'"
                :disabled="status === 'pending'">
                Submit
            </NuxtButton>
        </NuxtForm>
        <NuxtButton color="neutral" variant="subtle" class="flex justify-center mt-3" size="xl"
            icon="i-logos-google-icon">
            Continue with Google
        </NuxtButton>
        <NuxtButton color="neutral" variant="subtle" class="flex justify-center mt-3" size="xl"
            icon="i-logos-github-icon">
            Continue with Github
        </NuxtButton>
        <NuxtLink to="/auth/register" class="block w-fit mx-auto">
            <p class="text-secondary mt-3 text-center hover:underline">
                Don't have an account? Sign Up
            </p>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
    layout: "auth",
});

const schema = v.object({
    email: v.pipe(v.string(), v.email('Invalid email')),
    password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
    email: '',
    password: '',
});

const { $useCases } = useNuxtApp();

const { execute, status } = await useAsyncData('login',
    async () => await $useCases.auth.login.execute({
    payload: {
        email: state.email,
        password: state.password,
    },
    }), {
        immediate: false,
    });

async function handleLogin(event: FormSubmitEvent<Schema>) {
    event.preventDefault();
    console.log("user state: ", state);
    
    await execute();
}
</script>