import React ,{useState , useEffect , } from 'react';
const App = () => {

//state 

const [ news        , setNews        ] = useState([]);
const [ searchQuery , setSearchQuery ] = useState('react'); // default search it will be react and if the user type any thing else it will be search query 
const [ url         , setUrl         ] = useState(`http://hn.algolia.com/api/v1/search?query=react`);
const [ loading      , setLoading    ] = useState(false);

//fetch news 

const fetchNews =()=>{
    setLoading(false);
    fetch(url)
    .then  (result => result.json())// convert result into json 
    .then  (data   => setNews(data.hits),setLoading(false))
    .catch (err    => console.log(err))
};

// this method is waiting untill the button is cliked and the url changed 

useEffect(()=>{fetchNews()},[url]);//url is changed only when the button is cliked

// handel search change

const handleChange =(e)=>{
setSearchQuery(e.target.value);
}

// handel submit event 

const handelSubmit = e =>{
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
}

const showLoading =() => {loading ? <h2>Loading...</h2>:""}

const searchform = () => {
    <form onSubmit={handelSubmit}>
            <input type='text' value={searchQuery} onChange={handleChange} />
            <button>search</button>
    </form>    
}

const showNews = () =>( news.map((n,i)=>(<p key={i}>{n.title}</p>)))

    return (
        <div>

        <h2>News </h2>
        {showLoading()}
        {searchform()}
        {showNews()}
        </div>
      
      );
}
 
export default App;