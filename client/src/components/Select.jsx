import React, { useState } from "react";
import Input from "./Input";

function MultiSelect({
  selectedItems,
  placeholder,
  onRemoveItem,
  onAddItem,
}) {

  const [newItem, setNewItem] = useState("");

  return (

    <div className="mt-4">


      <div className="flex flex-wrap gap-2 mb-3">

        {selectedItems.map((item, index) => {

          return (

            <div
              key={index}
              className="
                flex
                items-center
                gap-2

                bg-[#FFC29B]

                text-[#4B2E39]

                px-4
                py-1.5

                rounded-full

                shadow-sm

                text-sm
                font-medium
              "
            >

              <span>
                {item}
              </span>

              <span
                className="
                  cursor-pointer
                  text-[#B95E82]
                  hover:text-red-600
                  transition
                "
                onClick={() => onRemoveItem(item)}
              >
                ✕
              </span>

            </div>
          );
        })}

      </div>

      

      <Input
        type="text"
        placeholder={placeholder}
        value={newItem}

        onChange={(e) => {
          setNewItem(e.target.value);
        }}

        onKeyDown={(e) => {

          if (
            e.key === "Enter" &&
            newItem.trim() !== ""
          ) {

            onAddItem(newItem);

            setNewItem("");
          }
        }}
      />

    </div>
  );
}

export default MultiSelect;