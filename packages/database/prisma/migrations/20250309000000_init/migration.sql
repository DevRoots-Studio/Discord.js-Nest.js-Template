-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT '0',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
