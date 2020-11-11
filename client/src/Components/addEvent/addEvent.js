import "./addEvent.css";

function AddEvent() {
  return (
    <div>
      <h1>Add Event</h1>
      <form id="eventContainer" method="POST" action="/event" >
        <input
          className="eventInput"
          type="text"
          placeholder="Establishment Name: "
          name="name"
        />
        <input
          className="eventInput"
          type="text"
          placeholder="Description: "
          name="description"
        />
        <br></br>
        <label className="eventLabel" htmlFor="date">
          Today's Date:
        </label>
        <input className="eventInput" type="date" name="date" />
        <br></br>
        <label className="eventLabel" htmlFor="start">
          Start and End Time:
        </label>
        <input
          className="eventInput"
          type="time"
          placeholder="Start Time: "
          name="start"
        />
        <input
          className="eventInput"
          type="time"
          placeholder="End Time: "
          name="end"
        />
        <br></br>
        <input id="eventSubmit" type="submit" value="Add Event" />
      </form>
    </div>
  );
}

export default AddEvent;
