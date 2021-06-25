import React ,{useEffect, useState} from 'react';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';




const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {

      const fetchMeals = async () => {
        let loadedMeals = [];
          const response = await fetch("https://food-app-2e8a8-default-rtdb.firebaseio.com/meals.json");

          if(!response.ok) {
            throw new Error("Something went wrong...");
          }

          const responseData = await response.json();

          for(let key in responseData) {
            loadedMeals.push({id: key, name: responseData[key].name, description: responseData[key].description, price: responseData[key].price})
          }

          setMeals(loadedMeals)
          setTimeout(() => {
            setIsLoading(false);
          }, 800);
    }
    try {
        fetchMeals();
    } catch (error) {
      setIsLoading(false);
      setError(error.message)
    }

  },[]);

  if(isLoading) {
    return <section className={styles.mealsLoading}>
              <Card>
                <p>Loading Meals...</p>
              </Card> 
            </section> ;
  }
  if(error) {
    return <section className={styles.mealsLoading}>
    <Card>
      <p>{error}</p>
    </Card> 
  </section> ;
  }

    const mealsList = meals.map(meal=> <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price}/>);

    return ( <section className={styles.meals}>
                <Card>
                    <ul>{mealsList}</ul>
                </Card>
              </section>
    )
  }

export default AvailableMeals;