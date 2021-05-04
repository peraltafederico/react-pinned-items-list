import "./styles.css";
import usePinnedList from "./usePinnedList";

const initialList = [
  {
    id: "0",
    title: "0"
  },
  {
    id: "1",
    title: "1"
  },
  {
    id: "2",
    title: "2"
  },
  {
    id: "3",
    title: "3"
  },
  {
    id: "4",
    title: "4"
  },
  {
    id: "5",
    title: "5"
  },

  {
    id: "6",
    title: "6"
  },
  {
    id: "7",
    title: "7"
  },
  {
    id: "8",
    title: "8"
  },

  {
    id: "9",
    title: "9"
  },
  {
    id: "10",
    title: "10"
  }
];

export default function ObjList() {
  const { pinnedList, handleChange, isPinned } = usePinnedList({
    initialList,
    idPath: "id"
  });

  return (
    <div>
      <div>
        <h1>Object List</h1>

        <p>Initial List</p>
        <pre>{JSON.stringify(initialList)}</pre>

        <p>Reordered List</p>
        <pre>{JSON.stringify(pinnedList)}</pre>

        {pinnedList.map((i) => (
          <div key={i.id}>
            <button
              onClick={() => handleChange(i.id)}
              style={{
                background: isPinned(i.title) ? "red" : "white"
              }}
            >
              {i.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
