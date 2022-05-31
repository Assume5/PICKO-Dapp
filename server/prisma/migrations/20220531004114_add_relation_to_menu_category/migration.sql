-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_category_fkey" FOREIGN KEY ("category") REFERENCES "menu_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
