<script>
    import { signIn, signOut } from '@auth/sveltekit/client'
    import { page } from '$app/stores';
</script>

<div>
    <div>
        {#if $page.data.session?.user}
            Hello, {$page.data.session.user.name}
        {/if}
    </div>
    <button class=" border-b-2  rounded-md bg-slate-400 p-2" on:click={() => {
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

