"use client";

import { Chip } from "@/components/ui";
import { AtSign } from "lucide-react";
import Link from "next/link";
import { MouseEvent } from "react";

interface Props {
  labels:
    | {
        id: number;
        name: string;
      }[]
    | undefined;
}

const TaskLabelsList = ({ labels }: Props) => {
  return !!labels && !!labels.length ? (
    <div className="flex w-full items-center gap-1 py-1 overflow-auto styled-overflow-horizontal">
      {labels.map((label) => (
        <Link key={label.id} href={`/todo/label/${label.id}`}>
          <Chip
            title={label.name}
            prepEndIcon={<AtSign size={16} />}
            onClick={(e: MouseEvent) => e.stopPropagation()}
          />
        </Link>
      ))}
    </div>
  ) : (
    <></>
  );
};
export default TaskLabelsList;
