import classes from './AvailableMeals.Module.css'
import React from 'react'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 199,
    },
    {
      id: 'm2',
      name: 'Pasta',
      description: 'A german specialty!',
      price: 99,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 149,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 229,
    },
  ];
const AvailableMeals =()=>{
const mealsList=DUMMY_MEALS.map((meal)=>
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