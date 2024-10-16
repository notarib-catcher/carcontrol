<script>
    import { browser } from '$app/environment';
    import { pushState, replaceState } from '$app/navigation';
    import {page} from '$app/stores'

    let isAdded = false
    if(browser){
        const urlParams = new URLSearchParams(window.location.search);
        isAdded = urlParams.has('off');
        setTimeout(() => {
            window.history.pushState("", document.title, window.location.pathname);
        }, 200)
    }
        
</script>

<div class = "absolute top-0 w-screen h-fit z-[2000] pointer-events-none">
    {#if isAdded}
    <div class=" font-uni font-pt-mono-regular text-xl font-semibold h-[50px] w-fit p-2 bg-transparent text-white border-2 border-red-600 mx-auto ModalPopIn">
        System Disabled 
    </div>
    {/if}
</div>

<style>
    .ModalPopIn{
    transform: translateY(-200px);
    animation-name: popin;
    animation-duration: 3000ms;
    animation-iteration-count: 1;
    animation-fill-mode: forward;
    animation-timing-function: ease-in-out;
    }
    @keyframes popin{
        0%{
            transform: translateY(-55px);
        }
        25%{
            transform: translateY(20px);
        }
        50%{
            transform: translateY(20px);
        }
        100%{
            transform: translateY(-200px);
        }
    }
</style>