// const colors = [
//   "bg-yellow-300",
//   "bg-pink-400",
//   "bg-blue-300",
//   "bg-purple-300",
//   "bg-green-300",
//   "bg-red-300",

// ];

// const Star = ({top, left, size, color, delay}) => {
// return(
//     <div
//     className={`absolute rounded-full opacity-80 animate-ping ${color}`}
//     style={{
//         top: `${top}%`,
//         left: `${left}%`,
//         width: size,
//         height: size,
//         animationDuration: '4s',
//         animationDelay: delay,
//         zIndex: 0
//     }}
//     />   
// )
// };

// const TwinkleBg = () => {
//     const stars = Array.from({length: 100}, (_, i) => ({
//         top: Math.random() * 100,
//         left: Math.random() * 100,
//         size: `${Math.floor(Math.random() * 4)  + 4}px`,
//         color: colors[Math.floor(Math.random() * colors.length)] ,
//         delay: `${Math.random() * 5}s`,
//     }));

//     return(
//         <div className="absolute inset-0 pointer-events-none">
//          {stars.map((star, idx)=> (
//             <Star key={idx} {...star} />
//          ))}
//         </div>
//     )
// }

// export default TwinkleBg


const shapes = [
  { type: '⭐', color: 'text-yellow-400 ', },
//   { type: '💖', color: 'text-pink-400' },
//   { type: '🔷', color: 'text-blue-400' },
//   { type: '🟢', color: 'text-green-400' },
//   { type: '🧸', color: 'text-orange-400' }
];

const TwinklingShapes = () => {
  const stars = Array.from({ length: 20 }).map((_, i) => {
    const { type, color } = shapes[Math.floor(Math.random() * shapes.length)];
    const top = Math.floor(Math.random() * 90);
    const left = Math.floor(Math.random() * 90);
    const size = Math.random() * 0.5 + 0.2;

    return (
      <span
        key={i}
        className={`absolute ${color} text-opacity-70 animate-pulse`}
        style={{
          top: `${top}%`,
          left: `${left}%`,
          fontSize: `${size}rem`,
          animationDelay: `${Math.random() * 3}s`,
        }}
      >
        {type}
      </span>
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {stars}
    </div>
  );
};

export default TwinklingShapes;
