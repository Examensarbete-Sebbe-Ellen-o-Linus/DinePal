import { Box, Tooltip } from '@mantine/core';
import { type IDish } from '~/app/interfaces';
import {
  GlutenFreeIcon,
  LactoseFreeIcon,
  SpicyIcon,
  VeganIcon,
  VegitarianIcon,
} from './TagIcons';

export type IconKey =
  | 'spicy'
  | 'vegan'
  | 'vegitarian'
  | 'glutenFree'
  | 'lactoseFree';

export const tagDetails = {
  vegan: { title: 'Vegan', Icon: VeganIcon },
  vegitarian: { title: 'Lakto-ovo vegetarian', Icon: VegitarianIcon },
  glutenFree: { title: 'Glutenfri', Icon: GlutenFreeIcon },
  lactoseFree: { title: 'Laktosfri', Icon: LactoseFreeIcon },
  spicy: { title: 'Stark', Icon: SpicyIcon },
};

export default function Tags({ dish }: { dish: IDish }) {
  return (
    <>
      {dish.tags?.map((tagValue, i) => {
        const tagInfo = tagDetails[tagValue as IconKey];
        if (!tagInfo) return null;
        const { title, Icon } = tagInfo;
        return (
          <Tooltip label={title} key={i}>
            <Box>
              <Icon />
            </Box>
          </Tooltip>
        );
      })}
    </>
  );
}
