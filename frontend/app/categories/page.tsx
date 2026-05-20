import { CategoriesContent } from "@/components/CategoriesContent";
import { getCategories } from "@/services/category.service";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return <CategoriesContent initialCategories={categories} />;
}