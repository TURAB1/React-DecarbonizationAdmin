import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import SortableRow from "./SortableRow";
import Xarrow from "react-xarrows";
import Button from "../../../components/Button/Button";

const PathList = () => {
  const initialRows = Array.from({ length: 4 }, (_, i) => ({
    id: `PATH ${i + 1}`,
    items: ["Step 1", "Step 2", "Step 3", "Step 4"].map(
      (step, j) => `${step}-${i + 1}-${j}`
    ),
  }));

  const [rows, setRows] = useState(initialRows);
  const [selectedPaths, setSelectedPaths] = useState([]);

  const findRowByItemId = (itemId) => {
    return rows.find((row) => row.items.includes(itemId));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeRow = findRowByItemId(active.id);
    const overRow = findRowByItemId(over.id);

    if (activeRow && overRow) {
      if (activeRow.id === overRow.id) {
        // 같은 행 내에서 이동
        const newItems = arrayMove(
          activeRow.items,
          activeRow.items.indexOf(active.id),
          overRow.items.indexOf(over.id)
        );
        setRows((prev) =>
          prev.map((row) =>
            row.id === activeRow.id ? { ...row, items: newItems } : row
          )
        );
      } else {
        // 다른 행 간 이동
        const activeItems = [...activeRow.items];
        const overItems = [...overRow.items];
        const [movedItem] = activeItems.splice(
          activeItems.indexOf(active.id),
          1
        );
        overItems.splice(overItems.indexOf(over.id), 0, movedItem);

        setRows((prev) =>
          prev.map((row) => {
            if (row.id === activeRow.id) return { ...row, items: activeItems };
            if (row.id === overRow.id) return { ...row, items: overItems };
            return row;
          })
        );
      }
    } else {
      // 행 간 이동
      const activeIndex = rows.findIndex((row) => row.id === active.id);
      const overIndex = rows.findIndex((row) => row.id === over.id);
      if (activeIndex !== -1 && overIndex !== -1) {
        setRows((prev) => arrayMove(prev, activeIndex, overIndex));
      }
    }
  };

  const handleCheckboxChange = (pathId, event) => {
    console.log("handleCheckboxChange", pathId);
    setSelectedPaths((prev) =>
      prev.includes(pathId)
        ? prev.filter((id) => id !== pathId)
        : [...prev, pathId]
    );
  };

  const handleChecked = (pathId) => {
    return selectedPaths.includes(pathId);
  };

  const handleDeleteSelected = () => {
    setRows((prev) => prev.filter((row) => !selectedPaths.includes(row.id)));
    setSelectedPaths([]);
  };

  const handleAddPath = () => {
    const newPathId = `PATH ${rows.length + 1}`;
    console.log("newPathId", newPathId);
    console.log("selectedPaths", selectedPaths);
    const newPath = {
      id: newPathId,
      items: [].map((step, j) => `${step}-${rows.length + 1}-${j}`),
    };
    setRows((prev) => [...prev, newPath]);
  };

  const handleDeleteStep = (rowId, stepId) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            items: row.items.filter((item) => item !== stepId),
          };
        }
        return row;
      })
    );
  };

  const handleAddStep = (rowId) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id === rowId) {
          const newStepId = `Step ${row.items.length + 1}-${rowId.split(" ")[1]}-${row.items.length}`;
          return { ...row, items: [...row.items, newStepId] };
        }
        return row;
      })
    );
  };

  const handleSave = () => {
    const pathData = rows.map((row) => ({
      pathId: row.id,
      steps: row.items,
    }));
    console.log("Saved Path Data:", pathData);
  };
  return (
    <section>
      <button onClick={handleAddPath}>Path 추가</button>
      <button
        onClick={handleDeleteSelected}
        disabled={selectedPaths.length === 0}
      >
        선택된 Path 삭제
      </button>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={rows.map((row) => row.id)}
          strategy={rectSortingStrategy}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "20px",
            }}
          >
            {rows.map((row) => (
              <SortableRow key={row.id} id={row.id}>
                <SortableContext
                  items={row.items}
                  strategy={rectSortingStrategy}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "40px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={handleChecked(row.id)}
                      onPointerDown={(e) => {
                        e.stopPropagation();
                      }}
                      onChange={(e) => {
                        handleCheckboxChange(row.id);
                      }}
                    />
                    <strong>{row.id}</strong>
                    <div
                      style={{
                        display: "flex",
                        gap: "30px",
                        padding: "10px",
                        border: "1px solid black",
                        position: "relative",
                      }}
                    >
                      {row.items.map((id, index) => (
                        <div
                          key={id}
                          style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <SortableItem
                            id={id}
                            onDelete={() => handleDeleteStep(row.id, id)}
                          />
                          {index < row.items.length - 1 && (
                            <Xarrow start={id} end={row.items[index + 1]} />
                          )}
                        </div>
                      ))}
                      <Button
                        onMouseDown={() => handleAddStep(row.id)}
                        variant="blue"
                        size="small"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </SortableContext>
              </SortableRow>
            ))}
            <Button
              onClick={() => handleSave()}
              variant="blue"
              size="small"
              children="Save"
              icon="save"
            />
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
};

export default PathList;
