import { useState } from "react";
import MealCard from "./MealCard";
import useMeals from "../hooks/useMeals";

const Meals = () => {


    const [priceSort, setPriceSort] = useState([0, 1000]);
    const [search, setSearch] = useState(['']);
    const [category, setCategory] = useState(['']);

    const handleSearch = e => {
        e.preventDefault();
        const search = e.target.search.value;
        setSearch([search]);
    }

    const handlePriceSort = e => {
        e.preventDefault();
        const min = e.target.min.value;
        const max = e.target.max.value;
        setPriceSort([min||0, max||1000])

    }

    const handleCategory = (e) => {
        e.preventDefault();
        const category = e.target.value;
        if (category === 'All Meals') {
            setCategory(['']);
        }else{
        setCategory([category]);
        };
    }
   
    const [meals] = useMeals(priceSort, search, category);


    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-2 items-center justify-center lg:justify-between px-4 lg:px-8 my-4">
                <select onChange={handleCategory} className="select w-full max-w-xs border-2 border-[#f16667]">
                    <option disabled selected>Filter By Category</option>
                    <option>All Meals</option>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                </select>

                <form onSubmit={handleSearch} className="flex">
                    <input
                        name="search"
                        type="text"
                        placeholder="Search for meal"
                        className="w-full lg:w-72 rounded-l-lg border-t-2 border-b-2 border-l-2 border-[#f16667] py-2 px-4 shadow-sm sm:text-sm"
                    />
                    <button type="submit" className="text-white border bg-[#f16667] px-2 rounded-r-lg">
                        Search
                    </button>
                </form>

                <div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="px-3 py-2 rounded-lg bg-[#f16667] text-white">Filter By Price Range</div>
                        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <form onSubmit={handlePriceSort} className="flex justify-center items-center flex-col gap-2">
                                <input type="number" name="min" placeholder="Lowest Price" className="rounded-lg w-full"/>
                                <input type="number" name="max" placeholder="Highest Price" className="rounded-lg w-full"/>
                                <button type="submit"  className="px-3 py-2 w-36 text-black rounded-lg border border-[#f16667] hover:bg-[#f16667] hover:text-white">Filter</button>
                            </form>
                        </ul>
                    </div>
                    
                </div>
            </div>
            <div className='mx-4 lg:mx-8 my-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    meals?.map(meal => <MealCard key={meal._id} meal={meal}></MealCard>)
                }
            </div>
        </div>
    );
};

export default Meals;