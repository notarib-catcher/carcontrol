<script>
// @ts-nocheck

    import { signIn, signOut } from '@auth/sveltekit/client'
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import AccountButton from '$lib/account-button.svelte';
    import AddedPopup from '$lib/AddedPopup.svelte';
    import OffPopup from '$lib/OffPopup.svelte';
    import OnPopup from '$lib/OnPopup.svelte';
    import AlreadyWhitelisted from '$lib/AlreadyWhitelisted.svelte';
    import WhitelistSuccess from '$lib/WhitelistSuccess.svelte';
    import InviteFail from '$lib/InviteFail.svelte';

    export let data

  
</script>
<OnPopup></OnPopup>
<OffPopup></OffPopup>
<AddedPopup></AddedPopup>
<AlreadyWhitelisted></AlreadyWhitelisted>
<InviteFail></InviteFail>
<WhitelistSuccess></WhitelistSuccess>

<div class=" fixed top-2 right-2 ">
    <AccountButton></AccountButton>
</div>

{#if data.access >= 1}

    {#if data.status}
        <div class=" h-[100lvh] w-[100lvw] bg-gray-900 flex items-center justify-center">
            <div class=" border-2 border-green-600 rounded-md items-center justify-center flex flex-col p-6 pb-8">
                {#if data.access >= 1}
                    <form class=" border-b-2 focus-within:border-blue-500 border-white" id="invokespotifyform" method="POST" action="?/invokespotify">
                        <label for="spotifyurl" class=" font-pt-mono-regular text-white">Spotify track link</label><br>
                        <input type="text" name="spotifyurl" class=" text-white  outline-none caret-white rounded-t-md p-2  bg-gray-600 bg-transparent  transition-all duration-200">
                        <button class=" text-white active:scale-95  p-2" type="submit">  <svg xmlns="http://www.w3.org/2000/svg" class=" w-[20px] h-[20px] translate-x-2 translate-y-1 fill-white"  viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg></button>
                    </form>
                {/if}
                {#if data.access >= 2}
                    <form class=" mt-6  p-2" id="toggleplayback" method="POST" action="?/toggleplayback">
                        <button type="submit" class=" active:scale-95 p-2 border-2 border-red-600 rounded-md font-pt-mono-regular text-white">
                            Disable system
                        </button>
                    </form> 
                {/if}
                

                
            </div>
            
        </div>
    {:else}
        {#if data.access < 2}
        <div class=" h-[100lvh] w-[100lvw] bg-gray-900 flex items-center justify-center">
            <div class=" border-2 font-pt-mono-regular bg-red-600 bg-opacity-10 border-red-600 text-center text-white rounded-md items-center justify-center flex flex-col p-6">
                System not active.
            </div>
        </div>
        {:else}
            <div class=" h-[100lvh] w-[100lvw] bg-gray-900 flex items-center justify-center">
                <form class=" " id="toggleplayback" method="POST" action="?/toggleplayback">
                    <button type="submit" class=" active:scale-95 border-2 p-2 border-green-600 rounded-md font-pt-mono-regular text-white">
                        Enable system
                    </button>
                </form>  
            </div>
        {/if}
    {/if}
{:else}
<div class=" h-[100lvh] w-[100lvw] bg-gray-900 flex items-center justify-center">
    <div class=" border-2 font-pt-mono-regular bg-red-600 bg-opacity-10 border-red-600 text-center text-white rounded-md items-center justify-center flex flex-col p-6">
        {#if $page.data.session}
            You are not whitelisted.
        {:else}
            You are not logged in.
        {/if}
    </div>
    
</div>
{/if}
