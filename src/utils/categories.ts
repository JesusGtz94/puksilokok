import { CATEGORIES } from "@/constants/categories";

export const getCategory = (categoryId?: string, subcategoryId?: string) => {
  if (!categoryId) {
    return {
      category: { id: "", name: "" },
      subcategory: { id: "", name: "" },
    };
  }

  const category = CATEGORIES[categoryId as "000"];

  if (!category) {
    return {
      category: { id: "", name: "" },
      subcategory: { id: "", name: "" },
    };
  }

  const subcategory =
    category.subcategories[
      subcategoryId as keyof (typeof CATEGORIES)["000"]["subcategories"]
    ];

  return {
    category: { id: categoryId, name: category.name },
    subcategory: { id: subcategoryId || "", name: subcategory?.name || "" },
  };
};
