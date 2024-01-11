import AddAllowedUser from '../_components/addAllowedUser/addAllowedUser';
import { CreateFood } from '../_components/createFood/create-food';
import { FullMenu } from '../_components/fullMenu/full-menu';

export default async function Testpage() {
  // const createFood = api.example.create.useMutation();
  return (
    <div>
      <CreateFood />
      <FullMenu />
      <AddAllowedUser />
    </div>
  );
}
