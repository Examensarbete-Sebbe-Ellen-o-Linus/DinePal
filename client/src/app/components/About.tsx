import { IAbout } from "../interfaces";

export default async function About({ about }: { about: IAbout }) {
  return (
    <section>
      <h2>{about.title}</h2>
      {about.description && <p>{about.description}</p>}
    </section>
  );
}
