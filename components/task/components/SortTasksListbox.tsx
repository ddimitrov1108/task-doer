"use client";

import { useState } from "react";

const sortBy = [
  {name: "A-Z Alphabetically ascending", value: "asc"},
  {name: "Z-A Alphabetically descending", value: "desc"},
]


interface Props {}

const SortTasksListbox = (props: Props) => {
  const [selected, setSelected] = useState(sortBy[0])
  return (
    <div>SortTasksListbox</div>
  )
}
export default SortTasksListbox