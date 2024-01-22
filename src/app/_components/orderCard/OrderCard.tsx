import {
  Accordion,
  ActionIcon,
  Box,
  Center,
  Divider,
  Menu,
  Text,
  Tooltip,
  type AccordionControlProps,
} from '@mantine/core';
import type { Order, Orderstatus } from '@prisma/client';
import TimeAgo from 'javascript-time-ago';
import sv from 'javascript-time-ago/locale/sv.json';
import ReactTimeAgo from 'react-time-ago';
import { api } from '~/trpc/react';
import classes from './OrderCard.module.scss';
import Status from './components/Status';

type Props = {
  order: Order;
};

export default function OrderCard({ order }: Props) {
  TimeAgo.addDefaultLocale(sv);
  const quantity = order.cart.dish.reduce((acc, dish) => {
    return acc + dish.quantity;
  }, 0);

  const { refetch: refetchOrders } = api.order.getOrders.useQuery();

  const updateOrderStatus = api.order.changeOrderStatus.useMutation({
    onSuccess: async () => {
      await refetchOrders();
    },
  });

  const handleOrderStatusChange = (newStatus: Orderstatus) => {
    updateOrderStatus.mutate({ id: order.id, orderStatus: newStatus });
  };

  const commentIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
    >
      <path
        d='M12 21.5C13.78 21.5 15.5201 20.9722 17.0001 19.9832C18.4802 18.9943 19.6337 17.5887 20.3149 15.9442C20.9961 14.2996 21.1743 12.49 20.8271 10.7442C20.4798 8.99836 19.6226 7.39472 18.364 6.13604C17.1053 4.87737 15.5016 4.0202 13.7558 3.67294C12.01 3.32567 10.2004 3.5039 8.55585 4.18509C6.91131 4.86628 5.50571 6.01983 4.51677 7.49987C3.52784 8.97991 3 10.72 3 12.5C3 13.988 3.36 15.391 4 16.627L3 21.5L7.873 20.5C9.109 21.14 10.513 21.5 12 21.5Z'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
  const transparentIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      style={{ opacity: '0' }}
    >
      <path
        d='M12 21.5C13.78 21.5 15.5201 20.9722 17.0001 19.9832C18.4802 18.9943 19.6337 17.5887 20.3149 15.9442C20.9961 14.2996 21.1743 12.49 20.8271 10.7442C20.4798 8.99836 19.6226 7.39472 18.364 6.13604C17.1053 4.87737 15.5016 4.0202 13.7558 3.67294C12.01 3.32567 10.2004 3.5039 8.55585 4.18509C6.91131 4.86628 5.50571 6.01983 4.51677 7.49987C3.52784 8.97991 3 10.72 3 12.5C3 13.988 3.36 15.391 4 16.627L3 21.5L7.873 20.5C9.109 21.14 10.513 21.5 12 21.5Z'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
  const dotsMenuIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M9 15.25C9 14.9185 9.1317 14.6005 9.36612 14.3661C9.60054 14.1317 9.91848 14 10.25 14C10.5815 14 10.8995 14.1317 11.1339 14.3661C11.3683 14.6005 11.5 14.9185 11.5 15.25C11.5 15.5815 11.3683 15.8995 11.1339 16.1339C10.8995 16.3683 10.5815 16.5 10.25 16.5C9.91848 16.5 9.60054 16.3683 9.36612 16.1339C9.1317 15.8995 9 15.5815 9 15.25ZM9 10.25C9 9.91848 9.1317 9.60054 9.36612 9.36612C9.60054 9.1317 9.91848 9 10.25 9C10.5815 9 10.8995 9.1317 11.1339 9.36612C11.3683 9.60054 11.5 9.91848 11.5 10.25C11.5 10.5815 11.3683 10.8995 11.1339 11.1339C10.8995 11.3683 10.5815 11.5 10.25 11.5C9.91848 11.5 9.60054 11.3683 9.36612 11.1339C9.1317 10.8995 9 10.5815 9 10.25ZM9 5.25C9 4.91848 9.1317 4.60054 9.36612 4.36612C9.60054 4.1317 9.91848 4 10.25 4C10.5815 4 10.8995 4.1317 11.1339 4.36612C11.3683 4.60054 11.5 4.91848 11.5 5.25C11.5 5.58152 11.3683 5.89946 11.1339 6.13388C10.8995 6.3683 10.5815 6.5 10.25 6.5C9.91848 6.5 9.60054 6.3683 9.36612 6.13388C9.1317 5.89946 9 5.58152 9 5.25Z'
        fill='black'
      />
    </svg>
  );

  const tooltipText = (status: Orderstatus) => {
    switch (status) {
      case 'received':
        return 'Mottagen';
      case 'ongoing':
        return 'Pågående';
      case 'completed':
        return 'Färdigställd';
      default:
        return '';
    }
  };

  function AccordionControl(props: AccordionControlProps) {
    return (
      <Center>
        <Accordion.Control {...props} />
        <Menu withinPortal position='bottom-end' withArrow>
          <Menu.Target>
            <ActionIcon size='lg' variant='subtle' color='gray'>
              {dotsMenuIcon}
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Välj status</Menu.Label>
            <Menu.Item onClick={() => handleOrderStatusChange('received')}>
              Mottagen
            </Menu.Item>
            <Menu.Item onClick={() => handleOrderStatusChange('ongoing')}>
              Pågående
            </Menu.Item>
            <Menu.Item onClick={() => handleOrderStatusChange('completed')}>
              Färdigställd
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Center>
    );
  }

  return (
    <Accordion className={classes.accordion} chevronPosition='left' mx='auto'>
      <Accordion.Item value='item-1'>
        <AccordionControl>
          <Box className={classes.accordionContent}>
            <Text>{quantity} st</Text>
            <Text>{order.orderNumber}</Text>
            {order.customer.comment !== '' ? commentIcon : transparentIcon}
            <Tooltip
              label={tooltipText(order.orderStatus)}
              position='top'
              withArrow
            >
              <div>
                <Status status={order.orderStatus} />
              </div>
            </Tooltip>
          </Box>
        </AccordionControl>
        <Accordion.Panel>
          <Divider />
          <Box>
            {order && order.orderStatus !== 'completed' && (
              <Text className={classes.timeAgo}>
                Tillagd <ReactTimeAgo date={order.createdAt!} />
              </Text>
            )}
            <Text>
              <strong>Rätter:</strong>
            </Text>

            {order.cart.dish.map((d, i) => (
              <Text key={i}>
                x{d.quantity} {d.title}
              </Text>
            ))}
          </Box>
          <Box>
            {order.customer.comment !== '' && (
              <>
                <Text>
                  <strong>Kommentar:</strong>
                </Text>

                <Text>{order.customer.comment}</Text>
              </>
            )}
          </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
