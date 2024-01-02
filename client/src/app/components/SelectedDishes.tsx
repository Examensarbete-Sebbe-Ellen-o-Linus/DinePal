import Link from "next/link";
import { IDish } from "../interfaces";

export default function SelectedDishes({ dishes }: { dishes: IDish[] }) {
  return (
    <section>
      <h3>Example how to display selected Dishes</h3>
      {dishes &&
        dishes.map((dish, i) => (
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

            {dish.slug && dish.slug.current && (
              <li>
                <Link key={i} href={`/product/${dish.slug.current}`}>
                  {dish.title}
                </Link>
              </li>
            )}
          </div>
        ))}
    </section>
  );
}
