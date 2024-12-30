import '../style/ReservationItem.css';

export default function ReservationItem({ reservation }) {
  return (
    <li className='reservation-item' key={reservation.reservationId}>
      <div className='user-info'>{reservation.userName}</div>
      <div className='ott-info'>
        {reservation.ott}
        {' · '}
        {reservation.profile}
        {' · '}
        {reservation.start.substring(11, 16)}
        {' - '}
        {reservation.end.substring(11, 16)}
      </div>
    </li>
  );
}
