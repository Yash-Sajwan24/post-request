import { Fragment, useState } from "react";

const App = () => {
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);

  const submitHandler = () => {
    const list ={
        title: movie, 
        detail: date,
    }
    setData(list);
    sendData();
  };

  async function sendData(){
    const response = await fetch('https://react-http-f2e92-default-rtdb.firebaseio.com//movies.json', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const det = await response.json();

    setMovie("");
    setDate("");
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
    setData(load);

  }

  let content=<h1>nothing to show- fetch it</h1>;

  if(data.length > 0){
    content = data.map((e) => {
        return (<>
         <h2>{e.title}</h2>
        <h2>{e.detail}</h2>
        </>)
       
    });
  }




  return (
    <Fragment>
      <input
        type="text"
        value={movie}
        placeholder="enter the movie name"
        onChange={(e) => {
          setMovie(e.target.value);
        }}
      ></input>
      <input
      value={date}
        type="text"
        placeholder="enter the year of the movie"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      ></input>
      <button  onClick={submitHandler}>Submit data </button>
      <button onClick={fetchHandler}> Fetch data</button>
      {content}
    </Fragment>
  );
};

export default App;
