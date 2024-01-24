/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Menu,
  NumberInput,
  Text,
  Title,
} from '@mantine/core';
import { DatePicker, type DatePickerProps } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useMediaQuery } from '@mantine/hooks';
import type { Table, TableBooking } from '@prisma/client';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import { useEffect, useState } from 'react';
import { theme } from '~/app/_theme/theme';
import { api } from '~/trpc/react';
import classes from './Bookings.module.scss';

// const socket = io('https://socket-server-dinepal-237ee597ef2d.herokuapp.com');
export default function Bookings() {
  const { data: bookings, refetch: refetchBookings } =
    api.booking.getTableBookings.useQuery();

  const { data: tables, refetch: refetchTables } =
    api.booking.getTables.useQuery();
  console.log('tables', tables);

  const addTable = api.booking.addTable.useMutation({
    onSuccess: async data => {
      console.log('Table added:', data);
      setSizeOfTable('');
      await refetchTables();
    },
  });

  const handleAddTable = () => {
    if (!tables) return;
    addTable.mutate({
      tableNumber: tables.length + 1,
      size: parseInt(sizeOfTable),
    });
  };

  const deleteTable = api.booking.removeTable.useMutation({
    onSuccess: async data => {
      console.log('Table deleted:', data);
      await refetchTables();
    },
  });

  const handleDeleteTable = (id: string) => {
    deleteTable.mutate({
      id,
    });
  };

  const updateBookingWithTableNumber =
    api.booking.setTableNumberToBooking.useMutation({
      onSuccess: async data => {
        console.log('Booking updated:', data);
        await refetchBookings();
      },
      onError: error => {
        console.log('error updating the table number:', error);
      },
    });

  const handleUpdateBookingWithTableNumber = (
    booking: TableBooking,
    table: Table
  ) => {
    updateBookingWithTableNumber.mutate({
      tableNumber: table.tableNumber,
      bookingId: booking.id,
    });
  };

  const deleteBooking = api.booking.deleteTableBooking.useMutation({
    onSuccess: async data => {
      console.log('Booking deleted:', data);
      await refetchBookings();
    },
    onError: error => {
      console.log('error deleting the booking:', error);
    },
  });

  const handleDeleteBooking = (booking: TableBooking) => {
    deleteBooking.mutate({
      id: booking.id,
    });
  };

  function findAvailableTables(booking: TableBooking): Table[] {
    if (!tables) return [];
    const startOfBooking = dayjs(`${booking.date}T${booking.time}`);
    const endOfBooking = startOfBooking.add(2, 'hour');

    // Filter out tables with conflicting bookings
    const availableTables = tables.filter(table => {
      const conflictingBooking = filteredBookings.find(b => {
        const bookingStart = dayjs(b.date);
        const bookingEnd = bookingStart.add(2, 'hour');
        return (
          (b.tableNumber === table.tableNumber &&
            b.bookingStatus === 'booked') ||
          ('bookedAndConfirmed' &&
            bookingStart.isBefore(endOfBooking) &&
            bookingEnd.isAfter(startOfBooking))
        );
      });
      return !conflictingBooking;
    });

    return availableTables;
  }

  const bookedDates = bookings?.map(booking => dayjs(booking.date));
  const isDesktop = useMediaQuery(`(min-width: 36em`);
  const [sizeOfTable, setSizeOfTable] = useState<any>();
  const [choosenDate, setChoosenDate] = useState<Date | null>(new Date());
  const [formattedChoosenDate, setFormattedChoosenDate] = useState<string>('');
  const [filteredBookings, setFilteredBookings] = useState<TableBooking[]>([]);

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
  const tableIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='19'
      viewBox='0 0 24 19'
      fill='none'
    >
      <path
        d='M4.8 19L6.6 14.5469C6.78 14.0917 7.07 13.7303 7.47 13.4627C7.87 13.1951 8.32 13.0617 8.82 13.0625H10.8V8.28281C7.74 8.18385 5.1748 7.73854 3.1044 6.94688C1.034 6.15521 -0.000799537 5.225 4.63499e-07 4.15625C4.63499e-07 3.00833 1.17 2.02865 3.51 1.21719C5.85 0.405729 8.68 0 12 0C15.34 0 18.1752 0.405729 20.5056 1.21719C22.836 2.02865 24.0008 3.00833 24 4.15625C24 5.225 22.9648 6.15521 20.8944 6.94688C18.824 7.73854 16.2592 8.18385 13.2 8.28281V13.0625H15.18C15.66 13.0625 16.1052 13.1963 16.5156 13.4639C16.926 13.7315 17.2208 14.0925 17.4 14.5469L19.2 19H16.8L15.36 15.4375H8.64L7.2 19H4.8Z'
        fill='black'
      />
    </svg>
  );
  const personIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='17'
      viewBox='0 0 24 17'
      fill='none'
    >
      <path
        d='M16.5956 8.2351C18.4886 8.2351 20.1171 6.54482 20.1171 4.34368C20.1171 2.16911 18.48 0.558105 16.5956 0.558105C14.7116 0.558105 13.074 2.20425 13.074 4.36125C13.074 6.54482 14.7026 8.2351 16.5956 8.2351ZM6.462 8.43782C8.09957 8.43782 9.52629 6.95839 9.52629 5.04782C9.52629 3.15525 8.09057 1.75511 6.462 1.75511C4.82486 1.75511 3.38057 3.19039 3.38957 5.06582C3.38957 6.95839 4.81586 8.43782 6.46243 8.43782M1.54971 16.3878H8.24057C7.32514 15.0584 8.44329 12.382 10.3363 10.9205C9.35914 10.2691 8.09957 9.78482 6.45343 9.78482C2.48271 9.78439 0 12.7158 0 15.1548C0 15.9477 0.440143 16.3878 1.54971 16.3878ZM11.058 16.3878H22.1246C23.5067 16.3878 24 15.9914 24 15.2165C24 12.9451 21.156 9.81096 16.587 9.81096C12.0266 9.81096 9.18257 12.9451 9.18257 15.217C9.18257 15.9914 9.67543 16.3878 11.058 16.3878Z'
        fill='black'
      />
    </svg>
  );

  const getDayProps: DatePickerProps['getDayProps'] = date => {
    const styles: any = {};

    if (
      bookedDates?.some(bookedDates => dayjs(date).isSame(bookedDates, 'day'))
    ) {
      styles.backgroundColor = theme.colors?.red?.[6] ?? '#FA5252';
      styles.color = theme.colors?.white?.[1] ?? '#ffffff';
      styles.borderRadius = '50%';
    }
    if (choosenDate && dayjs(date).isSame(choosenDate, 'day')) {
      styles.backgroundColor = theme.colors?.black?.[3] ?? '#221F1F';
    }

    if (Object.keys(styles).length > 0) {
      return { style: styles };
    }
    return {};
  };

  useEffect(() => {
    if (bookings && choosenDate) {
      const bookingsOfChoosenDay = bookings.filter(booking =>
        dayjs(booking.date).isSame(choosenDate, 'day')
      );
      setFilteredBookings(bookingsOfChoosenDay);
      setFormattedChoosenDate(dayjs(choosenDate).format('DD MMM'));
      console.log('filteredBookings:', filteredBookings);
    }
  }, [choosenDate, bookings]);

  // useEffect(() => {
  //   const fetchNewBookings = async () => {
  //     await refetchBookings();
  //     console.log('useEffect triggered by socket!');
  //   };
  //   socket.on('bookingCreated', fetchNewBookings);

  //   return () => {
  //     socket.off('bookingCreated', fetchNewBookings);
  //   };
  // });

  return (
    <Box className={classes.container}>
      <Title order={3}>Bokningar</Title>
      <Box>
        <Box
          style={{
            marginLeft: '1rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              background: theme.colors?.red?.[6] ?? '#FA5252',
              marginRight: '0.5rem',
            }}
          />
          <Text style={{ fontSize: '4rem' }}>
            = Det finns bokningar denna dag
          </Text>
        </Box>
        <Box className={classes.boxContainer}>
          <Box style={{ display: 'flex', alignContent: 'center' }}>
            <DatePicker
              size={isDesktop ? 'xl' : 'md'}
              locale='sv'
              getDayProps={getDayProps}
              value={choosenDate}
              onChange={date => {
                setChoosenDate(date);
              }}
            />
          </Box>
          <Box className={classes.bookingsContainer}>
            <Title order={6}>Bokningar {formattedChoosenDate}</Title>
            <Divider style={{ margin: '0.4rem 0' }} />
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b, index) => (
                <Box key={b.id}>
                  <Box className={classes.bookingContainerTop}>
                    <Text>{b.email}</Text>
                    <Menu withinPortal position='bottom-end' withArrow>
                      <Menu.Target>
                        <ActionIcon size='lg' variant='subtle' color='gray'>
                          {dotsMenuIcon}
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Label>Välj bord</Menu.Label>
                        {findAvailableTables(b).map(table => (
                          <Menu.Item
                            key={table.id}
                            onClick={() =>
                              handleUpdateBookingWithTableNumber(b, table)
                            }
                          >
                            <Box
                              style={{
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'center',
                              }}
                            >
                              <Text>
                                {tableIcon} {table.tableNumber}
                              </Text>
                              <Text>
                                {personIcon} {table.size}
                              </Text>
                            </Box>
                          </Menu.Item>
                        ))}
                        <Menu.Item onClick={() => handleDeleteBooking(b)}>
                          <Text>Ta bort</Text>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Box>
                  <Text>
                    {b.firstName} {b.lastName}
                  </Text>
                  <Text>{b.time}</Text>
                  <Text>Antal gäster: {b.guests}</Text>
                  {b.tableNumber ? (
                    <Text>Bord: {b.tableNumber}</Text>
                  ) : (
                    <Text>Bord: Ej valt</Text>
                  )}
                  <Text>Status: {b.bookingStatus}</Text>
                  {index !== filteredBookings.length - 1 && (
                    <Divider style={{ marginTop: '0.5rem' }} />
                  )}
                </Box>
              ))
            ) : (
              <Text>Inga Bokningar denna dag</Text>
            )}
          </Box>
        </Box>
        <Box className={classes.tableSection}>
          <Title order={4}>Bord:</Title>

          {tables &&
            tables.map(table => (
              <Box className={classes.tableRow} key={table.id}>
                <Text>
                  {tableIcon} {table.tableNumber}
                </Text>
                <Text>
                  {personIcon}
                  {table.size}
                </Text>
                <Text onClick={() => handleDeleteTable(table.id)}>❌</Text>
              </Box>
            ))}

          <Box>
            <form action=''>
              <NumberInput
                label='Storlek på bord'
                name='lastName'
                value={sizeOfTable}
                min={2}
                onChange={value => setSizeOfTable(value)}
              />
              <Button onClick={() => handleAddTable()}>Lägg till Bord</Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
