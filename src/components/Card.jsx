import {  Soup, Heart, HeartPulse } from "lucide-react";
import { useState } from "react";

const Card = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(localStorage.getItem("favorites")?.includes(recipe.label));

  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeAlreadyInFavorites = favorites.some((fav) => fav.label === recipe.label);

    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  const healthLabels = recipe.healthLabels;
  const colors = [
    {
      
        bg: "bg-[#ECF7D4]",
        badge: "bg-[#D6F497]",
      
    },
    {
      
        bg: "bg-[#F9EFE1]",
        badge: "bg-[#F7E0B8]",
      
    },
    {
      
         bg: "bg-[#FBE5E7]",
        badge: "bg-[#FDC6C7]",
           
      }
      
  ];
  const random = Math.floor(Math.random() * 3) + 1;
   
  const handleHeart = (e) => {
    e.preventDefault();
    addRecipeToFavorites();
  }

  return (
    <>
      <div
        className={`flex flex-col rounded-md ${
          colors[random - 1].bg
        } overflow-hidden p-3 relative`}
      >
        <a
          href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`}
          target="_blank"
          className="relative h-32"
        > 
          <div className="skeleton absolute inset-0" />
          <img
            src={recipe.image}
            alt="recipe-img"
            className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
            onLoad={ (e) => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.previousElementSibling.style.display = "none";
             }}
          />
          <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
            <Soup size={"16"} /> {recipe.yield} servings
          </div>
          <div
            className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
            onClick={handleHeart}
          >
            {!isFavorite ? (
              <Heart
                size={"20"}
                className="hover:fill-red-500 hover:text-red-500"
              />
            ) : (
              <Heart
                size={"20"}
                className="fill-red-500 text-red-500"
              />
            )}
          </div>
        </a>

        <div className="flex mt-1">
          <p className="font-bold tracking-wide">{recipe.label}</p>
        </div>
        <p className="my-2">
          {recipe.cuisineType[0].charAt(0).toUpperCase() +
            recipe.cuisineType[0].slice(1)}
        </p>

        <div className="flex gap-2 mt-auto">
          <div
            className={`flex gap-1 ${
              colors[random - 1].badge
            } items-center p-1 rounded-md`}
          >
            <HeartPulse size={16} />
            <span className="text-sm tracking-tighter font-semibold">
              {healthLabels[0]}
            </span>
          </div>
          <div
            className={`flex gap-1 ${
              colors[random - 1].badge
            } items-center p-1 rounded-md`}
          >
            <HeartPulse size={16} />
            <span className="text-sm tracking-tighter font-semibold">
              {healthLabels[1]}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
