import useUser from "../../hooks/useUser";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import React, { useEffect, useRef } from "react";
import "./homepage.css";

const HomePage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const typeEffectRef = useRef(null);

let animationTimeout;

  const clearAnimation = () => {
    clearTimeout(animationTimeout);
  };

  useEffect(() => {
    const typeEffect = typeEffectRef.current;
    const text = "Food Stuff.";
    let currentIndex = 0;
  
    const typeLetter = () => {
      if (currentIndex < text.length) {
        typeEffect.textContent += text.charAt(currentIndex);
        currentIndex++;
        animationTimeout = setTimeout(typeLetter, 100); // Adjust typing speed here
      }
    };
  
    // Clear existing content before starting the typing animation
    typeEffect.textContent = '';
    typeLetter();
  
    // Cleanup the animation when unmounting
    return clearAnimation;
  }, []);
  

  return (
    <>
        <div id="text">
            <h1 id="home-title">
            Welcome to{" "}<br/>
                <span id="type-effect" ref={typeEffectRef}></span>
            </h1>
      </div>
      <div id="home-menu">
        <button className="home-btn" onClick={() => navigate('/recipes')}>All Recipes</button>
        {user ? (
          <>
            <button className="home-btn" onClick={() => navigate('add-new-recipe')}>Add New Recipe</button>
            <button className="home-btn" onClick={() => signOut(getAuth())}>Log Out</button>
          </>
        ) : (
          <button className="home-btn" onClick={() => navigate('/log-in')}>Log In</button>
        )}
      </div>
    </>
  );
}

export default HomePage;
