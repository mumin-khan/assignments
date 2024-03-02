/*
  Warnings:

  - You are about to drop the `_BlogToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BlogToTag" DROP CONSTRAINT "_BlogToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogToTag" DROP CONSTRAINT "_BlogToTag_B_fkey";

-- DropTable
DROP TABLE "_BlogToTag";

-- CreateTable
CREATE TABLE "_AuthorToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToPost_AB_unique" ON "_AuthorToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToPost_B_index" ON "_AuthorToPost"("B");

-- AddForeignKey
ALTER TABLE "_AuthorToPost" ADD CONSTRAINT "_AuthorToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToPost" ADD CONSTRAINT "_AuthorToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
