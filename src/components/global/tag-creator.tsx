"use client";
import { Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AlertDialog } from "../ui/alert-dialog";
import { Command, CommandInput } from "../ui/command";
import TagComponent from "./tag";
import { PlusCircleIcon, X } from "lucide-react";
import { toast } from "../ui/use-toast";
import { v4 } from "uuid";
import { saveActivityLogsNotification, upsertTag } from "@/lib/queries";

type Props = {
  subAccountId: string;
  getSelectedTags: (tags: Tag[]) => void;
  defaultTags?: Tag[];
};

const TagColors = ["BLUE", "ORANGE", "ROSE", "PURPLE", "GREEN"] as const;
export type TagColor = (typeof TagColors)[number];

const TagCreator = ({ subAccountId, getSelectedTags, defaultTags }: Props) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags || []);
  const [tags, setTags] = useState<Tag[]>([]);
  const router = useRouter();
  const [value, setValue] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    getSelectedTags(selectedTags);
  }, [selectedTags]);

  const handleDeleteSelection = (tagId: string) => {
    setSelectedTags(selectedTags.filter((tag)=> tag.id !== tagId))
  }

  const handleAddTag = async () => {
    if (!value) {
      toast({
        variant: 'destructive',
        title: 'Tags need to have a name',
      })
      return
    }
    if (!selectedColor) {
      toast({
        variant: 'destructive',
        title: 'Please Select a color',
      })
      return
    }
    const tagData: Tag = {
      color: selectedColor,
      createdAt: new Date(),
      id: v4(),
      name: value,
      subAccountId,
      updatedAt: new Date(),
    }

    setTags([...tags, tagData])
    setValue('')
    setSelectedColor('')
    try {
      const response = await upsertTag(subAccountId, tagData)
      toast({
        title: 'Created the tag',
      })

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a tag | ${response?.name}`,
        subaccountId: subAccountId,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Could not create tag',
      })
    }
  }

  return(
  <AlertDialog>
    <Command className="bg-transparent">
    {!!selectedTags.length && (
          <div className="flex flex-wrap gap-2 p-2 bg-background border-2 border-border rounded-md">
            {selectedTags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center"
              >
                <TagComponent
                  title={tag.name}
                  colorName={tag.color}
                />
                <X
                  size={14}
                  className="text-muted-foreground cursor-pointer"
                  onClick={() => handleDeleteSelection(tag.id)}
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 my-2">
          {TagColors.map((colorName) => (
            <TagComponent
              key={colorName}
              selectedColor={setSelectedColor}
              title=""
              colorName={colorName}
            />
          ))}
        </div>
        <div className="relative">
            <CommandInput 
                placeholder="Search for tag ..."
                value={value}
                onValueChange={setValue}
            />
            <PlusCircleIcon 
                onClick={handleAddTag}
                size={20}
                className="absolute top-1/2 transform -translate-y-1/2 right-2 hover:text-primary transition-all cursor-pointer text-muted-foreground"
            />
        </div>
    </Command>
  </AlertDialog>
  )
};

export default TagCreator;
