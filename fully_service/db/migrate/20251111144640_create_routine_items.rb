# db/migrate/20251111_create_routine_items.rb
class CreateRoutineItems < ActiveRecord::Migration[7.0]
  def change
    create_table :routine_items do |t|
      t.references :routine, null: false, foreign_key: true
      t.string :title, null: false
      t.text :notes
      t.time :start_time, null: false
      t.time :end_time
      t.integer :position
      t.string :category
      t.integer :duration_minutes
      t.boolean :mandatory, default: true
      t.timestamps
    end

    add_index :routine_items, [:routine_id, :position]
  end
end
