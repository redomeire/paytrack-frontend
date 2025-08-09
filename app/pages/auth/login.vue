<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = v.object({
    email: v.pipe(v.string(), v.email('Invalid email')),
    password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
    username: '',
    email: '',
    password: ''
})

const { $useCases } = useNuxtApp();

async function handleLogin(event: FormSubmitEvent<Schema>) {
    event.preventDefault();
    const userData = await $useCases.auth.login.execute(state.email, state.password);
    if (userData) {
        await $useCases.auth.setUserSession.execute({ ...userData.data, loggedInAt: new Date() });
    }
}
</script>

<template>
    <div class="login">
        <h1>Login</h1>
        <p>Please log in to access your account.</p>
        <NuxtForm :schema="schema" :state="state" @submit="handleLogin">
            <NuxtFormField label="Username" name="username">
                <NuxtInput v-model="state.username" />
            </NuxtFormField>
            <NuxtFormField label="Email" name="email">
                <NuxtInput v-model="state.email" />
            </NuxtFormField>
            <NuxtFormField label="Password" name="password">
                <NuxtInput v-model="state.password" type="password" />
            </NuxtFormField>
            <NuxtButton type="submit">
                Submit
            </NuxtButton>
        </NuxtForm>
    </div>
</template>