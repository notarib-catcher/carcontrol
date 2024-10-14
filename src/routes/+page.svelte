<script>
// @ts-nocheck

    import { signIn, signOut } from '@auth/sveltekit/client'
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import AccountButton from '$lib/account-button.svelte';


    export let data

    if(browser){
        console.log($page.data.session)
        console.log(data)
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

{#if data.access >= 1}
<form id="invokespotifyform" method="POST" action="?/invokespotify">
    <input type="text" name="spotifyurl" class=" border-b-2 outline-none border-black focus:border-blue-400 transition-all duration-200">
    <button type="submit">Send</button>
</form>
{/if}
{#if data.access >= 2}
INPUT FOR ACCOUNTS
{/if}



<AccountButton />