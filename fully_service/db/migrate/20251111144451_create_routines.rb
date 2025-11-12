# db/migrate/20251111_create_routines.rb
class CreateRoutines < ActiveRecord::Migration[7.0]
  def change
    create_table :routines do |t|
      t.string :title, null: false
      t.text :description
      t.boolean :public, default: true
      t.timestamps
    end
  end
end
