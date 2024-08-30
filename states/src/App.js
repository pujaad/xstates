import React,{useState,useEffect} from "react";

function App() {
  const[countries,setCountries]=useState([])
  const [selectedCountry,setSelectedCountry]=useState("")
  const [selectedState,setSelectedState]=useState("")
  const[cities,setCities]=useState([])
  const[selectedCity,setSelectedCity]=useState("")
  const [states,setStates]=useState([])
  const fetchCountries= async()=>{
    try{
    let response=await fetch("https://crio-location-selector.onrender.com/countries")
     const data= await response.json()
     setCountries(data)
  }catch(error){
    console.error('Failed to fetch countries:', error);

  }
}
const fetchStates=async()=>{

  if(selectedCountry)
  try{
    let response=await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
     const data= await response.json()
     setStates(data)
  }catch(error){
    console.error('Failed to fetch countries:', error);

  }
}
const fetchCities=async()=>{

  if(selectedCountry && selectedState)
  try{
    let response=await fetch( `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
     const data= await response.json()
     setCities(data)
  }catch(error){
    console.error('Failed to fetch countries:', error);

  }
}



useEffect(()=>{
 fetchCountries()
 
},[])
useEffect(()=>{
  fetchStates()
  
 },[selectedCountry])

 useEffect(()=>{
  fetchCities()
 },[selectedCountry,selectedState])
  return (
  
    
    <>
    <h1>Select Location</h1>
    <select onChange={(e)=>setSelectedCountry(e.target.value)} value={selectedCountry}>
      <option value="">Select a country</option>
      {countries.map((country)=>(
       <option key={country} value={country}>{country}</option>
      ))}
    </select>
    <select onChange={(e)=>setSelectedState(e.target.value)} value={selectedState} disabled={!selectedCountry}>
    <option value="">Select a state</option>
      {states.map((state)=>(
         <option key={state} value={state}>{state}</option>
      ))}
    </select>
    <select onChange={(e)=>setSelectedCity(e.target.value)} value={selectedCity} disabled={!selectedState}>
    <option value="">Select a City</option>
      {cities.map((city)=>(
         <option key={city} value={city}>{city}</option>
      ))}
    </select>
    {selectedCity&& (<p>
      You selected <strong>{selectedCity}</strong>,
      <span style={{color:"lightgrey"}}>{selectedState}, {selectedCountry}</span>
      </p>
    )}
    </>
  );
}

export default App;
