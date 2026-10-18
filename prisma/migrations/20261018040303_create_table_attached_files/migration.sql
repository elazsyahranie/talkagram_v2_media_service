-- CreateTable
CREATE TABLE "AttachedFiles" (
    "id" VARCHAR(255) NOT NULL,
    "sender" VARCHAR(255) NOT NULL,
    "chat_id" VARCHAR(255),
    "path" VARCHAR(255) NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "ext" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttachedFiles_pkey" PRIMARY KEY ("id")
);
