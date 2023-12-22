import { useEffect, useState } from "react";
import { IHomePage } from "../client/src/app/interfaces";
import { fetchHomePageData } from "../server/sanity/sanity.utils";

function App() {
  const [homePageData, setHomePageData] = useState<IHomePage | null>(null);
  useEffect(() => {
    fetchHomePageData()
      .then((data) => {
        console.log(data); // Check the data in the browser console
        setHomePageData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, []);

  // Render loading state if data is not yet fetched
  if (!homePageData) {
    return <div>Loading...</div>;
  }
  const { hero, about, selectedDishes } = homePageData;

  return (
    <div>
      {/* Hero */}
      <section>
        <h1>{hero.title}</h1>
        {hero.description && <p>{hero.description}</p>}
        {hero.image && <img src={hero.image.url} alt={hero.image.alt}></img>}
        {hero.buttons &&
          hero.buttons.map((button, i) => (
            <button key={i}>{button.text}</button>
          ))}
      </section>
      {/* About */}
      <section>
        <h2>{about.title}</h2>
        {about.description && <p>{about.description}</p>}
      </section>
      {/* Selected dishes */}
      <section>
        <h3>Selected Dishes</h3>
        {selectedDishes &&
          selectedDishes.map((dish, i) => (
            <div key={i}>
              <h4>{dish.title}</h4>
              <p>{dish.description}</p>
              {dish.image && <img src={dish.image.url} alt={dish.image.alt} />}
              {dish.tags &&
                dish.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag.label}
                  </span>
                ))}
            </div>
          ))}
      </section>
    </div>
  );
}

export default App;
