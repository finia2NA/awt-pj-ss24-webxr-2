interface HandlebarProps {
  showDot: boolean
}

export default function Handlebar(props: HandlebarProps) {
  let { showDot } = props;
  if (showDot === undefined) showDot = true;


  return (
    // px and py is there to make the "hitbox" of the component bigger, thus making it easier to hit in xr
    <div className="flex flex-row
    space-x-1.5
    px-6 py-3
    justify-center items-center">
      {showDot &&
        // Custom h and w values because humans receive 0.55rem as being as tall as the 0.5 tall bar.
        <div className=" h-[0.55rem] w-[0.55rem] rounded-full bg-white" />
      }
      <div className="h-2 w-20 rounded-full bg-white" />
    </div>
  );
}