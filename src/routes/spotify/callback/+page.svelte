<script>
    import { browser } from '$app/environment';

    export let data
    if(browser){
        setTimeout(() => {
            window.location.href = "/"
        }, 3000)
    }
</script>

{#if data.success}
    <div class="h-[100lvh] w-[100lvw] bg-gray-900 flex items-center justify-center">
        <p class="text-white text-2xl font-semibold">
            Authorizing as <code>{data.as}</code><br>Do not press back or refresh.
        </p>
    </div>
{/if}