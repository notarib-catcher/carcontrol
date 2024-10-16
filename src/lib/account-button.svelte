<script>
    import { signIn, signOut } from '@auth/sveltekit/client'
    import { page } from '$app/stores';
</script>

<div>
    <button class=" border-2 font-pt-mono-regular active:scale-95 hover:bg-grey-800 transition-all duration-100 text-white rounded-md bg-transparent p-2" on:click={() => {
        if($page.data.session?.user){
            signOut()
        }
        else{
            signIn('google')
        }
    }}>
        {#if $page.data.session?.user}
            Logout
        {:else}
            Login
        {/if}
    </button>
</div>

