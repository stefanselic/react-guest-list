import { useState } from 'react';

export default function GuestAttending() {
  const [isAttending, setisAttending] = useState(false);

  function toggleLight() {
    setisAttending(!isAttending); // This schedules a state update after the function finished
  }

  return (
    <div>
      <aria-label>
        attending
        <input id="checkbox" type="checkbox" />
      </aria-label>
      <button onClick={() => toggleLight()} style={{ fontSize: '16px' }}>
        Guest {isAttending ? 'is attending ✅' : 'is not attending ❌'}
      </button>
    </div>
  );
}
