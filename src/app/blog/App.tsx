"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import BlogList from "@/components/blog/BlogList";
import CategoryTabs from "@/components/form/CategoryTabs";
import TagSelector from "@/components/form/TagSelector";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { NotionContext } from "@/service/notion";
import { BlogFilter, blogFilterSchema } from "@/types/schema";
import { getFilterdBlog } from "@/utils/notion";

interface Props {
  context: NotionContext;
}

const ClientApp: React.FC<Props> = ({ context }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof blogFilterSchema>>({
    resolver: zodResolver(blogFilterSchema),
    defaultValues: {},
  });

  const data = form.watch();

  React.useEffect(() => {
    const { isValid, isValidating } = form.formState;
    if (isValid && !isValidating) {
      setFilterData(data);
    }
  }, [data, form.formState]);

  const [filterData, setFilterData] = React.useState<BlogFilter>({});

  const blogs = React.useMemo(
    () => getFilterdBlog(context.pageEntries, filterData),
    [context.pageEntries, filterData],
  );

  return (
    <div>
      <Form {...form}>
        <form
          ref={formRef}
          className="mb-8 space-y-6"
          onSubmit={form.handleSubmit((data) => {
            console.log(data);
            setFilterData(data);
          })}
        >
          <FormField
            control={form.control}
            name="category"
            defaultValue=""
            render={({ field }) => (
              <FormItem
                defaultValue={field.value}
                className="flex items-center gap-x-4"
              >
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategoryTabs
                    categories={Object.keys(context.categoryFilters)}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem
                defaultValue={field.value}
                className="flex items-center gap-x-4"
              >
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagSelector
                    tags={Object.keys(context.tagFilters)}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="orderby"
            defaultValue="latest"
            render={({ field }) => (
              <FormItem
                defaultValue={field.value}
                className="flex items-center gap-x-4"
              >
                <FormLabel>OrderBy</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="选择排序方式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="latest">时间由近及远</SelectItem>
                        <SelectItem value="hit">热度降序</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          /> */}
        </form>
      </Form>
      <BlogList blogs={blogs} pageSize={5} groupByYear />
    </div>
  );
};

export default ClientApp;
