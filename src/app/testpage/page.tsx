import { CreateFood } from '../_components/create-food';
import { FullMenu } from '../_components/full-menu';

export default async function Testpage() {
  // const createFood = api.example.create.useMutation();
  return (
    <div>
      <CreateFood />
      <FullMenu />
    </div>
  );
}
