"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IFormInput } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import getLabels from "@/app/actions/label/getLabels";
import useSWR from "swr";
import Label from "./Label";
import Spinner from "@/components/ui/Spinner";
import Chip from "@/components/ui/Chip";
import { ChevronDownIcon, X } from "lucide-react";
import AtSign from "@/components/ui/AtSign";

const TaskLabelsSelectField = ({
  label = "",
  containerClassName,
  field,
  form: { setFieldValue },
  fullWidth,
  disabled,
}: IFormInput<
  {
    id: string;
    name: string;
  }[]
>) => {
  const { data, isLoading } = useSWR("labels", async () => {
    const res = await getLabels();
    return res;
  });

  const onChangeHandler = (
    value: {
      id: string;
      name: string;
    }[]
  ) => {
    setFieldValue(field.name, value);
  };

  const onChipClickHandler = (id: string) => {
    const newValue = field.value.filter((v) => v.id !== id);
    setFieldValue(field.name, newValue);
  };

  const selectedOptions =
    !isLoading && data?.labels && !!field.value.length
      ? data.labels.filter((label) =>
          field.value.find((l) => l.id === label.id)
        )
      : [];

  return (
    <div
      className={cn(
        "mb-4 relative",
        fullWidth ? "w-full" : "w-fit",
        containerClassName
      )}
    >
      <Label className="pb-2" htmlFor={field.name} label={label} />

      <Listbox
        value={selectedOptions}
        onChange={onChangeHandler}
        multiple
        disabled={disabled}
      >
        <Listbox.Button
          className={cn(
            "flex items-center justify-between gap-4 text-left bg-black-dark border outline-none px-4 py-2.5 rounded-lg w-full border-black-light/20 focus:border-primary-main",
            fullWidth ? "w-full" : "w-fit",
            containerClassName
          )}
        >
          {({ open }) => (
            <>
              <div className="w-full flex items-center gap-2 flex-wrap">
                {isLoading ? (
                  <Spinner />
                ) : !!selectedOptions.length ? (
                  selectedOptions.map((label) => (
                    <Chip
                      key={label.id}
                      title={label.name}
                      prepEndIcon={<AtSign />}
                      endIcon={
                        <button
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            onChipClickHandler(label.id);
                          }}
                        >
                          <X className="text-main hover:text-light" size={16} />
                        </button>
                      }
                    />
                  ))
                ) : (
                  "No labels selected"
                )}
              </div>
              <ChevronDownIcon
                size={20}
                className={cn("text-main transition-all", open && "rotate-180")}
              />
            </>
          )}
        </Listbox.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Listbox.Options className="styled-overflow max-h-[230px] overflow-auto grid gap-1 rounded-lg min-w-fit absolute right-0 mt-2 w-full border border-black-light/20 bg-black-main p-2 z-40 origin-top-right">
            {data?.labels?.map((label) => (
              <Listbox.Option
                key={label.id}
                className={({ selected }) =>
                  cn(
                    "cursor-pointer flex items-center gap-2 text-light transition-all w-full px-2 py-1 rounded-lg",
                    selected
                      ? "bg-primary-light/10 text-white"
                      : "hover:bg-black-light/10 hover:text-white"
                  )
                }
                value={label}
              >
                <AtSign /> {label.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};
export default TaskLabelsSelectField;
