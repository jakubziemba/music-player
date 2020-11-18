import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Player() {
  return (
    <div className='player'>
      <div className='time-control'>
        <p>Start Time</p>
        <input type='range' />
        <p>End Time</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          className='skip-back'
          icon={faAngleLeft}
          size='2x'
        />
        <FontAwesomeIcon className='play' icon={faPlay} size='2x' />
        <FontAwesomeIcon
          className='skip-forward'
          icon={faAngleRight}
          size='2x'
        />
      </div>
    </div>
  );
}
