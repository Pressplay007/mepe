import EventsList from "./EventsList";

const Events = () => {
  return (
    <section className="py-16 md:py-24 bg-white min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <EventsList showHeading />
      </div>
    </section>
  );
};

export default Events;
