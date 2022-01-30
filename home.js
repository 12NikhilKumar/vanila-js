
    const fn = async ()=>{
        let data = await fetch("https://api.github.com/users")
        let res = await data.json();
        console.log(res)
        card(res)
    }
    const dis = document.getElementById("dis");
    const card = (data)=>{
        dis.innerHTML="";
        for(let id of data){
            const cart = document.createElement("div");
            let img = document.createElement("img");
            img.src = id.avatar_url;
            let name = document.createElement("h3");
            name.innerText = id.login;
            cart.append(img,name);
            dis.append(cart);
        }
    }
    var tog = document.getElementById("tog");
    var cnt = 1;
    const funde = async ()=>{
        let input = tog.value;
        if(input){
            let data = await fetch(`https://api.github.com/search/users?q=${input}&per_page=25&page=${cnt}`)
            let res = await data.json()
            console.log(res.items);
            card(res.items)
        }
        console.log(dis.offsetHeight==2532)
    }
    function debounce(fn,delay){
        let id;
        return ()=>{
            id && clearTimeout(id);
            id = setTimeout(()=>fn(),delay)
        }
    }
    function fns(){
        console.log(window.innerHeight+window.scrollY)
        if(window.innerHeight+window.scrollY>dis.scrollHeight){
            cnt+=1;
            dis.style.height = dis.scrollHeight + 100+'px';
            console.log(cnt)
            return
        }
    }
    window.addEventListener("load", fn)
    window.addEventListener("scroll",fns)
    tog.addEventListener("keyup",debounce(funde,1000))