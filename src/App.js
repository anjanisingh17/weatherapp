import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [inputval,setInputVal] = useState('pune');
  const [iconimg, setIconImg] = useState('clouds');
  const [weatherStatus, setWeatherStatus] = useState('clouds');
  const [city, setCity] = useState('Pune');
  const [country, setCountry] = useState('IN');
  const [temprature, setTemprature] = useState('25');


  const fetchData = async(para)=>{

     const url = `https://api.openweathermap.org/data/2.5/weather?q=${para}&units=metric&appid=2d4a63ea0bfee20697bf482725ccf5b0`;
     const data = await fetch(url);
     const result = await data.json();
     console.log(result);
     
     const img_icon =  result['weather'][0]['icon'] ;
     const weather_status =  result['weather'][0]['main'] ;  
     const temp_val =  result['main']['temp'] ;  
     const city_name = result['name'];   
     const country_name = result['sys']['country'];         
     const final_img_icon = `https://openweathermap.org/img/wn/${img_icon}.png` ;

     setIconImg(final_img_icon);
     setWeatherStatus(weather_status);
     setTemprature(temp_val);
     setCity(city_name);
     setCountry(country_name);

  }

  const onchangeFunc = (e)=>{
    
    setInputVal(e.target.value);
    

  }

  useEffect(()=>{
    fetchData(inputval); 
  },[inputval])

  
  return (
    <>

    
   <div  style={{width:'500px',margin:'auto',paddingTop:'20px'}}>
     <h3 style={{textAlign:'center'}}>Weather App</h3>
     <div style={{width:'400px',margin:'auto',padding:'10px'}}>
     <input className="container" style={{padding:'5px 10px',borderRadius:'5px'}} type="search" onChange={onchangeFunc}  placeholder="Enter city name" aria-label="Search" />
     </div>

  
     <div class="card">
      
      <div style={{width:'100%',float:'left'}}>
          <div style={{width:'80%',float:'left',background:'orange',minHeight:'70px'}}>
             <p style={{textAlign:'center',marginTop:'20px'}}>{weatherStatus}</p>
          </div>

          <div style={{backgroundColor:'green',textAlign:'center',width:'20%',float:'right',minHeight:'70px'}}>
            <img src={iconimg} alt='This is weather icon'style={{width:'70px',height:'70px'}} />
          </div>
      </div>

      <div style={{width:'100%',float:'left'}}>
          <div style={{width:'80%',float:'left',background:'green',minHeight:'70px'}}>
             <p style={{textAlign:'center',marginTop:'20px'}}>{city}, {country}</p>
          </div>

          <div style={{backgroundColor:'orange',textAlign:'center',width:'20%',float:'right',minHeight:'70px'}}>
            <p style={{textAlign:'center',marginTop:'20px'}}> {temprature}<sup>0</sup>C </p>
          </div>
      </div>

    </div>

    </div>


     </>
  );
}

export default App;
