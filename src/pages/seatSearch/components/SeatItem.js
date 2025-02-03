import '../style/seatItem.css';

function SeatItem({ seat }) {
  return (
    <li className='seat-item' key={seat.ottId}>
      <span>{seat.name}</span>
      <span>{'·'}</span>
      {seat.profiles.map((profile) => (
        <span> {profile.name} </span>
      ))}
    </li>
  );
}

export { SeatItem };
