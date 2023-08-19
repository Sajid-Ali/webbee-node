import { QueryInterface } from "sequelize";
import { ModelAttributes } from "sequelize/types/model";

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("movies", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: "varchar" },
      description: { type: "varchar" },
      duration: {
        type: "timestamp",
      },
      release_date: {
        type: "timestamp",
      },
    } as ModelAttributes);
    await queryInterface.createTable("shows", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      movie_id: {
        type: "integer",
        allowNull: true,
        references: {
          model: {
            tableName: "movies",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      show_time: {
        type: "timestamp",
      },
      is_booked_out: {
        type: "boolean",
        defaultValue: false,
      },
    } as ModelAttributes);
    await queryInterface.createTable("cinemas", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: "varchar",
        allowNull: true,
      },
      location: {
        type: "varchar",
        allowNull: true,
      },
    } as ModelAttributes);
    await queryInterface.createTable("showrooms", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      cinema_id: {
        type: "integer",
        allowNull: true,
        references: {
          model: {
            tableName: "cinemas",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      name: {
        type: "varchar",
        allowNull: true,
      },
      capacity: {
        type: "integer",
      },
    } as ModelAttributes);
    await queryInterface.createTable("pricing_categories", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: "varchar",
        allowNull: true,
      },
      premium_percentage: {
        type: "boolean",
        defaultValue: false,
      },
    } as ModelAttributes);
    await queryInterface.createTable("show_pricing", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      show_id: {
        type: "integer",
        allowNull: true,
        references: {
          model: {
            tableName: "shows",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      category_id: {
        type: "integer",
        allowNull: true,
        references: {
          model: {
            tableName: "pricing_categories",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      price: {
        type: "integer",
      },
    } as ModelAttributes);
    await queryInterface.createTable("seats", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      showroom_id: {
        type: "integer",
        allowNull: true,
        references: {
          model: {
            tableName: "showrooms",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      row_number: {
        type: "integer",
      },
      seat_number: {
        type: "integer",
      },
    } as ModelAttributes);
    await queryInterface.createTable("seat_bookings", {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
      },
      show_id: {
        type: "integer",
        allowNull: true,
        references: {
          model: {
            tableName: "shows",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      seat_id: {
        type: "integer",
        allowNull: true,
        references: {
          model: {
            tableName: "seats",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      user_id: {
        type: "integer",
      },
      booking_time: {
        type: "varchar",
      },
    } as ModelAttributes);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
