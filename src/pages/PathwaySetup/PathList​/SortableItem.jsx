import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef } from "react";

export default function SortableItem({ id, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const buttonRef = useRef(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "20px",
    background: "lightblue",
    cursor: "grab",
    border: "2px solid black",
    textAlign: "center",
    width: "100px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const buttonStyle = {
    position: "absolute",
    top: "5px",
    right: "5px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    cursor: "pointer",
    pointerEvents: "auto",
    zIndex: 99
  };


  useEffect(() => {
    const button = buttonRef.current;
    const handleMouseDown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onDelete();
    };

    if (button) {
      button.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (button) {
        button.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, [onDelete]);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} id={id}>
      {id}
      <button ref={buttonRef} style={buttonStyle}>X</button>
    </div>
  );
}