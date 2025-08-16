import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from "typeorm";

export class InitTables1723710000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Users
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "email", type: "varchar", isUnique: true },
          { name: "passwordHash", type: "varchar" },
          { name: "isAdmin", type: "boolean", default: false },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp", default: "now()" }
        ]
      })
    );

    // Products
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "title", type: "varchar" },
          { name: "description", type: "text", isNullable: true },
          { name: "capacity", type: "int", default: 1 },
          { name: "imageUrl", type: "varchar", isNullable: true },
          { name: "location", type: "varchar", isNullable: true },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp", default: "now()" }
        ]
      })
    );

    // Reservations
    await queryRunner.createTable(
      new Table({
        name: "reservations",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "userId", type: "int" },
          { name: "productId", type: "int" },
          { name: "date", type: "date" },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp", default: "now()" }
        ]
      })
    );

    // Foreign Keys
    await queryRunner.createForeignKeys("reservations", [
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE"
      }),
      new TableForeignKey({
        columnNames: ["productId"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
        onDelete: "CASCADE"
      })
    ]);

    // Unique Constraint (product + date)
    await queryRunner.createUniqueConstraint(
      "reservations",
      new TableUnique({
        columnNames: ["productId", "date"]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("reservations");
    await queryRunner.dropTable("products");
    await queryRunner.dropTable("users");
  }
}
