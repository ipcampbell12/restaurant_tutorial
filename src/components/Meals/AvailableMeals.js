import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {

  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  //no default value
  const [httpError, setHttpError] = useState()

  //function passed to useEffect should not return a promise
  //may return a cleanup function, which should run synchronously
  //so create a new function inside which is asynchronous (but useEffect itself is still synchronous)
  useEffect(() => {

    const fecthMeals = async () => {
      setIsLoading(true)
      const response = await fetch('https://react-http-fd0fb-default-rtdb.firebaseio.com/meals.json')

      //if error
      if (!response.ok) {
        throw new Error("Something went wrong!")
      }
      //lines after won't execute

      const responseData = await response.json()
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price

        })
      }
      setMeals(loadedMeals)

      //done loading, so remove spinner
      setIsLoading(false)
    }

    try {
      fecthMeals()
    } catch (error) {

      setIsLoading(false)
      setHttpError(error.message)

    }

  }, []);


  //don't return component if still loading
  if (isLoading) {
    return <section className={classes.MealsLoading}>
      <p>Loading ... </p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
