import React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useControlledState } from "@/hooks/useControlledState";

interface Props {
  categories: string[];
  value?: string;
  onChange?: (value: string) => void;
}

const CategoryTabs = React.forwardRef<HTMLDivElement, Props>(
  ({ categories, value: defaultValue, onChange }, ref) => {
    const [value, setValue] = useControlledState(defaultValue, onChange);

    return (
      <Tabs ref={ref} value={value} onValueChange={setValue}>
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
  },
);

CategoryTabs.displayName = "CategoryTabs";

export default CategoryTabs;
