// import { useState } from 'react';

// function Bulb(props) {
//   return (
//     <div>
//       Guest is {props.isAttending ? 'attending ✅' : 'not attending ❌'}
//       <input type="checkbox" />
//     </div>
//   );
// }

// function Switch(props) {
//   return (
//     <button onClick={() => props.setIsOn(!props.isAttending)}>check</button>
//   );
// }

// export default function ExampleLiftingStateUp() {
//   const [isAttending, setIsAttending] = useState(true);

//   return (
//     <>
//       <Bulb isAttending={isAttending} />
//       <Switch isAttending={isAttending} setIsOn={setIsAttending} />
//     </>
//   );
// }
