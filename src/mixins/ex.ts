export const myMixin = {
    created() {
        setTimeout(() => {
            
            console.log("mixin")
        }, 2000)
        console.log("mixin")
    },
    data() {
        return {
          message:"mess mixin"
      } 
    }
}