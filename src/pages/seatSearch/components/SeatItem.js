function SeatItem({ seat }) {
  return (
    <li className='seat-item' key={seat.seatId}>
      <span> {seat.name} {' · '} </ span>

      {seat.profile.map((profile) =>
        <span> {profile.name} </ span>
      )}
    </li>
  );
}

export {SeatItem};
