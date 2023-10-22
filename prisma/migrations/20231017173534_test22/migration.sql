-- DropForeignKey
ALTER TABLE "SizeToColors" DROP CONSTRAINT "SizeToColors_productId_fkey";

-- DropForeignKey
ALTER TABLE "SizeToColors" DROP CONSTRAINT "SizeToColors_sizeId_fkey";

-- AddForeignKey
ALTER TABLE "SizeToColors" ADD CONSTRAINT "SizeToColors_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeToColors" ADD CONSTRAINT "SizeToColors_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
