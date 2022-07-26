-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
