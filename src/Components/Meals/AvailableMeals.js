import {useEffect,useState} from 'react'
import classes from './AvailableMeals.Module.css'
import React from 'react'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import axios from 'axios'


const AvailableMeals =()=>{
  const [meals,setMeals]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [errorMessage,setErrorMessage]=useState();
  useEffect(()=>{
    const fetchMeals = async ()=>{
      const response1 = await axios.get('https://food-ordering-app-1b0f9-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
      
      const response = await fetch('https://food-ordering-app-1b0f9-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
      if(!response1.status===200){
        throw new Error('Something Went Wrong');
      } 
      const responseData = await response1.data;
      const mealsList=[];
      console.log(responseData);
      for(const key in responseData){
        mealsList.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price
        });
      };
      setMeals(mealsList);
      setIsLoading(false);
    }
    
    fetchMeals().catch((error)=>{
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  },[]);

if(isLoading)
{
  return(
    <section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>
  );
}
if(errorMessage!=null){
  return(
    <section className={classes.errorMessage}>
      <p>{errorMessage}</p>
    </section>
  );
}
const mealsList=meals.map((meal)=>
    <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>);
return(
    <section className={classes.meals}>
        <Card>
        {mealsList}
        </Card>
        
    </section>
);
}

export default AvailableMeals;