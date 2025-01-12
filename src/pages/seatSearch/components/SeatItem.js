function SeatItem({seat}) {
  return (
    <li className='seat-item' key={seat.seatId}>
      <div className='seat-info'>
        <span> {seat.ott} {' · '} </ span>

        {seat.profile.map((profile) =>
          <span> {profile.name} </ span>
        )}
      </div>
    </li>
  );
}

export {SeatItem};
