import { Tabs } from 'flowbite-react';
import useMeals from '../../hooks/useMeals';
import MealCard from '../MealCard';

const TabSection = () => {

    const [meals] = useMeals();
    console.log(meals);

    const breakfast = meals.filter(meal=> meal.MealType === 'Breakfast');
    const lunch = meals.filter(meal=> meal.MealType === 'Lunch');
    const dinner = meals.filter(meal=> meal.MealType === 'Dinner');

    return (
        <div className='flex justify-center items-center mt-12 px-4 lg:px-8'>
            <Tabs className='flex justify-center' aria-label="Pills" style="pills">
                <Tabs.Item active title="All Meals">
                    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'> 
                        {
                            meals.map(meal=> <MealCard meal={meal} key={meal._id}></MealCard>)
                        }
                    </div>
                </Tabs.Item>
                <Tabs.Item title="Breakfast">
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'> 
                        {
                            breakfast.map(meal=> <MealCard meal={meal} key={meal._id}></MealCard>)
                        }
                    </div>
                </Tabs.Item>
                <Tabs.Item title="Lunch">
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'> 
                        {
                            lunch.map(meal=> <MealCard meal={meal} key={meal._id}></MealCard>)
                        }
                    </div>
                </Tabs.Item>
                <Tabs.Item title="Dinner">
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'> 
                        {
                            dinner.map(meal=> <MealCard meal={meal} key={meal._id}></MealCard>)
                        }
                    </div>
                </Tabs.Item>
                
            </Tabs>
        </div>
    );
};

export default TabSection;