import React from "react";
import { useControlledState } from "@/hooks/useControlledState";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  categories: string[];
  value?: string;
  onChange?: (value: string) => void;
}

const CategoryTabs: React.FC<Props> = ({
  categories,
  value: defaultValue,
  onChange,
}) => {
  const [value, setValue] = useControlledState(defaultValue, onChange);

  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={""}>全部</TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
