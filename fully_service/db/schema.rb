# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_11_19_084014) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "cashes", force: :cascade do |t|
    t.string "nom", default: "Cash Maison", null: false
    t.string "devise", default: "MGA", null: false
    t.decimal "solde", precision: 18, scale: 2, default: "0.0", null: false
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "objectifs", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "category"
    t.date "target_date"
    t.integer "objectif_status", default: 0, null: false
    t.integer "priority", default: 2, null: false
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "routine_items", force: :cascade do |t|
    t.bigint "routine_id", null: false
    t.string "title", null: false
    t.text "notes"
    t.time "start_time", null: false
    t.time "end_time"
    t.integer "position"
    t.string "category"
    t.integer "duration_minutes"
    t.boolean "mandatory", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "day_of_week"
    t.string "image"
    t.index ["routine_id", "position"], name: "index_routine_items_on_routine_id_and_position"
    t.index ["routine_id"], name: "index_routine_items_on_routine_id"
  end

  create_table "routines", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.boolean "public", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "suivis", force: :cascade do |t|
    t.time "start_time"
    t.time "end_time"
    t.text "description"
    t.integer "week"
    t.string "day"
    t.boolean "completed", default: false
    t.text "remarque"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.bigint "cash_id", null: false
    t.decimal "montant", precision: 18, scale: 2, null: false
    t.string "type_transaction", null: false
    t.string "categorie"
    t.text "description"
    t.date "date_transaction", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cash_id"], name: "index_transactions_on_cash_id"
  end

  add_foreign_key "routine_items", "routines"
  add_foreign_key "transactions", "cashes"
end
