<script>
    import { signIn, signOut } from '@auth/sveltekit/client'
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import AccountButton from '$lib/account-button.svelte';

    if(browser){
        console.log($page.data.session)
    }
</script>

{#if $page.data.session?.user}
Logged in as: {$page.data.session.user.email}
{:else}
No session
{/if}

<p class=" text-red-500 text-3xl">
    HELLO WORLD
</p>

<AccountButton />