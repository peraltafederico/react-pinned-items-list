import "./styles.css";
import usePinnedList from "./usePinnedList";

const initialList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function ObjList() {
  const { pinnedList, handleChange, isPinned } = usePinnedList({
    initialList
  });

  return (
    <div>
      <h1>Plain List</h1>

      <p>Initial List</p>
      <pre>{JSON.stringify(initialList)}</pre>

      <p>Reordered List</p>
      <pre>{JSON.stringify(pinnedList)}</pre>

      {pinnedList.map((i) => (
        <div key={i}>
          <button
            onClick={() => handleChange(i)}
            style={{
              background: isPinned(i) ? "red" : "white"
            }}
          >
            {i}
          </button>
        </div>
      ))}
    </div>
  );
}
