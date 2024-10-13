<script>
    import { signIn, signOut } from '@auth/sveltekit/client'
    import { page } from '$app/stores';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={signIn('google')}>
    Signin
</button>
<button on:click={signOut()}>
    Signout
</button>

{#if $page.data.session}
{$page.data.session.user.email}
{/if}
