class CreateSuivis < ActiveRecord::Migration[8.0]
  create_table :suivis do |t|
    t.time :start_time
    t.time :end_time
    t.text :description
    t.integer :week
    t.string :day
    t.boolean :completed, default: false
    t.text :remarque
    t.timestamps
  end
end
