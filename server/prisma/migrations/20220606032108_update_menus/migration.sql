-- DropForeignKey
ALTER TABLE "menus" DROP CONSTRAINT "menus_category_fkey";

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_category_fkey" FOREIGN KEY ("category") REFERENCES "menu_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
