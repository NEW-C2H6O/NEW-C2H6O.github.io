import '../style/seatItem.css';

function SeatItem({ seat }) {
  return (
    <li className='seat-item' key={seat.seatId}>
      <span>{seat.name}</span>
      <span>{'·'}</span>
      {seat.profile.map((profile) => (
        <span> {profile.name} </span>
      ))}
    </li>
  );
}

export { SeatItem };
