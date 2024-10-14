<script>
    export let data
</script>
<div class=" h-[100lvh] w-[100lvw] bg-gray-900 flex items-center justify-center">
    <div class=" ">
        <button on:click={ () => {
            window.location.href = data.signinURL
        }} class=" flex flex-row items-center justify-center  bg-gray-950 font-semibold text-green-600 rounded-md p-2 hover:bg-gray-800 active:scale-95 border-green-600 border-2 transition-all duration-150">
            <p class=" mr-2">
                Connect Spotify
            </p>
            <img class=" h-[23px] w-[22px]" alt="File:Spotify icon.svg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/512px-Spotify_icon.svg.png?20220821125323" decoding="async" width="512" height="529" srcset="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/768px-Spotify_icon.svg.png?20220821125323 1.5x, https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1024px-Spotify_icon.svg.png?20220821125323 2x" data-file-width="22" data-file-height="23">
        </button>
    </div>
</div>