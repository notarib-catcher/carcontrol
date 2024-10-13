<script>
    import { signIn, signOut } from '@auth/sveltekit/client'
    import { page } from '$app/stores';
    import { browser } from '$app/environment';

    if(browser){
        console.log($page.data.session)
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={async => {signIn('google')}}>
    Signin
</button>
<button on:click={async => {signOut()}}>
    Signout
</button>

{#if $page.data.session?.user}
Logged in as: {$page.data.session.user.email}
{:else}
No session
{/if}
