import{useState, useEffect, useRef} from 'react';
import './App.css';

function App() {

const BASE_PATH = 'https://image.tmdb.org/t/p/original/';

const Movies = [
  {
    title: 'Mortal Kombat',
    backgroundImg: `${BASE_PATH}w8BVC3qrCWCiTHRz4Rft12dtQF0.jpg`,
    isStarred: false,
    starsCount: 9,
    price: 7.5,
    categories: [
      'horror', 'action'
    ]
  },
  {
    title: 'Godzilla vs. Kong',
    backgroundImg: `${BASE_PATH}klAIFewuqcyEmH1SMtR2XbMyqzM.jpg`,
    isStarred: false,
    starsCount: 8.5,
    price: 3,
    categories: [
      'science fiction', 'action'
    ]
  },
  {
    title: 'Anônimo',
    backgroundImg: `${BASE_PATH}woPYFGKwVULILbO7q44HmsNY0kO.jpg`,
    isStarred: false,
    starsCount: 8.5,
    price: 7,
    categories: [
      'horror', 'action'
    ]
  },
  {
    title: 'Sem Remorso',
    backgroundImg: `${BASE_PATH}uHEZ4ZMziIjlAgCTQAEh9ROvtj0.jpg`,
    isStarred: false,
    starsCount: 8.4,
    price: 5.5,
    categories: [
      'action'
    ]
  },
  {
    title: 'Demon Slayer: O Trem Infinito',
    backgroundImg: `${BASE_PATH}m9cn5mhW519QKr1YGpGxNWi98VJ.jpg`,
    isStarred: false,
    starsCount: 8.4,
    price: 8,
    categories: [
      'action'
    ]
  },
  {
    title: 'Cherry: Inocência Perdida',
    backgroundImg: `${BASE_PATH}qbSsR0IfnxdXZqfRMpH2PgLAbPV.jpg`,
    isStarred: false,
    starsCount: 8.1,
    price: 8.5,
    categories: [
      'romance'
    ]
  },
  {
    title: 'Benny Loves You',
    backgroundImg: `${BASE_PATH}mQ8vALvqA0z0qglG3gI6xpVcslo.jpg`,
    isStarred: false,
    starsCount: 7.7,
    price: 6.5,
    categories: [
      'horror'
    ]
  },
  {
    title: 'Mortal Kombat',
    backgroundImg: `${BASE_PATH}w8BVC3qrCWCiTHRz4Rft12dtQF0.jpg`,
    isStarred: false,
    starsCount: 9,
    price: 7.5,
    categories: [
      'horror', 'action'
    ]
  },
  {
    title: 'Godzilla vs. Kong',
    backgroundImg: `${BASE_PATH}klAIFewuqcyEmH1SMtR2XbMyqzM.jpg`,
    isStarred: false,
    starsCount: 8.5,
    price: 3,
    categories: [
      'science fiction', 'action'
    ]
  },
  {
    title: 'Anônimo',
    backgroundImg: `${BASE_PATH}woPYFGKwVULILbO7q44HmsNY0kO.jpg`,
    isStarred: false,
    starsCount: 8.5,
    price: 7,
    categories: [
      'horror', 'action'
    ]
  },
  {
    title: 'Sem Remorso',
    backgroundImg: `${BASE_PATH}uHEZ4ZMziIjlAgCTQAEh9ROvtj0.jpg`,
    isStarred: false,
    starsCount: 8.4,
    price: 5.5,
    categories: [
      'action'
    ]
  },
  {
    title: 'Demon Slayer: O Trem Infinito',
    backgroundImg: `${BASE_PATH}m9cn5mhW519QKr1YGpGxNWi98VJ.jpg`,
    isStarred: false,
    starsCount: 8.4,
    price: 8,
    categories: [
      'action'
    ]
  },
  {
    title: 'Cherry: Inocência Perdida',
    backgroundImg: `${BASE_PATH}qbSsR0IfnxdXZqfRMpH2PgLAbPV.jpg`,
    isStarred: false,
    starsCount: 8.1,
    price: 8.5,
    categories: [
      'romance'
    ]
  },
  {
    title: 'Benny Loves You',
    backgroundImg: `${BASE_PATH}mQ8vALvqA0z0qglG3gI6xpVcslo.jpg`,
    isStarred: false,
    starsCount: 7.7,
    price: 6.5,
    categories: [
      'horror'
    ]
  },
] 

  

  const [itemsNaSacola, setItemsNaSacola] = useState([]);
  const [listaGeralDeFilmes, setListaGeralDeFilmes] = useState(Movies);
  const [movieCategoryFilter, setMovieCategoryFilter] = useState([]);
  const [movieTitleFilter, setMovieTitleFilter] = useState('');
  const [search, setSearch] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [valorASerPago, setValorASerPago] = useState(0);
  const [msgCupomInput, setMsgCupomInput] = useState(true);

  const pesquisar = useRef("");
  const inputCupon = useRef("");

  let valorComDescontoAgregado = 0; //poderá ser usado como preço final com valor de desconto estando incluso ou não.
  
  const [tempoRestante, setTempoRestante] = useState(5 * 60);
  const minutos = String(Math.floor(tempoRestante / 60)).padStart(2,"0");
  const segundos = String(Math.floor(tempoRestante % 60)).padStart(2,"0");

  const sacolaVazia = <div class="sacola-vazia">
  <h3>Sua sacola está vazia</h3>
  <p>Adicione filmes agora</p>
  <img src="/person-illustration.svg" alt="" />
  </div>

  const dadosValorTotal = <button>
  <span>Confirme seus dados R$ ${valorASerPago - valorASerPago * desconto}</span> 
  </button>

  valorComDescontoAgregado = valorASerPago - valorASerPago * desconto;
  console.log(valorComDescontoAgregado);

  function pesquisarFilmesButtonClick(e){
    if(!pesquisar.current.value) return;

    const novaPesquisa = pesquisar.current.value;

    const filmeBuscado = Movies.filter(filme => filme.title.includes(novaPesquisa));

    if(filmeBuscado.length === 0) return;

    setListaGeralDeFilmes(filmeBuscado);
    console.log(filmeBuscado);

  }

  function handleKeyDown(e){
    if( e.key !== "Enter" ) return;

    setMovieTitleFilter(search);
  }

  function filterMovie(movie){
    if(!movieTitleFilter && movieCategoryFilter.length === 0) return movie;

    if(movieTitleFilter && movieCategoryFilter.lenght > 0){
      if(movieCategoryFilter.some(c => movie.categories.includes(c)) 
      && movie.title.includes(movieTitleFilter)){
        return movie;
      }else{
        return;
      }
    }

    if(movieCategoryFilter.length > 0 && movieCategoryFilter.some(c => movie.categories.includes(c))){
      return movieCategoryFilter;
    }

    if(movieTitleFilter && movie.title.includes(movieTitleFilter)){
      return movie;
    }
  }

  function handleFilterClick(filtro){
    if(filtro === 'all'){
      setMovieCategoryFilter([]);
      return;
    }

    const alreadyChosenFilter = movieCategoryFilter.includes(filtro);

    if(alreadyChosenFilter){
      const newFilters = movieCategoryFilter.filter(x => x !== filtro);
      setMovieCategoryFilter(newFilters);
      return;
    }

    setMovieCategoryFilter([...movieCategoryFilter, filtro]);
  }
 
  function handleAdicionaASacola(movie){
    const filme = 
    {
      image:movie.backgroundImg,
      nome:movie.title,
      preco:movie.price,
      quantidade:1
    }
    const adicionado = itemsNaSacola.find(item => item.nome === filme.nome);
    if(adicionado){
      adicionado.quantidade++
      const index = itemsNaSacola.indexOf(adicionado);
      itemsNaSacola.splice(index,1);
      console.log(adicionado);
      setItemsNaSacola([...itemsNaSacola,adicionado]);
      setValorASerPago(prevValor => prevValor + adicionado.preco);
    }else{
      setItemsNaSacola([...itemsNaSacola,filme]);
      setValorASerPago(prevValor => prevValor+filme.preco);
    }
  }

  function almentarQuantidadeDeItens(item){
    const produtoAtual = itemsNaSacola.find(produto => produto.nome === item.nome);
    produtoAtual.quantidade++;
    setValorASerPago(prevValor => prevValor + produtoAtual.preco);
    const index = itemsNaSacola.indexOf(produtoAtual);
    itemsNaSacola.splice(index,1,produtoAtual);
    setItemsNaSacola([...itemsNaSacola]);

  }

  function diminuirQuantidadeDeItems(item){
    const produtoAtual = itemsNaSacola.find(produto => produto.nome === item.nome);
    if(produtoAtual.quantidade > 0) produtoAtual.quantidade--;
    setValorASerPago(prevValor => prevValor - produtoAtual.preco);
    const index = itemsNaSacola.indexOf(produtoAtual);
    itemsNaSacola.splice(index,1,produtoAtual);
    console.log(produtoAtual);
    setItemsNaSacola([...itemsNaSacola]);
    
    //Remove o produto da sacola quando a quantidade chega a zero;
    if(produtoAtual.quantidade === 0){
      itemsNaSacola.splice(index,1);
      setItemsNaSacola([...itemsNaSacola]);
    }

  }

  function inputEnterCupom(event){
    const cupom = inputCupon.current.value;

    if(event.key !== "Enter")return;
    
    if(cupom === "htmlnaoelinguagem"){
      if(msgCupomInput){
        setDesconto(desconto => desconto + 0.10);
        inputCupon.current.value = "cupom inserido com sucesso!";
        setMsgCupomInput(false);
        setTempoRestante(0);
      }else{
        inputCupon.current.value = "Não é mais necessário inserir o cupom"
      }
    }
  }

  function buttonClickCupom(){

    const cupom = inputCupon.current.value;
    
    if(cupom === "htmlnaoelinguagem"){
      if(msgCupomInput){
        setDesconto(desconto => desconto + 0.10);
        inputCupon.current.value = "cupom inserido com sucesso!";
        setMsgCupomInput(false);
        setTempoRestante(0);
      }else{
        inputCupon.current.value = "Não é mais necessário inserir o cupom"
      }
    }
 }

 function alterarCurtida(title){

  const newMovies = [...listaGeralDeFilmes];

   const filme = newMovies.find( x => x.title === title);

   filme.isStarred = !filme.isStarred;

   setListaGeralDeFilmes(newMovies);
 }



  useEffect(()=>{
    const intervalId = setInterval(()=>{
      setTempoRestante(tempoRestante => tempoRestante - 1);
    },1000);

    return (()=>{
      clearInterval(intervalId);
    })
  },[]);



  return (
    <div className="App">
      <header className="App-header">

        <div class="container-head">
          
          <div className="logo-img">
            <img src="/logo.svg" alt="" />
          </div>

          <div className="search-container">
            <input ref={pesquisar}type="text" placeholder="Pesquise filmes..." onChange ={e => setSearch(e.target.value)} value={search} onKeyPress={(e) =>handleKeyDown(e)}/>
            <button onClick={( )=>setMovieTitleFilter(search)}><img src="/search-icon.svg" alt="" /></button>
          </div>

          <div className="favoritos">
            <button>
              <img src="/bookmark-icon.svg" alt="" />
              Favoritos
            </button>
          </div>

          <div class="promocoes">
            <button>
              <img src="/promotion-icon.svg" alt="" />
              Promoções
            </button>
          </div>

          <div class="usuario">
            <span>Bem vindo Dina</span>
            <img width="56" src="../profile.jpg" alt="" />
          </div>

        </div>
     
      </header>

      <main>
          <div class="cupom-banner" style={{"display":tempoRestante > 0 ? "flex" : "none"}}>
            <button onClick={()=>{
              setDesconto(desconto => desconto + 0.10);
              setTempoRestante(0);
              setMsgCupomInput(false);
              console.log(desconto);
            }}>
              <div className="banner-image" style={{"--bannerImage":`url(/bg-promotion.svg)`}}>
                <div>
                  <h1>APROVEITE AGORA</h1>
                  <div className="cupon-key" >
                    <img src="/coupon-circle-icon.svg" alt="" />
                    <span>CUPOM: HTMLNAOELINGUAGEM</span>
                  </div>
                  
                </div>

                <div>
                  <h2 className="h2">FINALIZA EM:</h2>
                  <div className="cupon-time" >
                    <img src="/time-icon.svg" alt="" />
                    <span>00:{minutos}:{segundos}</span>
                  </div>
                  
                </div>

              </div>
            </button>
          </div>

          <div className="top-filmes-container">

            <h2>Top Filmes</h2>

            <div className="lista-de-filmes">

              {
                listaGeralDeFilmes.slice(0,5).map(movie =>
                  <div className="card" style={{"--cardImage":`url(${movie.backgroundImg})`}}>
                    <div class="curtir">
                      <button onClick={()=>alterarCurtida(movie.title)}>
                        <svg width="20" height="18" viewBox="0 0 20 18" fill={movie.isStarred ? "#FFF" : "none"} xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2L11.7961 7.52786H17.6085L12.9062 10.9443L14.7023 16.4721L10 13.0557L5.29772 16.4721L7.09383 10.9443L2.39155 7.52786H8.20389L10 2Z" stroke="white" stroke-opacity="0.83"/>
                        </svg>
                      </button>
                      
                    </div>

                    <div>
                      <div className="movie-name">
                        <p>{movie.title}</p> 
                      
                        <span>
                            <img  src="/golden-star.svg" alt="" />
                            <span>{movie.starsCount}</span>
                        </span>
                      </div>

                      <div className="sacola">
                        <button onClick={()=>handleAdicionaASacola(movie)}>
                          <p>Sacola</p> <p>R${String(movie.price)}</p>
                        </button>
                      </div>

                    </div>
                  </div>).slice(0,5)
              }

            </div>
            
          </div>

          <div className="filmes-container">

            <h2>{movieTitleFilter}</h2>

            <div className="buttons">

              <button className={ movieCategoryFilter.length === 0 ? "selecionado" : ""} 
              onClick={()=> handleFilterClick('all')}>Todos</button>

              <button className={movieCategoryFilter.includes("action") ? "selecionado" : ""} 
              onClick={()=> handleFilterClick('action')}>Ação</button>

              <button className={movieCategoryFilter.includes("romance") ? "selecionado" : ""} 
              onClick={()=> handleFilterClick('romance')}>Romance</button>

              <button className={movieCategoryFilter.includes("science fiction") ? "selecionado" : ""} 
              onClick={()=> handleFilterClick('science fiction')}>Ficção científica</button>

              <button className={movieCategoryFilter.includes("horror") ? "selecionado" : ""} 
              onClick={()=> handleFilterClick('horror')}>Terror</button>

            </div>

            <div className="lista-de-filmes">

              {
                listaGeralDeFilmes.filter(filterMovie).map(movie =>
                  <div className="card" style={{"--cardImage":`url(${movie.backgroundImg})`}}>

                    <div className="curtir">
                      <button onClick={()=>alterarCurtida(movie.title)}>
                        <svg width="20" height="18" viewBox="0 0 20 18" fill={movie.isStarred?"#FFF" :"none"} xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2L11.7961 7.52786H17.6085L12.9062 10.9443L14.7023 16.4721L10 13.0557L5.29772 16.4721L7.09383 10.9443L2.39155 7.52786H8.20389L10 2Z" stroke="white" stroke-opacity="0.83"/>
                        </svg>
                      </button>
                      
                    </div>

                    <div>
                      <div className="movie-name">
                        <p>{movie.title}</p> 
                      
                        <span>
                          <img src="/golden-star.svg" alt="" />
                          {movie.starsCount}
                        </span>

                      </div>

                      <div className="sacola">

                        <button onClick={()=>handleAdicionaASacola(movie)}>
                          <p>Sacola</p> <p>R${String(movie.price)}</p>
                        </button>

                      </div>

                    </div>
                  </div>)
              }

              
            </div>
            
          </div>
      </main>
      
      <div className="caixa-lateral">

        <div className="container-sacola">
          <div className="head-sacola">

            <div>
              <img src="/bag-icon.svg" alt="" />
            </div>

            <div>
              <h3>Sacola</h3>
            </div>

          </div>

          <div className="main-sacola">

            {itemsNaSacola.length === 0 ? sacolaVazia : ""}

            <div className="filmes-da-sacola">

              {
                itemsNaSacola.map(item =>
                  <div className="item">

                    <div className="nome-e-preco">

                      <img width="43" src={item.image} alt="" />

                      <div>
                          <div>
                          <span>{item.nome}</span>
                          </div>
                          <div>
                            <span>R${item.preco}</span>
                          </div>
                      </div>

                    </div>
                    
                    <div class="quant-produtos">

                      <button className="quant-item-adicionar" onClick={()=>almentarQuantidadeDeItens(item)}>
                        <img width="24" src="/plus.svg" alt="" />
                      </button>

                      <span> {item.quantidade}</span>

                      <button className="quant-item-remover" onClick={()=>diminuirQuantidadeDeItems(item)}>
                        <img src={item.quantidade > 1 ? "/minus-icon.svg" : "/trash-icon.svg"} alt="" />
                      </button>
                    </div>

                </div>)
              }

            </div>

            <div class="cupom-sacola">
              <p>Insira seu cupom</p>
              <div class="input-sacola">
                <input ref={inputCupon} onKeyPress={inputEnterCupom} type="text" />
                <button onClick={buttonClickCupom}><img src="./coupon-icon.svg" alt="" /></button>
                
              </div>
              
            </div> 

            <div class="button-dados-e-valor">
              {itemsNaSacola.length !== 0 ? dadosValorTotal : <></>}
            </div>

          </div>

          
        </div>
      </div>
      
    </div>
  );
}

export default App;
