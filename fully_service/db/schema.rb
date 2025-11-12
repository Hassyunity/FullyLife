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

ActiveRecord::Schema[8.0].define(version: 2025_11_12_080339) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

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

  add_foreign_key "routine_items", "routines"
end
