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

async function handleLogin(event: FormSubmitEvent<Schema>) {
    event.preventDefault();
    const toast = useToast();
    const { data, error, status } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: {
            email: state.email,
            password: state.password
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log('error:', error.value);
    console.log('data:', data.value);
    console.log('status:', status.value);
    if (error.value) {
        toast.add({
            title: 'Login Failed',
            description: error.value?.data.message,
            color: "error",
        });
        return;
    }
    toast.add({
        title: 'Login Success',
        description: 'You have successfully logged in.',
        color: "success",
    });
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