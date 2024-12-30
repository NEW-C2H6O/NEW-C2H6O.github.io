export const getReservations = () => {
  return [
    {
      reservationId: 1,
      userName: '홍길동#1',
      ott: 'tving',
      profile: '1번',
      start: '2024-12-28T16:30:00',
      end: '2024-12-28T18:00:00',
    },
    {
      reservationId: 2,
      userName: '홍길동#12',
      ott: 'tving',
      profile: '2번',
      start: '2024-12-28T16:30:00',
      end: '2024-12-28T17:00:00',
    },
  ];
};

export const getOtts = () => {
  return [
    {
      ottId: 1,
      name: '왓챠',
      profile: [
        {
          profileId: 1,
          name: '1번',
        },
        {
          profileId: 2,
          name: '2번',
        },
        {
          profileId: 3,
          name: '3번',
        },
        {
          profileId: 4,
          name: '4번',
        },
      ],
    },
    {
      ottId: 2,
      name: '웨이브',
      profile: [
        {
          profileId: 5,
          name: '1번',
        },
        {
          profileId: 6,
          name: '2번',
        },
        {
          profileId: 7,
          name: '3번',
        },
        {
          profileId: 8,
          name: '4번',
        },
      ],
    },
    {
      ottId: 3,
      name: '티빙',
      profile: [
        {
          profileId: 9,
          name: '1번',
        },
        {
          profileId: 10,
          name: '2번',
        },
        {
          profileId: 11,
          name: '3번',
        },
        {
          profileId: 12,
          name: '4번',
        },
      ],
    },
  ];
};
