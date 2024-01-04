import { fetchDishes } from '~/server/sanity/sanity.utils';

export default async function Menu() {
  const dishes = await fetchDishes();
  return (
    <>
      <h1>Menu</h1>
      <h2>All dishes</h2>
      {dishes?.map((dish, i) => (
        <div key={i}>
          <h4>{dish.title}</h4>
          <p>{dish.description}</p>
          {dish.image && <img src={dish.image.url} alt={dish.image.alt} />}
          {dish.tags?.map((tag, index) => <span key={index}>{tag.label}</span>)}
        </div>
      ))}
    </>
  );
}
