<script>
    import { browser } from "$app/environment";
    import { signIn } from '@auth/sveltekit/client'
    if(browser){
        const url = window.location.pathname.replaceAll("signin","").replaceAll("/","")
        signIn('google',{
            callbackUrl:"/invite/"+url
        })
    }
</script>