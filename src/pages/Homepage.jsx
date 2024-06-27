import { Search } from "lucide-react";
import Card from "../components/Card";
import { useState,useEffect } from "react";

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;

const Homepage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  
  
  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await fetch(`https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}&type=public`);
       
      const data = await res.json();
  
      setRecipes(data.hits);
     


    } catch (error) {
      console.log(error.message);
    }
    finally {
      setLoading(false);
    }
  }
useEffect(() => {
    fetchRecipes("bhindi");
    },[])
    
  const arr = new Array(9).fill(0);
  
  const handleSearchRecipe = (e) => {
    e.preventDefault();
    fetchRecipes(e.target[0].value);
  }
    return (
      <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearchRecipe} >
          <label className="input shadow-md flex items-center gap-2">
            <Search size={"24"} />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What do you want to cook Today?"
              />
          </label>
        </form>

        <p className="font-bold text-3xl md:text-5xl mt-4">
          Recomended Recipes
        </p>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular Choices
        </p>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              { !loading && recipes.map((reci, index) => {
                return <Card key={ index } recipe={ reci.recipe } />
              }) }
          {/* you can make a separate component for card*/}
          
          
          { loading && arr.map((_, idx) => {
              return (
                <div key={idx} className="flex w-52 flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4">
                      <div className="skeleton h-4 w-20"></div>
                      <div className="skeleton h-4 w-28"></div>
                    </div>
                  </div>
                  <div className="skeleton h-32 w-full"></div>
                </div>
              );
          }) }
          
        </div>
      </div>
    </div>
  );
}

export default Homepage
