import { Fragment, useState } from "react";

const App = () => {
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState("");
  // const [data, setData] = useState([]);
  const [fetchdata , setFectchData] =useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const list ={
        title: movie, 
        detail: date,
    }
    sendData(list);

    setDate("");
    setMovie("");
  };

  async function sendData(data){
    const response = await fetch('https://react-http-f2e92-default-rtdb.firebaseio.com//movies.json', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const det = await response.json();

    console.log(det);
  }

  async function fetchHandler(){
    const response = await fetch('https://react-http-f2e92-default-rtdb.firebaseio.com//movies.json');

    const det = await response.json();
    
    const load = [];
    for (const key in det){
        load.push({
            id: key, 
            title: det[key].title, 
            detail: det[key].detail,
        })
    }
    setFectchData(load);

  }

  let content=<h1>nothing to show- fetch it</h1>;

  if(fetchdata.length > 0){
    content = fetchdata.map((e) => {
        return (<>
         <h2>{e.title}</h2>
        <h2>{e.detail}</h2>
        <h1>----------</h1>
        </>)
       
    });
  }




  return (
    <Fragment>
      <form onSubmit={submitHandler}>
      <input
        required
        type="text"
        value={movie}
        placeholder="enter the movie name"
        onChange={(e) => {
          setMovie(e.target.value);
        }}
      ></input>
      <input
      required
      value={date}
        type="text"
        placeholder="enter the year of the movie"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      ></input>
      <button type="submit">Submit data </button>

      </form>
     
      <button onClick={fetchHandler}> Fetch data</button>
      {content}
    </Fragment>
  );
};

export default App;
